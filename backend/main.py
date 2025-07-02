from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
import json, os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = "tasks.json"
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump([], f)

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1)
    due_date: datetime
    priority: str
    status: str

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int

class TaskUpdateStatus(BaseModel):
    status: str

class TaskEdit(BaseModel):
    title: str
    due_date: datetime
    priority: str
    status: str

def read_tasks():
    with open(DATA_FILE, "r") as f:
        content = f.read().strip()
        return json.loads(content) if content else []

def write_tasks(tasks):
    with open(DATA_FILE, "w") as f:
        json.dump(tasks, f, default=str)

@app.get("/tasks", response_model=List[Task])
def list_tasks():
    return read_tasks()

@app.post("/tasks", response_model=Task)
def create_task(task: TaskCreate):
    if task.due_date <= datetime.now():
        raise HTTPException(status_code=400, detail="La fecha debe ser futura")

    tasks = read_tasks()
    new_id = max([t["id"] for t in tasks], default=0) + 1

    task_data = task.dict()
    task_data["id"] = new_id
    tasks.append(task_data)
    write_tasks(tasks)
    return task_data

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, updated: TaskEdit):
    tasks = read_tasks()
    for i, t in enumerate(tasks):
        if t["id"] == task_id:
            updated_data = updated.dict()
            updated_data["id"] = task_id  # conservar el ID original
            tasks[i] = updated_data
            write_tasks(tasks)
            return updated_data
    raise HTTPException(status_code=404, detail="Tarea no encontrada")

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    tasks = read_tasks()
    new_tasks = [t for t in tasks if t["id"] != task_id]
    if len(new_tasks) == len(tasks):
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    write_tasks(new_tasks)
    return {"ok": True}
