import { Link } from 'react-router-dom'
import './signup.css'

export default function Signup() {
  return (
    <div className=" signup">
        <div className='card'>
        <div className="left">
            <h2>NapaExtra Signup<br />-</h2>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati quo fugiat voluptas tempore soluta ut! Ipsa 
            </p>
            <span>Do Not have any account?</span>
            <Link to='/login'>
              <button className='btn btn-primary'>Login</button>
            </Link>
        </div>
        <form className="right">
            <input type="text"  required placeholder='username' />
            <input type="email"  required placeholder='email' />
            <input type="password"  required placeholder='password' />
            <button type='submit' className='btn'>Register</button>
        </form>   
    </div>
    </div>
  )
}
