import React, { useEffect, useState } from 'react';
import styles from './SolveDoubt.module.css';
import { useParams, useNavigate } from 'react-router-dom';

const SolveDoubt = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();
    const [first, setFirst] = useState(false);


    const submit = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                answer,
            })
        };
        await fetch(`/api/answer/${id}`, requestOptions)

        window.alert("answerd Successfully");
        setAnswer('');
        navigate('/teacher', { replace: true });

    }
    useEffect(() => {
        const getComments = async () => {
            const response = await fetch(`/api/comment/${id}`);
            const questions = await response.json();
            setQuestion(questions[0]);
            setFirst(true)
        }
        getComments();
    }, [id])
    console.log(question);
    return (
        <>
            <div className={`${styles.wrapper} container`}>
                <div className={styles.logoWrapper}>
                    <img src="/images/logo.png" alt="logo" />
                    <h2>Raise Doubt</h2>
                </div>
            </div>
            <h1 className='container'>Solve Doubts</h1>
            <div className={`${styles.quesWrapper} container`}>
                <div className={styles.left}>
                    <h3>{question.title}</h3>
                    <p className={styles.title}>{question.desc}</p>
                    <hr />
                    <h4>Comments</h4>
                    <div className={styles.comment}>
                        {
                            first && question.comments.map(comment => (
                                <p>{comment}</p>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.right} >
                    <h4 bold>Answer</h4>
                    <input type="text" name="answer" id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                    <div>
                        <button onClick={submit} className={styles.btn}>Answer</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SolveDoubt