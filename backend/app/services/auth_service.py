from sqlalchemy.orm import Session
from ..core.security import create_access_token, hash_password, verify_password
from ..models.user import User
def register(db: Session, name: str, email: str, password: str):
    user = User(name=name, email=email, password_hash=hash_password(password)); db.add(user); db.commit(); db.refresh(user); return user
def authenticate(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first(); return user if user and verify_password(password, user.password_hash) else None
def token_for(user: User): return create_access_token(str(user.id))