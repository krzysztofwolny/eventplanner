import React, {useContext} from 'react';
import Router from 'next/router';
import { UserContext } from '../../src/providers/UserProvider';
import Header from '../../components/Header/Header';
import SignIn from '../../components/SignIn/SignIn';

const SignInPage = () => {
    const user = useContext(UserContext);

    if(user) {
        Router.push("/UserHome")
    };
    return(
        <div className="container">
            <Header />
            <SignIn />
        </div>
    );
}

export default SignInPage;