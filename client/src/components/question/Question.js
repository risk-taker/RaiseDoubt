import { useEffect, useState } from 'react';
import styles from './Question.module.css';

const Question = (props) => {
    const { problem } = props;
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const _id = problem._id

    const submit = async () => {
        const requestOption = {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: comment,
                quesId: _id
            })
        }
        await fetch('/api/comment', requestOption);

        setComment('');
        const getComments = async () => {
            const response = await fetch(`/api/comment/${problem._id}`);
            const comments = await response.json();
            setComments(comments[0].comments);
        }
        getComments();

    }

    useEffect(() => {
        const getComments = async () => {
            const response = await fetch(`/api/comment/${problem._id}`);
            const comments = await response.json();
            setComments(comments[0].comments);

        }
        getComments();
    }, [problem._id])
    return (
        <div className={styles.card}>
            <div className={styles.resolveWrapper}>
                <h4 className={styles.heading}>{problem.title}</h4>
                {problem.status === 'Resolved' && <p className={styles.resolveBtn}>Resolved</p>}
            </div>
            <p>{problem.desc}</p>
            {problem.answer && <h4 className={styles.answer}>Answer: <span className={styles.text}>{problem.answer}</span></h4>}
            <hr />
            <h3>Comment</h3>
            <div>
                {
                    comments.map(comment => (<p>{`${comment}`}</p>))

                }
                {/* <p>Jake: Good Doubt I also have the same one</p> */}
            </div>
            <div>
                <input className={styles.comment} type="text" name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button onClick={submit} className={styles.btn}>Comment</button>
            </div>
        </div>
    )
}

export default Question