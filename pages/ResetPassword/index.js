import React, { useContext } from 'react';
import Router from 'next/router';
import { UserContext } from '../../src/providers/UserProvider';
import Header from '../../components/Header/Header';
import PasswordReset from '../../components/PasswordReset/PasswordReset';

const ResetPasswordPage = () => {
    const user = useContext(UserContext);

    if(user) {
        Router.push("/UserHome")
    };
    return(
        <div className="container">
            <Header />
            <PasswordReset />
        </div>
    );
}

export default ResetPasswordPage;