import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../src/providers/UserProvider';
import Header from '../../components/Header/Header';
import NewAdd from '../../components/NewAdd/NewAdd';
import YourAdds from '../../components/YourAdds/YourAdds';

import { searchFirebase, deleteItemFromFirebase } from '../../src/firebase';
import { sortAddsByDate } from '../../customHooks/sortObjects';

const NewAddPage = () => {
    const user = useContext(UserContext);
    const [adds, setAdds] = useState();

    const fetchAdds = async () => {
        const fetchAdds = await searchFirebase("adds", "user", user.uid);
        const transformed = sortAddsByDate(fetchAdds);
        setAdds(transformed);
    };

    useEffect(async () => {
        if(user) {
            fetchAdds();
        }
    }, []);

    const refreshHandler = async () => {
        fetchAdds();
    };

    const deleteItemHandler = (docID) => {
        deleteItemFromFirebase("adds", docID);
        fetchAdds();
    };

    return(
        <div className="container">
            <Header />
            <NewAdd user={user} refresh={refreshHandler}/>
            <YourAdds userAdds={adds} deleteItemHandler={(docID) => deleteItemHandler(docID)} />
        </div>
    );
}

export default NewAddPage;