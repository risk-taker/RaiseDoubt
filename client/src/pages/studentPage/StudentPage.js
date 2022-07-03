import React, { useEffect, useState } from 'react';
import styles from './Student.module.css';
import Question from '../../components/question/Question';

const StudentPage = (props) => {
    const [questions, setQuestoins] = useState([]);
    const { setData, data } = props;

    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch('/api/questions', { withCredentials: true })
            const data = await response.json();
            setQuestoins(data);
            setData('nochange');
        }
        fetchdata();
    }, [data, setData]);

    return (
        <div className={`${styles.wrapper} container`}>
            {
                questions.map(problem => (
                    <Question problem={problem} key={problem._id} />
                ))
            }
        </div>
    )
}

export default StudentPage