from sqlalchemy import func
from sqlalchemy.orm import Session
from ..models.task import Task
def summary(db: Session, owner_id: int):
    total = db.query(func.count(Task.id)).filter(Task.owner_id == owner_id).scalar() or 0
    completed = db.query(func.count(Task.id)).filter(Task.owner_id == owner_id, Task.completed.is_(True)).scalar() or 0
    return {'total': total, 'completed': completed, 'open': total - completed}