import React from 'react';
import Link from 'next/link';
import styles from './SignUpButton.module.scss';

const SignUpButton = ({ goWhere }) => {
    return(
        <div className="signup">
            <Link href={goWhere}><a>Sign Up</a></Link>
        </div>
    );
}

export default SignUpButton;