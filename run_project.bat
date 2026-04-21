@echo off
start cmd /k ".\venv\Scripts\python backend\manage.py runserver"
start cmd /k "cd frontend && npm run dev"
echo Servers are starting...
echo Backend: http://127.0.0.1:8000/
echo Frontend: http://localhost:5173/
pause
