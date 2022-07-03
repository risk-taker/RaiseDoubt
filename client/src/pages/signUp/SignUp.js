import React, { useState } from 'react';
import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');
    const [type, setType] = useState('student');
    const navigate = useNavigate();
    const { setAuth } = props;
    const submit = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password,
                type
            })
        };

        const response = await fetch('/api/signup', requestOptions)
        const data = response.json();
        console.log(data);

        console.log("not working");
        if (type === 'student') {
            console.log("working");
            setAuth(true);
            navigate('/student', { replace: true })
        } else {
            navigate('/teacher', { replace: true })
        }
    }

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <div>
                    <button className={`${styles.stuTeachBtn} ${type === 'student' ? styles.active : ''} ${type === 'teacher' ? styles.inactive : ''}`} onClick={() => setType('student')}>Student</button>
                    <button className={`${styles.stuTeachBtn} ${type === 'teacher' ? styles.active : ''} ${type === 'student' ? styles.inactive : ''}`} onClick={() => setType('teacher')}>Teacher</button>
                </div>
                <input className={styles.text} type="text" name="name" id="myName" placeholder='enter your name' value={name} onChange={(e) => setName(e.target.value)} />
                <input className={styles.text} type="text" name="email" id="myEmail" placeholder='email id' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className={styles.text} type="password" name="password" id="myPassword" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className={styles.text} type="password" name="cnfpassword" id="myCnfPassword" placeholder='confirm password' value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)} />
                <button className={styles.btn} onClick={submit} >SIGN UP</button>
                <div className={styles.notRegistered}>
                    <p>Already Registered</p>
                    <Link className={styles.link} to="/">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp