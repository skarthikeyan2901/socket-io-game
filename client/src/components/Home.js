import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';

function Home() {



    return (
        <div>
            <h1 className="welcome">Welcome!</h1><br/>
            <h2 className="chooseText">Choose mode to enter the game</h2>
            <div style={{textAlign: "center"}}>
                <Link to="/admin"><button className="btn btn-primary btn-lg buttonClass">Admin</button></Link>
                <Link to="/user"><button className="btn btn-primary btn-lg buttonClass">User</button></Link>
            </div>
        </div>
    )
}

export default Home;