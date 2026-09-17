# Student Task Manager

StudyFlow is a React and FastAPI task manager for students.

## Run locally

Start the API:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Start the frontend in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and the API docs at `http://localhost:8000/docs`.