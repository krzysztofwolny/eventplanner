import React, { useState } from 'react';
import Link from 'next/link';
import { auth } from '../../src/firebase';
import styles from './PasswordReset.module.scss';
import Button from '../../UIelements/Button/Button';

const PasswordReset = () => {

    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            setEmail(value);
        }
    };

    const sendResetEmail = event => {
        event.preventDefault();
        auth
        .sendPasswordResetEmail(email)
        .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
        console.log('sukcess!')
      })
      .catch((error) => {
        setError("Error resetting password");
        console.log(error);
      });
    };

    return(
        <div className={styles.signUp__mainWraper}>
            <div className={styles.signUp}>
                <h1 className={styles.signUp__mainLabel}>
                    Reset your Password
                </h1>
                    <form className={styles.signUp__form} action="">
                        {emailHasBeenSent && (
                            <div>
                                An email has been sent to you!
                            </div>
                        )}
                        {error !== null && (
                            <div>
                                {error}
                            </div>
                        )}
                        <label htmlFor="userEmail" className={styles.signUp__inputLabel}>
                            Email:
                        </label>
                        <input
                            className={styles.signUp__input}
                            type="email"
                            name="userEmail"
                            id="userEmail"
                            value={email}
                            placeholder="Input your email"
                            onChange={onChangeHandler}
                        />
                        <Button clickAction={() => sendResetEmail()}>
                            Send reset link
                        </Button>
                    </form>
                    <p className={styles.signUp__signsSecondary1}>
                        <Link href="/SignIn">
                            &larr; back to sign in page
                        </Link>
                    </p>
            </div>
        </div>
    );
}

export default PasswordReset;