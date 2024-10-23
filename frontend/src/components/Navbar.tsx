import { Router, Routes, Route, Link } from 'react-router-dom';
import home_icon from '../icons/home_icon.png';
import '../App.css';

export const Navbar = () => {
    return (
        <div>
            <h2> SCHEDULER </h2>
            <br></br>
            <div className='link'>
                <img src={home_icon} alt="home icon" width="25" height="25"/>
                <Link to={"/"}> Home </Link>
            </div>
            <br></br>
            <div className='link'>
                <Link className='link' to={"/Completed"}> Completed </Link>
            </div>
            <br></br>
            <div className='link'>
                <Link className='link' to={"/Work"}> Work </Link>
            </div>
        </div>
    );
}