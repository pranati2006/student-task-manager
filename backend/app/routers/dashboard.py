from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.core.database import get_db
from app.models.task import Task, StatusEnum, PriorityEnum
from app.schemas.dashboard import DashboardStats
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    tasks = db.query(Task).filter(Task.user_id == current_user.id).all()
    now = datetime.now(timezone.utc).replace(tzinfo=None) # match naive/aware setup if needed
    
    total = len(tasks)
    pending = sum(1 for t in tasks if t.status == StatusEnum.PENDING)
    completed = sum(1 for t in tasks if t.status == StatusEnum.COMPLETED)
    high_priority = sum(1 for t in tasks if t.priority == PriorityEnum.HIGH and t.status == StatusEnum.PENDING)
    
    # Overdue calculation
    overdue = 0
    for t in tasks:
        if t.status == StatusEnum.PENDING and t.due_date:
            due_clean = t.due_date.replace(tzinfo=None) if t.due_date.tzinfo else t.due_date
            if due_clean < now:
                overdue += 1

    return DashboardStats(
        total_tasks=total,
        pending_tasks=pending,
        completed_tasks=completed,
        high_priority_tasks=high_priority,
        overdue_tasks=overdue
    )