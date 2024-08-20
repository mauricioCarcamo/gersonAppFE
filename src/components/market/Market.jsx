
import { Link, Outlet } from 'react-router-dom'
import './market.css'
const Market = () => {
  return (
    <main className='marketContainer'>
        <div className="header">
            <h1>POSTS</h1>
            <div className="actions">
                <button> <Link to={'./post'}>Add Post</Link> </button>
            </div>
            <div className="marketContent">
                <Outlet/>
            </div>
        </div>
    </main>
  )
}

export default Market