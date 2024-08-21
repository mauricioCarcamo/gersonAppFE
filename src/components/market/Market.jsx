
import { Link, Outlet } from 'react-router-dom'
import './market.css'
const Market = () => {
  return (
    <main className='marketContainer'>
        <div className="header">
            <h1>Publicaciones</h1>
            <div className="actions">
                <span><Link to={'/'}> Inicio </Link></span>
                <button> <Link to={'./post'}>Crear Publicación</Link> </button>
            </div>
            <div className="marketContent">
                <Outlet/>
            </div>
        </div>
    </main>
  )
}

export default Market