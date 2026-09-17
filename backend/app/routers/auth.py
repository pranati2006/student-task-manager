from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..schemas.auth import LoginRequest, Token
from ..schemas.user import UserCreate, UserRead
from ..services.auth_service import authenticate, register, token_for
router = APIRouter(prefix='/auth', tags=['auth'])
@router.post('/register', response_model=UserRead)
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    if db.query(__import__('app.models.user', fromlist=['User']).User).filter_by(email=data.email).first(): raise HTTPException(409, 'Email already registered')
    return register(db, data.name, data.email, data.password)
@router.post('/login', response_model=Token)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate(db, data.email, data.password)
    if not user: raise HTTPException(401, 'Invalid email or password')
    return {'access_token': token_for(user)}