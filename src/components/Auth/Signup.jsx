import { useState, useRef } from 'react';

import classes from './Signup.module.css';

const Signup = () => {
    const emailInputRef = useRef();
 const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

const enteredEmail = emailInputRef.current.value;
const enteredPassword = passwordInputRef.current.value;

setIsLoading(true);
setErrorMessage('');


let url;
if(isLogin){
    url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbUy5evKN-VSMQp6pan71s_ydy5W0gD_s'
   
}else{
    url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbUy5evKN-VSMQp6pan71s_ydy5W0gD_s";
}
    fetch(url,
    
    {
            method: 'POST',
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((res)=>{
        
    setIsLoading(false);

    if(res.ok){
        return res.json().then((data)=>{
            console.log(data);
        })
    }else{
        return res.json() .then(data => {
            // //show an error modal
            // console.log(data);
            let errorMesssage = 'Authentication Failed!';
            // if(data && data.error && data.error.message){
            //   errorMesssage = data.error.message
            // }
            throw new Error(errorMessage);
            
          })
    }
})

.catch((err) => {
    setIsLoading(false);
    setErrorMessage('Something went wrong!'); // Handled network errors
    alert('Something went wrong!'); // Alert for network errors
})


  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
          />
        </div>
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Signup;





