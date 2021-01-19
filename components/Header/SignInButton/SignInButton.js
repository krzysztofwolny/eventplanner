import React from 'react';
import Link from 'next/link';
import styles from './SignInButton.module.scss';

const SignInButton = ({ goWhere }) => {
    return(
        <div className="signin">
            <Link href={goWhere}><a>Sign In</a></Link>
        </div>
    );
}

export default SignInButton;