import { useEffect, useState, type FormEvent } from 'react'
import type { IPostsRes } from '../type/api/posts.type'
import * as Api from '../api'
import PostsItem from '../components/PostsItem'
import '../styles/Posts.css'

function Posts() {
  const [posts, setPosts] = useState<IPostsRes[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const getAllPosts = async () => {
    try {
      const postsData = await Api.posts.getPosts()
      setPosts(postsData);
    } catch (e) {
      console.log('ошибка добовления поста', e);
    }
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await Api.posts.postPosts({ title, description });

      setTitle('');
      setDescription('');
      await getAllPosts();
    } catch (error) {
      console.error('ошибка при добавлении:', error);
    }
  }

  useEffect(()=>{
    getAllPosts()
  }, [])

  return (
    <div className="posts__content">
      <div className="posts__content-form">
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">добавить</button>
        </form>
      </div>
      {posts.length === 0 ? (
        <div className="posts__content-none">постов нет</div>
      ) : (
        posts.map((el) => (
          <div key={el.id_posts}>
            <PostsItem posts={el} onUpdate={getAllPosts}/>
          </div>
        ))
      )}
    </div>
  )
}

export default Posts