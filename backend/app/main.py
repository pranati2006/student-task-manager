from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.database import Base, engine
from .routers import auth, dashboard, tasks, users
Base.metadata.create_all(bind=engine)
app = FastAPI(title='Student Task Manager API', version='1.0.0')
app.add_middleware(CORSMiddleware, allow_origins=['http://localhost:5173'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])
app.include_router(auth.router, prefix='/api'); app.include_router(tasks.router, prefix='/api'); app.include_router(users.router, prefix='/api'); app.include_router(dashboard.router, prefix='/api')
@app.get('/health')
def health(): return {'status': 'ok'}