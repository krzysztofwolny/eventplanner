import React, { Component, createContext, useState, useEffect } from 'react';
import { auth, generateUserDocument } from '../firebase';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
      user: null
    };
  
    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
          const user = await generateUserDocument(userAuth);
          this.setState({ user });
        });
      };


    render() {
      return (
        <UserContext.Provider value={this.state.user}>
          {this.props.children}
        </UserContext.Provider>
      );
    }
  }
  
/*
 const UserProvider = (props) => {
  const [ProviderContext, setProviderContext] = useState({
    user: null
  });

useEffect(() => {
    auth.onAuthStateChanged( userAuth => {
    const user = generateUserDocument(userAuth);
    setProviderContext({ user });
  });
}, [ProviderContext.user]);

  return(
    <UserContext.Provider value={ProviderContext.user}>
        {props.children}
      </UserContext.Provider>
  );
}
*/

  export default UserProvider;