import React, {useState} from "react";
import Link from "next/link";
import { auth, generateUserDocument, signInWithGoogle } from '../../src/firebase';
import styles from './SignUp.module.scss';

import Button from '../../UIelements/Button/Button';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, {displayName});
            console.log('założyłeś konto!');
          }
          catch(error){
            setError('Error Signing up with email and password');
            console.log('nie masz konta!');
          }

        setEmail("");
        setPassword("");
        setDisplayName("");
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
          setEmail(value);
        } else if (name === "userPassword") {
          setPassword(value);
        } else if (name === "displayName") {
          setDisplayName(value);
        }
      };

    return(
        <div className={styles.signUp__mainWraper}>
            <div className={styles.signUp}>
                <h1 className={styles.signUp__mainLabel}>Sign Up</h1>
                
                    {error !== null && (<div>{error}</div>)}
                    <form className={styles.signUp__form}>
                        <label htmlFor="displayName" className={styles.signUp__inputLabel}>
                            Display Name:
                        </label>
                        <input
                            className={styles.signUp__input}
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="E.g: Faruq"
                            id="displayName"
                            onChange={event => onChangeHandler(event)}
                        />
                        <label htmlFor="userEmail" className={styles.signUp__inputLabel}>
                            Email:
                        </label>
                        <input
                            className={styles.signUp__input}
                            type="email"
                            name="userEmail"
                            value={email}
                            placeholder="E.g: faruq123@gmail.com"
                            id="userEmail"
                            onChange={event => onChangeHandler(event)}
                        />
                        <label htmlFor="userPassword" className={styles.signUp__inputLabel}>
                            Password:
                        </label>
                        <input
                            className={styles.signUp__input}
                            type="password"
                            name="userPassword"
                            value={password}
                            placeholder="Your Password"
                            id="userPassword"
                            onChange={event => onChangeHandler(event)}
                        />
                        <Button
                            clickAction={event => {
                            createUserWithEmailAndPasswordHandler(event, email, password);
                            }}>
                            Sign up
                        </Button>
                    </form>
                    <p className={styles.signUp__signsSecondary}>or</p>
                    <Button 
                        clickAction={() => signInWithGoogle()}
                        buttonType="button__google"
                    >
                        Sign In with Google
                    </Button>
                    <p className={styles.signUp__signsSecondary1}>
                        <Link href="/SignIn">
                            Already have an account?                     
                            Sign in here
                        </Link>
                    </p>
                
            </div>
        </div>
    );
}

export default SignUp