import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { auth, signInWithGoogle } from '../../src/firebase';

import Button from '../../UIelements/Button/Button';

import styles from './SignIn.module.scss';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
            event.preventDefault();
            auth.signInWithEmailAndPassword(email, password)
            .then(
              Router.push("/UserHome")
            )
            .catch(error => {
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
      <div className={styles.signUp__mainWraper}>
        <div className={styles.signUp}>
          <h1 className={styles.signUp__mainLabel}>Sign In</h1>
          <form className={styles.signUp__form}>
            <label htmlFor="userEmail" className={styles.signUp__inputLabel}>
              Email:
            </label>
            <input
              className={styles.signUp__input}
              type="email"
              name="userEmail"
              value = {email}
              placeholder="E.g: faruq123@gmail.com"
              id="userEmail"
              onChange = {(event) => onChangeHandler(event)}
            />
            <label htmlFor="userPassword" className={styles.signUp__inputLabel}>
              Password:
            </label>
            <input
              className={styles.signUp__input}
              type="password"
              name="userPassword"
              value = {password}
              placeholder="Your Password"
              id="userPassword"
              onChange = {(event) => onChangeHandler(event)}
            />
            <Button 
              clickAction={(event) => signInWithEmailAndPasswordHandler(event, email, password)}
            >
              Sign in
            </Button>
          </form>
          <p className={styles.signUp__signsSecondary}>or</p>
          <Button 
            clickAction={() => signInWithGoogle()}
            buttonType="button__google"
          >
            Sign in with Google
          </Button>
          <p className={styles.signUp__signsSecondary1}>
            <Link href="/SignUp">
              Don't have an account? Sign up here
            </Link>{" "}
          </p>
          <p className={styles.signUp__signsSecondary1}>
            <Link href="/ResetPassword">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    );
}

export default SignIn;