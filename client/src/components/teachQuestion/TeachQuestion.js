import React from 'react';
import styles from './TeachQuestion.module.css';
import { Link } from 'react-router-dom';

const TeachQuestion = (props) => {
    const { problem } = props;

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <h3>{problem.title}</h3>
                {/* <button onClick={accept}>Accept</button> */}
                <Link className={styles.comment} to={`/teacher/${problem._id}`} problem={problem}>Accept</Link>
            </div>
        </div>
    )
}

export default TeachQuestion