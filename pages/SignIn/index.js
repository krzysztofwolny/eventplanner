import React from 'react';
import Header from '../../components/Header/Header';
import SignIn from '../../components/SignIn/SignIn';

const SignInPage = () => {
    const user = null;
    return(
        <div className="container">
            <Header user={user} />
            <SignIn />
        </div>
    );
}

export default SignInPage;