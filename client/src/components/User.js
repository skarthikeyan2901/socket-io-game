import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {io} from 'socket.io-client';


function User() {

    const [inviteCode, setInviteCode] = useState('');    
    const [socket, setSocket] = useState();

    // const inviteFunc = () => {
    //     inviteCode = document.getElementById("invite").value;
    // }

    useEffect(() => {
        const s = io("http://localhost:3001/")
        setSocket(s)

        return () => {
            s.disconnect();
        }
    }, [])

    useEffect(() => {
        if(!socket) return;
        socket.emit('join-room', inviteCode);
    }, [socket, inviteCode]);


    return (
        <div>
            <div className="d-flex justify-content-center p-5">
                <input className="form-control form-control-lg m-5" type="text" placeholder="Enter the invite code" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)}></input>
            </div>
            <Link to="/usergame"><button className="btn btn-primary btn-lg buttonClass" >Join game</button></Link>
        </div>
    )
}

export default User;