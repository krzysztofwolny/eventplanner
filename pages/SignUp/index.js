import React, { useContext} from 'react';
import Router from 'next/router';
import { UserContext } from '../../src/providers/UserProvider';
import Header from '../../components/Header/Header';
import SignUp from '../../components/SignUp/SignUp';

const SignUpPage = () => {
    const user = useContext(UserContext);

    if(user) {
        Router.push("/UserHome")
    };

    return(
        <div className="container">
            <Header />
            <SignUp />
        </div>
    );
}

export default SignUpPage;