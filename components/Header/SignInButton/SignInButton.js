import React from 'react';
import Link from 'next/link';
import styles from './SignInButton.module.scss';

const SignInButton = () => {
    return(
        <div className={styles.signin}>
            <Link href="/SignUp"><a className={styles.signin__button + " " + styles.signin__button_up}>New User</a></Link>
            <Link href="/SignIn"><a className={styles.signin__button + " " + styles.signin__button_in}>Sign In</a></Link>
        </div>
    );
}

export default SignInButton;