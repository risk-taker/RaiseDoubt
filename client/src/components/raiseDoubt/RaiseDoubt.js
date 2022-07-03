import { useState } from 'react';
import styles from './RaiseDoubt.module.css';

const RaiseDoubt = (props) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const { setDoubt, setData } = props;

    const askDoubt = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                desc
            })
        };
        const response = await fetch('/api/askdoubt', requestOptions)
        const data = await response.json();
        if (data) {
            setTitle('');
            setDesc('');
            setData('changed');
            window.alert("question asked successfully!");
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <button onClick={() => setDoubt(false)} className={styles.cancelBtn}>
                    <img src="/images/cancel.png" alt="cancel" />
                </button>
                <h6 className={styles.title}>Title</h6>
                <input type="text" name="title" id="title" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
                <h6>Description</h6>
                <input type="text" name="desc" id="desc" className={styles.input} value={desc} onChange={(e) => setDesc(e.target.value)} />
                <button className={styles.btn} onClick={askDoubt}>Ask Doubt</button>
            </div>
        </div>
    )
}

export default RaiseDoubt