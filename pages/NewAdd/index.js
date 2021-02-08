import React, { useContext } from 'react';
import { UserContext } from '../../src/providers/UserProvider';
import Header from '../../components/Header/Header';
import NewAdd from '../../components/NewAdd/NewAdd';
import YourAdds from '../../components/YourAdds/YourAdds';

const NewAddPage = () => {
    const user = useContext(UserContext);

    return(
        <div className="container">
            <Header />
            <NewAdd user={user} />
            <YourAdds user={user} />
        </div>
    );
}

export default NewAddPage;