import React from 'react';
import styles from './Header.module.scss';
import SignInButton from './SignInButton/SignInButton';
import SignUpButton from './SignUpButton/SignUpButton';

const Header = ({ user }) => {
    const signUpOrIn = user ? <SignInButton goWhere="/SignIn" /> : <SignUpButton goWhere="/SignUp"/>;
    return(
        <section className={styles.header}>
            <p className={styles.header__p}>Header</p>
            <div>{signUpOrIn}</div>
        </section>
    );
}

export default Header;