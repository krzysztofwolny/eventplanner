import React from 'react';
import styles from './YourAdds.module.scss';
import ShowAddItem from './ShowAddItem/ShowAddItem';

const YourAdds = ({userAdds, deleteItemHandler}) => {

    const copyUserAdds = userAdds ? [...userAdds] : [];

    const printContent = () => {
        const output = copyUserAdds.map(el => {
            return(
                    <ShowAddItem date={el.date}
                                from={el.timestampFrom.seconds}
                                to={el.timestampTo.seconds}
                                title={el.title}
                                desc={el.desc}
                                who={el.userName}
                                key={el.docID}
                                docID={el.docID}
                                deleteItem={(docID) => deleteItemHandler(docID)}
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