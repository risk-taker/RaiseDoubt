import './App.css';
import { Routes, Route } from 'react-router-dom';
import StudentPage from './pages/studentPage/StudentPage';
import TeacherPage from './pages/teacherPage/TeacherPage';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import Navbar from './components/navbar/Navbar';
import { useState } from 'react';
import SolveDoubt from './pages/solveDoubt/SolveDoubt';
// import { useState } from 'react';

function App() {
    const [auth, setAuth] = useState(false);
    const [data, setData] = useState('nochange');
    console.log(auth);
    return (
        <>
            {auth && <Navbar setAuth={setAuth} setData={setData} />}
            <Routes>
                <Route path='/' element={<Login setAuth={setAuth} setData={setData} />}></Route>
                <Route path='/signup' element={<SignUp setAuth={setAuth} />}></Route>
                <Route path='/student' element={<StudentPage data={data} setData={setData} />}></Route>
                <Route path='/teacher' element={<TeacherPage setAuth={setAuth} data={data} />}></Route>
                <Route path='/teacher/:id' element={<SolveDoubt />}></Route>
            </Routes>
        </>
    );
}

export default App;
