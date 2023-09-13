ENV = 'PROD'
import mimetypes
from .settings import *

if ENV == 'PROD':
    # Define debug settings
    DEBUG = False

    # Determine CORS policies
    ALLOWED_HOSTS = [
        '*',
        '3.22.248.139',
    ]
    MIDDLEWARE.append('corsheaders.middleware.CorsMiddleware')
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://3.22.248.139",
        "http://3.22.248.139:3000",
        "http://3.22.248.139:3001",
    ]
    CORS_ALLOW_HEADERS = ['*']
    CORS_ALLOW_CREDENTIALS = False

    # Static file management
    STATIC_ROOT = os.path.join(BASE_DIR, "static")
    STATICFILES_DIRS = [
        'apps/static',
        'apps/search/static/search/',
    ]
else:
    # Define debug settings
    DEBUG = True
    INSTALLED_APPS.append("debug_toolbar")
    MIDDLEWARE.append("debug_toolbar.middleware.DebugToolbarMiddleware")
    INTERNAL_IPS = ["127.0.0.1"]

    # Determine CORS policies
    ALLOWED_HOSTS = [
        "127.0.0.1",
        "localhost",
        "torre.test",
    ]
    CORS_ORIGIN_ALLOW_ALL = True

    # Static file management
