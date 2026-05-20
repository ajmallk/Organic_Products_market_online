import os
import sys
import traceback

# Dynamically set the Python path so Vercel can resolve nested imports perfectly
current_dir = os.path.dirname(os.path.abspath(__file__))
nested_backend_dir = os.path.join(current_dir, 'backend')

if nested_backend_dir not in sys.path:
    sys.path.insert(0, nested_backend_dir)
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Database diagnostics endpoint
def db_test_app(environ, start_response):
    try:
        import psycopg2
        db_url = os.environ.get('DATABASE_URL', 'Not Set')
        
        # Obfuscate password in URL for secure logs
        safe_url = db_url
        if '@' in db_url:
            try:
                parts = db_url.split('@')
                prefix = parts[0]
                host_part = parts[1]
                if ':' in prefix:
                    subparts = prefix.split(':')
                    safe_url = f"{subparts[0]}:{subparts[1]}:******@{host_part}"
            except Exception:
                safe_url = "[credentials obfuscated]"
        
        status = f"1. psycopg2: Imported successfully!\n2. DATABASE_URL: {safe_url}\n"
        
        if db_url == 'Not Set':
            status += "3. Result: DATABASE_URL is not set in Vercel Environment Variables!\n"
        else:
            status += "3. Attempting connection (5s timeout)...\n"
            try:
                conn = psycopg2.connect(db_url, connect_timeout=5)
                status += "4. Result: Connected successfully to the remote database!\n"
                conn.close()
            except Exception as conn_error:
                status += f"4. Result: Connection failed! Error: {conn_error}\n"
                
        start_response('200 OK', [('Content-Type', 'text/plain')])
        return [status.encode('utf-8')]
    except Exception as e:
        tb = traceback.format_exc()
        start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
        return [f"Diagnostics failed to execute:\n\n{tb}".encode('utf-8')]

# Import the actual Django application
try:
    from django.core.wsgi import get_wsgi_application
    django_application = get_wsgi_application()
except Exception as e:
    tb = traceback.format_exc()
    def diagnostic_app(environ, start_response):
        start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
        return [f"WSGI Django initialization failed:\n\n{tb}".encode('utf-8')]
    django_application = diagnostic_app

# Unified WSGI entry point for Vercel
def app(environ, start_response):
    path = environ.get('PATH_INFO', '')
    if 'db-test' in path:
        return db_test_app(environ, start_response)
    return django_application(environ, start_response)

application = app
