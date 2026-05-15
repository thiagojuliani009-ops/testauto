from typing import Optional
from pydantic import BaseModel


class PostIn(BaseModel):
    title: str
    content: str
    published: bool = False


class PostUpdateIn(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    published: Optional[bool] = None


class PostOut(BaseModel):
    id: int
    title: str
    content: str
    published: bool
