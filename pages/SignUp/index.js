import React from 'react';
import Header from '../../components/Header/Header';
import SignUp from '../../components/SignUp/SignUp';

const SignUpPage = () => {
    const user = null;
    return(
        <div className="container">
            <Header user={user} />
            <SignUp />
        </div>
    );
}

export default SignUpPage;