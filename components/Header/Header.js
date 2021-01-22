import React, { useContext} from 'react';
import styles from './Header.module.scss';
import { UserContext } from '../../src/providers/UserProvider';
import Logo from './Logo/Logo';
import SignInButton from './SignInButton/SignInButton';
import UserMenu from './UserMenu/UserMenu';

const Header = () => {
    const user = useContext(UserContext);
    const signUpOrMenu = user ? <UserMenu /> : <SignInButton />;
    return(
        <section className={styles.header}>
            <Logo />
            <div>{signUpOrMenu}</div>
        </section>
    );
}

export default Header;