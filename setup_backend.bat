@echo off
echo Installing backend dependencies...
.\venv\Scripts\python -m pip install -r requirements.txt
echo Running migrations...
.\venv\Scripts\python backend\manage.py migrate
echo Backend setup complete.
pause
