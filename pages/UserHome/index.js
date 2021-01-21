import React, { useContext } from 'react';
import Router from 'next/router';
import Header from '../../components/Header/Header';
import { UserContext } from '../../src/providers/UserProvider';
import { auth } from '../../src/firebase';

const UserHomePage = () => {
    const user = useContext(UserContext);

    const signOutHandler = () => {
            Router.push("/");
            auth.signOut();
    };

    const printContent = () => {
        if(!user) {
            return <div>You need to be logged</div>
        } else {
            return(
                <React.Fragment>
                    <div>You are loged!</div>
                    <p>{user.uid}</p>
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                    <p>{user.photoURL}</p>
                    <button onClick={() => signOutHandler()}>Sign Out</button>
                </React.Fragment>
            );
        }
    }

    return(
        <div>
            <Header />
            {printContent()}
        </div>
    );
};

export default UserHomePage;