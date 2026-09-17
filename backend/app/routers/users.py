from fastapi import APIRouter, Depends
from ..dependencies.auth import get_current_user
from ..models.user import User
from ..schemas.user import UserRead
router = APIRouter(prefix='/users', tags=['users'])
@router.get('/me', response_model=UserRead)
def me(user: User = Depends(get_current_user)): return user