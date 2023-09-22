import secrets


class Services:
    def crear_token():
        token = secrets.token_urlsafe(32)
        token = f"{token}"
        return token