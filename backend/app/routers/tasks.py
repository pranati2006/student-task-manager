from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..dependencies.auth import get_current_user
from ..models.task import Task
from ..models.user import User
from ..schemas.task import TaskCreate, TaskRead, TaskUpdate
from ..services.task_service import create_task, list_tasks
router = APIRouter(prefix='/tasks', tags=['tasks'])
@router.get('', response_model=list[TaskRead])
def get_tasks(db: Session = Depends(get_db), user: User = Depends(get_current_user)): return list_tasks(db, user.id)
@router.post('', response_model=TaskRead)
def add_task(data: TaskCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)): return create_task(db, user.id, data)
@router.put('/{task_id}', response_model=TaskRead)
def update_task(task_id: int, data: TaskUpdate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id, Task.owner_id == user.id).first()
    if not task: raise HTTPException(404, 'Task not found')
    for key, value in data.model_dump(exclude_unset=True).items(): setattr(task, key, value)
    db.commit(); db.refresh(task); return task
@router.delete('/{task_id}')
def remove_task(task_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id, Task.owner_id == user.id).first()
    if not task: raise HTTPException(404, 'Task not found')
    db.delete(task); db.commit(); return {'message': 'Task deleted'}