import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
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






// import React from "react";
// import { Form, Button, Spinner, Container, Row, Col } from "react-bootstrap";

// const Signup = () => {
//     const submitHandler = (e) => {
//         e.preventDefault();
//         console.log("Form submitted");
//     };

//     const isLoading = false; // Example state
//     const forgotPasswordHandler = () => {
//         console.log("Forgot password clicked");
//     };

//     return (
//         <Container>
//             <Row className="justify-content-md-center">
//                 <Col md={6}>
//                     <section className="mt-5" style={{ minHeight: "350px" }}>
//                         <h1>Sign Up</h1>
//                         <Form onSubmit={submitHandler}>
//                             <Form.Group controlId="email">
//                                 <Form.Label>Your Email</Form.Label>
//                                 <Form.Control type="email" required />
//                             </Form.Group>
//                             <Form.Group controlId="password" className="mt-3">
//                                 <Form.Label>Your Password</Form.Label>
//                                 <Form.Control type="password" required />
//                             </Form.Group>
//                             <Form.Group controlId="confirmPassword" className="mt-3">
//                                 <Form.Label>Confirm Password</Form.Label>
//                                 <Form.Control type="password" required />
//                             </Form.Group>
//                             <div className="mt-4">
//                                 {!isLoading ? (
//                                     <Button variant="primary" type="submit">
//                                         Sign Up
//                                     </Button>
//                                 ) : (
//                                     <Spinner animation="border" role="status">
//                                         <span className="visually-hidden">Loading...</span>
//                                     </Spinner>
//                                 )}
//                             </div>
//                             <div className="mt-3 text-center">
//                                 <Button
//                                     variant="link"
//                                     onClick={forgotPasswordHandler}
//                                     style={{ fontSize: "1rem", fontWeight: "bold", color: "#007bff" }}
//                                 >
//                                     Forgot Password? Click here to reset
//                                 </Button>
//                             </div>
//                         </Form>
//                     </section>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Signup;
