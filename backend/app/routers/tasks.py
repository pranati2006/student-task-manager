from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from typing import List, Optional
from app.core.database import get_db
from app.models.task import Task, StatusEnum, PriorityEnum
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task_in: TaskCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    task = Task(
        user_id=current_user.id,
        title=task_in.title,
        description=task_in.description,
        priority=task_in.priority,
        due_date=task_in.due_date
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.get("/", response_model=List[TaskResponse])
def get_tasks(
    status_filter: Optional[StatusEnum] = Query(None, alias="status"),
    priority_filter: Optional[PriorityEnum] = Query(None, alias="priority"),
    search: Optional[str] = Query(None),
    sort: Optional[str] = Query("created_at"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Task).filter(Task.user_id == current_user.id)
    if status_filter:
        query = query.filter(Task.status == status_filter)
    if priority_filter:
        query = query.filter(Task.priority == priority_filter)
    if search:
        query = query.filter(Task.title.ilike(f"%{search}%") | Task.description.ilike(f"%{search}%"))
    
    if sort == "due_date":
        query = query.order_by(Task.due_date.asc().nullslast())
    else:
        query = query.order_by(Task.created_at.desc())
        
    return query.all()

@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task_in: TaskUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task_in.model_dump(exclude_unset=True)
    if "status" in update_data and update_data["status"] == StatusEnum.COMPLETED and task.status != StatusEnum.COMPLETED:
        update_data["completed_at"] = datetime.now(timezone.utc)
    elif "status" in update_data and update_data["status"] == StatusEnum.PENDING:
        update_data["completed_at"] = None

    for key, value in update_data.items():
        setattr(task, key, value)
        
    db.commit()
    db.refresh(task)
    return task

@router.patch("/{task_id}/complete", response_model=TaskResponse)
def toggle_complete(task_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task.status == StatusEnum.COMPLETED:
        task.status = StatusEnum.PENDING
        task.completed_at = None
    else:
        task.status = StatusEnum.COMPLETED
        task.completed_at = datetime.now(timezone.utc)
        
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return None