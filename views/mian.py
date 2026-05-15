from contextlib import asynccontextmanager
from fastapi import FastAPI

from views import auth, post


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(lifespan=lifespan, title="TestAuto API")
app.include_router(auth.router)
app.include_router(post.router)


@app.get("/")
async def root():
    return {"message": "TestAuto API is running"}
