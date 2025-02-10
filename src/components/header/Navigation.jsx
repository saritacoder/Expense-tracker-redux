import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react'
// import AuthContext from '../../../context/AuthContext'
import './Navigation.css';
import AuthContext from '../../context/AuthContext';

const Navigation = () => {

    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    const navigate = useNavigate();

    const logoutHandler =()=>{
        authCtx.logout();
        navigate('/login');
    }

  return (
    <header className='header'>
      <nav>
        <ul>

        {!isLoggedIn && (
            <li>
              <Link to='/'>
                <button>Login</button>
              </Link>
            </li>
          )}
{isLoggedIn &&(
  <div className='headerList'>
 <button>
 <Link to='/profile'>Profile</Link>
</button> 
</div>
)}

{isLoggedIn &&(
  <li>
    <button onClick={logoutHandler} className='logout'>Logout</button>
</li>
)}
       
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
