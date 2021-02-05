import React, { useState, useContext} from 'react';
import styles from './Header.module.scss';
import { UserContext } from '../../src/providers/UserProvider';
import Logo from './Logo/Logo';
import SignInButton from './SignInButton/SignInButton';
import UserMenu from './UserMenu/UserMenu';
import SidebarMenu from './SidebarMenu/SidebarMenu';

const Header = () => {
    const user = useContext(UserContext);
    const [sidebarStatus, setSidebarStatus] = useState(false);
    const [sidebarWillUnmount, setSidebarWillUnmount] = useState(false);
    const signUpOrMenu = user ? 
                        <UserMenu 
                            openCloseSidebar={() => openCloseSidebarHandler()}
                            /> : 
                        <SignInButton />;
    const displaySidebar = sidebarStatus ? <SidebarMenu willUnmount={sidebarWillUnmount} /> : null;

    const openCloseSidebarHandler = async () => {
        if(sidebarStatus) {
            setSidebarWillUnmount(true);
            await setTimeout(() => {
                setSidebarStatus(false);
                setSidebarWillUnmount(false);
            }, 500);
        } else {
            setSidebarStatus(true);
        }
    };

    return(
        <React.Fragment>
            <section className={styles.header}>
                <Logo />
                <div>{signUpOrMenu}</div>
                {displaySidebar}
            </section>  
        </React.Fragment>
    );
}

export default Header;