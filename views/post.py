from fastapi import APIRouter, Depends, status

from schemas.post import PostIn, PostUpdateIn, PostOut
from .security import login_required
from services.post import PostService

router = APIRouter(prefix="/post", dependencies=[Depends(login_required)])

service = PostService()


@router.get("/", response_model=list[PostOut])
async def read_posts(
    published: bool,
    limit: int,
    skip: int = 0,
):
    return await service.read_all(published, limit=limit, skip=skip)


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=PostOut)
async def create_post(post: PostIn):
    new_id = await service.create(post)
    return {**post.model_dump(), "id": new_id}


@router.get("/{id}", response_model=PostOut)
async def read_post(id: int):
    return await service.read(id)


@router.patch("/{id}", response_model=PostOut)
async def update_post(id: int, post: PostUpdateIn):
    return await service.update(id=id, post=post)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(id: int):
    await service.delete(id)

