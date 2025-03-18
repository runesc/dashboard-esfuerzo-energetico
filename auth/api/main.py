from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.github import git_auth

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

app.include_router(git_auth, prefix="/api/v1/auth/github")