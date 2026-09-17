def test_task_module_imports():
    from app.models.task import Task
    assert Task.__tablename__ == 'tasks'