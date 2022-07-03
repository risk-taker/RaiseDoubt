import React, { useEffect, useState } from 'react';
import styles from './TeacherPage.module.css';
import { useNavigate } from 'react-router-dom';
import TeachQuestion from '../../components/teachQuestion/TeachQuestion';

const TeacherPage = (props) => {
    const [questions, setQuestions] = useState([]);
    const { setAuth, data } = props;
    const navigate = useNavigate();


    function logout() {
        fetch('/api/logout')
            .then(response => response.json())
            .then(data => { });
        setAuth(false)
        navigate('/', { replace: true });
    }
    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch('/api/unsolved')
            const data = await response.json();
            setQuestions(data);
        }
        fetchdata();
    }, [data]);
    return (
        <>
            <div className={`${styles.wrapper} container`}>
                <div className={styles.logoWrapper}>
                    <img src="/images/logo.png" alt="logo" />
                    <h2>Raise Doubt</h2>
                </div>
                <div>
                    <button onClick={logout} className={styles.btn}>Logout</button>
                </div>
            </div>
            <div className={`container`}>
                <h1>Solve Doubts</h1>
                {/* <TeachQuestion />
                <TeachQuestion />
                <TeachQuestion />
                <TeachQuestion /> */}
                {
                    questions.map(problem => (
                        <TeachQuestion problem={problem} key={problem._id} />
                    ))
                }
            </div>
        </>
    )
}

export default TeacherPage;