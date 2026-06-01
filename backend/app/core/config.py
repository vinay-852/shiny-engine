import os
from functools import lru_cache


class Settings:
    app_name: str = "StockPilot Control API"
    database_url: str = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg2://postgres:postgres@localhost:5432/stockpilot_db",
    )
    cors_origins: list[str] = [
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
        if origin.strip()
    ]


@lru_cache
def get_stockpilot_settings() -> Settings:
    return Settings()
