import React, { useState } from 'react';
import styles from './YourAdds.module.scss';
import Spinner from '../../UIelements/Spinner/Spinner';

const YourAdds = ({user}) => {
    const [adds, setAdds] = useState({});

    const printContent = () => {
        if(user) {
            //fetch
        } else {
            return <Spinner />
        }
    }

    return(
        <div className={styles.form}>{printContent()}</div>
    );
};

export default YourAdds;