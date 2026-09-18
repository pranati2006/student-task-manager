from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str = Field('sqlite:///./student_tasks.db', validation_alias='DATABASE_URL')
    secret_key: str = Field('change-this-in-production', validation_alias='JWT_SECRET_KEY')
    algorithm: str = Field('HS256', validation_alias='JWT_ALGORITHM')
    access_token_expire_minutes: int = Field(60, validation_alias='ACCESS_TOKEN_EXPIRE_MINUTES')
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

settings = Settings()