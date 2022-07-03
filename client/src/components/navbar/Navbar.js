import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import RaiseDoubt from '../raiseDoubt/RaiseDoubt';

const Navbar = (props) => {
    const navigate = useNavigate();
    const { setAuth, setData } = props;
    const [doubt, setDoubt] = useState(false);


    function logout() {
        fetch('/api/logout')
            .then(response => response.json())
            .then(data => { });
        setAuth(false)
        navigate('/', { replace: true });
    }
    function raiseDoubt() {
        setDoubt(true);
    }

    return (
        <>
            <div className={`${styles.wrapper} container`}>
                <div className={styles.logoWrapper}>
                    <img src="/images/logo.png" alt="logo" />
                    <h2>Raise Doubt</h2>
                </div>
                <div>
                    <Link className={styles.link} to='/student'>Problems</Link>
                    <span className={styles.link} onClick={raiseDoubt}>Raise Doubt</span>
                    <button onClick={logout} className={styles.btn}>Logout</button>
                </div>
            </div>
            {doubt && <RaiseDoubt setDoubt={setDoubt} doubt={doubt} setData={setData} />}
        </>
    )
}

export default Navbar