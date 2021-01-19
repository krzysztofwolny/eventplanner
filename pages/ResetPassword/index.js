import React from 'react';
import Header from '../../components/Header/Header';
import PasswordReset from '../../components/PasswordReset/PasswordReset';

const ResetPasswordPage = () => {
    const user = null;
    return(
        <div className="container">
            <Header user={user} />
            <PasswordReset />
        </div>
    );
}

export default ResetPasswordPage;