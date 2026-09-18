from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse
from app.core.security import get_password_hash, verify_password
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None

class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str

@router.put("/me", response_model=UserResponse)
def update_profile(user_update: UserUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if user_update.name is not None:
        current_user.name = user_update.name
    if user_update.email is not None:
        existing = db.query(User).filter(User.email == user_update.email, User.id != current_user.id).first()
        if existing:
            raise HTTPException(status_code=409, detail="Email already in use")
        current_user.email = user_update.email
    db.commit()
    db.refresh(current_user)
    return current_user

@router.put("/me/password")
def change_password(pwd_data: PasswordChangeRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not verify_password(pwd_data.current_password, current_user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect current password")
    current_user.password_hash = get_password_hash(pwd_data.new_password)
    db.commit()
    return {"message": "Password updated successfully"}