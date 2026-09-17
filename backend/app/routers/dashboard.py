from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..dependencies.auth import get_current_user
from ..models.user import User
from ..services.dashboard_service import summary
router = APIRouter(prefix='/dashboard', tags=['dashboard'])
@router.get('')
def dashboard(db: Session = Depends(get_db), user: User = Depends(get_current_user)): return summary(db, user.id)