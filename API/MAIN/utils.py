import secrets, random, string


class Services:
    def crear_token():
        token = secrets.token_urlsafe(32)
        token = f"{token}"
        return token
    
    def generate_code(length=6):
        letters = string.ascii_uppercase + string.ascii_lowercase + string.digits
        return ''.join(random.choice(letters) for _ in range(length))