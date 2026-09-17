from sqlalchemy.orm import Session
from ..models.task import Task
def list_tasks(db: Session, owner_id: int): return db.query(Task).filter(Task.owner_id == owner_id).order_by(Task.completed, Task.due_date).all()
def create_task(db: Session, owner_id: int, data): task = Task(**data.model_dump(), owner_id=owner_id); db.add(task); db.commit(); db.refresh(task); return task