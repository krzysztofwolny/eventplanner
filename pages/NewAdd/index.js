import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../src/providers/UserProvider';
import Header from '../../components/Header/Header';
import NewAdd from '../../components/NewAdd/NewAdd';
import YourAdds from '../../components/YourAdds/YourAdds';

import { searchFirebase } from '../../src/firebase';

const NewAddPage = () => {
    const user = useContext(UserContext);
    const [adds, setAdds] = useState();

    const fetchAdds = async () => {
        const fetchAdds = await searchFirebase("adds", "user", user.uid);
            setAdds(fetchAdds);
    };

    useEffect(async () => {
        if(user) {
            fetchAdds();
        }
    }, []);

    const refreshHandler = async () => {
        fetchAdds();
    };

    console.log(adds);

    return(
        <div className="container">
            <Header />
            <NewAdd user={user} refresh={refreshHandler}/>
            <YourAdds userAdds={adds} />
        </div>
    );
}

export default NewAddPage;