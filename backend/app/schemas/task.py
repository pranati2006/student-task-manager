from datetime import date, datetime
from pydantic import BaseModel, ConfigDict
class TaskBase(BaseModel): title: str; description: str | None = None; priority: str = 'medium'; due_date: date | None = None; completed: bool = False
class TaskCreate(TaskBase): pass
class TaskUpdate(BaseModel): title: str | None = None; description: str | None = None; priority: str | None = None; due_date: date | None = None; completed: bool | None = None
class TaskRead(TaskBase): id: int; created_at: datetime; owner_id: int; model_config = ConfigDict(from_attributes=True)