import os
import sys
import traceback

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
    app = application
except Exception as e:
    tb = traceback.format_exc()
    def diagnostic_app(environ, start_response):
        start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
        return [f"WSGI initialization failed:\n\n{tb}".encode('utf-8')]
    app = diagnostic_app
    application = diagnostic_app
