import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setAuth } = props;
    const submit = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
            })
        };
        const response = await fetch('/api/login', requestOptions)
        const data = await response.json();
        const { type } = data;
        if (type === 'student') {
            setAuth(true);
        }
        navigate(`/${type}`, { replace: true })

    }
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <input className={styles.text} type="text" name="email" id="myEmail" placeholder='email id' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className={styles.text} type="password" name="password" id="myPassword" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={submit} className={styles.btn} >LOGIN</button>
                <div className={styles.notRegistered}>
                    <p>Not registered</p>
                    <Link className={styles.link} to="/signup">Create an account</Link>
                </div>
            </div>
        </div>
    )
}

export default Login