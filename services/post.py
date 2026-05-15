from typing import List
from schemas.post import PostIn, PostOut, PostUpdateIn


class PostService:
    def __init__(self) -> None:
        self._posts: List[PostOut] = []
        self._next_id = 1

    async def create(self, post: PostIn) -> int:
        new_post = PostOut(id=self._next_id, **post.model_dump())
        self._posts.append(new_post)
        self._next_id += 1
        return new_post.id

    async def read_all(self, published: bool, limit: int, skip: int = 0) -> List[PostOut]:
        filtered = [post for post in self._posts if post.published == published]
        return filtered[skip : skip + limit]

    async def read(self, id: int) -> PostOut:
        for post in self._posts:
            if post.id == id:
                return post
        raise ValueError("Post not found")

    async def update(self, id: int, post: PostUpdateIn) -> PostOut:
        existing = await self.read(id)
        updated = existing.model_copy(update={k: v for k, v in post.model_dump().items() if v is not None})
        self._posts[self._posts.index(existing)] = updated
        return updated

    async def delete(self, id: int) -> None:
        self._posts = [post for post in self._posts if post.id != id]
