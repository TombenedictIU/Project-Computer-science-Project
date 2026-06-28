"""
config.py — Application configuration for AbroadEase backend.

Loads settings from environment variables with sensible defaults.
In production, set these via .env or your deployment platform.
"""

import os

# Base directory of this application (where config.py lives)
BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    """
    Central configuration class.

    All settings can be overridden via environment variables so the same
    codebase works unchanged across dev, CI, and production environments.
    """

    # --- Flask core settings ------------------------------------------------
    DEBUG = os.environ.get("FLASK_DEBUG", "False").lower() in ("true", "1", "yes")
    PORT = int(os.environ.get("FLASK_PORT", 5000))

    # --- CORS ---------------------------------------------------------------
    # In development the default '*' allows any origin.
    # In production set CORS_ORIGINS to a comma-separated allowlist,
    # e.g. "https://abroadease.example.com,https://admin.abroadease.example.com"
    CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "*")

    # --- Data directory ------------------------------------------------------
    # JSON data files live in the data/ folder next to this config file.
    DATA_DIR = os.path.join(BASE_DIR, "data")

    # --- URL domain allowlist ------------------------------------------------
    # Only these domains are considered trustworthy for source_url /
    # appointment_url fields inside the data files.
    ALLOWED_URL_DOMAINS = [
        "service.berlin.de",
        "berlin.de",
        "stadt.muenchen.de",
        "muenchen.de",
        "hamburg.de",
        "koeln.de",
    ]

    # FUTURE: Add SECRET_KEY, DATABASE_URI, JWT settings for Phase 2 auth.
    # FUTURE: Add REDIS_URL for caching / rate-limiting in Phase 3.
