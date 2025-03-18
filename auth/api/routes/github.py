import httpx
from fastapi import status
from fastapi.routing import APIRouter
from fastapi.responses import JSONResponse, RedirectResponse
from ..config.globals import Settings
from ..config.mongo import db

git_auth = APIRouter()
settings = Settings()

@git_auth.get("/signin")
def github_login():
    return JSONResponse(status_code=status.HTTP_200_OK, content={"url": f"https://github.com/login/oauth/authorize?client_id={settings.GITHUB_CLIENT_ID}"})

@git_auth.get("/callback")
async def github_callback(code: str):
    params = {
        "client_id": settings.GITHUB_CLIENT_ID,
        "client_secret": settings.GITHUB_CLIENT_SECRET,
        "code": code
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url="https://github.com/login/oauth/access_token", params=params, headers={"Accept": "application/json"})

    async with httpx.AsyncClient() as client:
        response = await client.get(url="https://api.github.com/user", headers={"Accept": "application/json", "Authorization": f"token {response.json()['access_token']}"})

    # Crear user en db
    