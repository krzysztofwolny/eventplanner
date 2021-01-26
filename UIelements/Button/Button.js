import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import React, { Children } from 'react';
import styles from './Button.module.scss';

const Button = ({ clickAction, buttonType, children }) => {
    return(
        <button
            className={`${styles.button} ${styles[buttonType]}`} 
            onClick={clickAction}>{children}</button>
    );
}

export default Button