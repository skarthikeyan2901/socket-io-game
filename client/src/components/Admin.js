import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Admin() {

    const [id, setId] = useState();

    const generateNumber = () => {
        let n = Math.floor(Math.random() * 90000) + 10000;
        setId(n);
    }

    return (
        <div>
            <div style={{textAlign: "center"}}>
                <button className="btn btn-primary btn-lg buttonClass" onClick={generateNumber}>Generate invite code</button>
            </div>
            {id ? <h2 style={{textAlign: "center"}}>Invite code {id}</h2>: <div/>}
            <div style={{ textAlign: "center" }}>
                <Link to="/admingame"><button className="btn btn-primary btn-lg buttonClass">Start Game</button></Link>
            </div>
        </div>
    )
}

export default Admin;