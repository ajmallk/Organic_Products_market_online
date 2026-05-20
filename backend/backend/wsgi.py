"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import traceback
try:
    application = get_wsgi_application()
    app = application
except Exception as e:
    tb = traceback.format_exc()
    def diagnostic_app(environ, start_response):
        start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
        return [f"WSGI initialization failed:\n\n{tb}".encode('utf-8')]
    app = diagnostic_app
    application = diagnostic_app
