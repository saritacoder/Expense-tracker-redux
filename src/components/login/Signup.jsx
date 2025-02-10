

import { useState, useRef,useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import classes from './Signup.module.css';

const Signup = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


const authCtx = useContext(AuthContext);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);
        setErrorMessage('');

        let url = isLogin
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbUy5evKN-VSMQp6pan71s_ydy5W0gD_s'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbUy5evKN-VSMQp6pan71s_ydy5W0gD_s';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json().then((data) => {
                        console.log(data);
                        authCtx.login(data.idToken); // Stored the token in AuthContext
                    navigate('/profile')
                    
                    });
                } else {
                    return res.json().then(data => {
                        let errorMesssage = 'Authentication Failed!';
                        if(data && data.error && data.error.message){
                            errorMesssage = data.error.message
                    }
                        setErrorMessage(errorMesssage);
                        alert(errorMesssage);
                    });
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setErrorMessage('Something went wrong!');
                alert('Something went wrong!');
            });
    };

    return (
        <section>
            <form onSubmit={submitHandler} className={classes.auth}>
                <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordInputRef} />
                </div>

                <div className={classes.actions}>
                    {!isLoading && <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p>Sending Request...</p>}
                </div>

                <p className={classes.toggleText}>
                    {isLogin ? (
                        <>
                            Don’t have an account?{' '}
                            <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
                                Create Here
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
                                Login Here
                            </button>
                        </>
                    )}
                </p>
            </form>
        </section>
    );
};

export default Signup;

