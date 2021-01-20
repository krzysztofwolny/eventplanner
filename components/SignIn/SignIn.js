import React, { useState } from 'react';
import Link from 'next/link';
import { auth, signInWithGoogle } from '../../src/firebase';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
            event.preventDefault();
            auth.signInWithEmailAndPassword(email, password).catch(error => {
              setError("Error signing in with password and email!");
              console.error("Error signing in with password and email", error);
            });
        };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
  
        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };

    return(
        <React.Fragment>
        <h1>Sign In Page</h1>
        <form>
          <label htmlFor="userEmail">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            value = {email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword">
            Password:
          </label>
          <input
            type="password"
            name="userPassword"
            value = {password}
            placeholder="Your Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign in
          </button>
        </form>
        <p>or</p>
        <button onClick={() => signInWithGoogle()}>
          Sign in with Google
        </button>
        <p className="text-center my-3">
          Don't have an account?{" "}
          <Link href="#">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link href="/ResetPassword">
            Forgot Password?
          </Link>
        </p>
      </React.Fragment>
    );
}

export default SignIn;