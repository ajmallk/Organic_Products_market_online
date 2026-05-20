import os
import sys
import traceback

# Dynamically resolve directory paths and add the backend directory to sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(current_dir)
repo_root = os.path.dirname(backend_dir)

if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
if repo_root not in sys.path:
    sys.path.insert(0, repo_root)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Define database diagnostic WSGI app
def db_test_app(environ, start_response):
    try:
        import psycopg2
        db_url = os.environ.get('DATABASE_URL', 'Not Set')
        
        # Obfuscate password in URL for security display
        safe_url = db_url
        if '@' in db_url:
            try:
                parts = db_url.split('@')
                prefix = parts[0]
                host_part = parts[1]
                if ':' in prefix:
                    subparts = prefix.split(':')
                    # format: scheme://user:password
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

# Standard Django WSGI Application
try:
    from django.core.wsgi import get_wsgi_application
    django_application = get_wsgi_application()
except Exception as e:
    tb = traceback.format_exc()
    def diagnostic_app(environ, start_response):
        start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
        return [f"WSGI Django initialization failed:\n\n{tb}".encode('utf-8')]
    django_application = diagnostic_app

# Unified WSGI router
def app(environ, start_response):
    path = environ.get('PATH_INFO', '')
    if 'db-test' in path:
        return db_test_app(environ, start_response)
    return django_application(environ, start_response)

application = app
