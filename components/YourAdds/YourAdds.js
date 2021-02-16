import React, { useState } from 'react';
import styles from './YourAdds.module.scss';
import Spinner from '../../UIelements/Spinner/Spinner';
import ShowAddItem from './ShowAddItem/ShowAddItem';

const YourAdds = ({userAdds}) => {
    const [showSpinner, setShowSpinner] = useState(false);

    console.log(userAdds);

    const copyUserAdds = userAdds ? [...userAdds] : [];

    const printContent = () => {
        const output = copyUserAdds.map(el => {
            return(
                    <ShowAddItem date={el.date}
                                from={el.timestampFrom.seconds}
                                to={el.timestampTo.seconds}
                                title={el.title}
                                desc={el.desc}
                                who={el.user}
                                key={el.docID}
                                docID={el.docID}
                    />
            );
        });
        return output;
    }

    return(
        <div className={styles.form}>
            <ul className={styles.yourAdds__list}>{printContent()}</ul>
        </div>
    );
};

export default YourAdds;