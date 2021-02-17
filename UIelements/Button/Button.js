import React from 'react';
import styles from './Button.module.scss';

const Button = ({ clickAction, buttonType, children, isScalable }) => {
    const scalable = isScalable ? styles.button__small : null;
    return(
        <button
            className={`${styles.button} ${styles[buttonType]} ${scalable}`} 
            onClick={clickAction}>{children}</button>
    );
}

export default Button