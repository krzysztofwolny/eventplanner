import React, { useContext } from 'react';
import Header from '../../components/Header/Header';
import { UserContext } from '../../src/providers/UserProvider';
import { auth } from '../../src/firebase';

const UserHomePage = () => {
    const user = useContext(UserContext);
    
    const displayData = () => {
        if(user === undefined) {
            return(
                <p>You need to log in</p>
            );
        } else {
            return(
                <React.Fragment>
                    <div>You are loged!</div>
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                    <p>{user.photoURL}</p>
                    <button onClick={() => auth.signOut()}>Sign Out</button>
                </React.Fragment>
            );
        }
    }

    /*
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});
    */

    return(
        <div>
            <Header />
            {displayData()}
        </div>
    );
};

export default UserHomePage;