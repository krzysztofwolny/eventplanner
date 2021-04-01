import React, { useContext } from 'react';
import { UserContext } from '../../src/providers/UserProvider';
import { withRouter } from 'next/router';
import Header from '../../components/Header/Header';
import AddToEventConfirmation from '../../components/AddToEventConfirmation/AddToEventConfirmation';

const AddToEventConfirmationPage = (props) => {
    const user = useContext(UserContext);
    return(
        <>
            <Header />
            <AddToEventConfirmation user={user}
                                    addID={props.router.query.addID}
                                    addOwnerID={props.router.query.addOwnerID}
                                    addDate={props.router.query.addDate}/>
        </>
    );
};

export default withRouter(AddToEventConfirmationPage);