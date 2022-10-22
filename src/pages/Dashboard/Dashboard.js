import styles from './Dashboard.module.css'

import { Link } from 'react-router-dom'

//hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

function Dashboard() {
  const { user } = useAuthValue()
  const uid = user.uid

  //posts do usuário
  const { documents: posts, loading } = useFetchDocuments('posts', null, uid)
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/creat" className="btn">
            Criar primeiro post.
          </Link>
        </div>
      ) : (
        <div>
          <p>Tem post</p>
        </div>
      )}
      {posts && posts.map(post => <h3>{post.title}</h3>)}
    </div>
  )
}

export default Dashboard
