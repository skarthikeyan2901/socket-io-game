import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {io} from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import PacmanLoader from "react-spinners/PacmanLoader";

const useStyles = makeStyles((theme) => ({
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '85vh',
        fontSize: '30px'
    },
    buttonDiv: {
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        width: '50%',
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainDiv: {
        display: 'flex'
    },
    divWrapper: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(15),
        textAlign: 'center',
        flex: '1',
        maxHeight: '60vh'
    },
    buttonClass: {
        margin: '20px',
        width: '170px',
        height: '60px',
        fontSize: '16px',
    },
    message_container: {
        overflowY: 'scroll',
        flex: '1',
        backgroundColor: '#e3f8fa'
    },
    chat__container: {
        // flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '100vh',
        width: '33vw',
        right: 0
    },
    form: {
        backgroundColor: "#141414"
    },
    input: {
        marginLeft: '10px',
        background: 'transparent',
        padding: '15px',
        outlineWidth: 0,
        width: '90%',
        border: 'none',
        outline: 'none',
        color: 'white',
        fontSize: '1rem'
    },
    chat__header: {
        display: 'flex',
        backgroundColor: "#141414",
        color: 'white',
        width: '100%',
        height: 'fit-content',
        alignItems: 'center',
    },
    chat__headertext: {
        marginLeft: '25px',
    },
    list: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    listElement: {
        fontSize: '20px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

function Game() {

    const classes = useStyles();
    const [socket, setSocket] = useState();
    const location = useLocation();
    const { name, inviteCode } = location.state;
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [roundNumber, setRoundNumber] = useState(1);
    const [clientResponse, setClientResponse] = useState();
    const [isScoreDisplayed, setIsScoreDisplayed] = useState(false);
    const [totalScores, setTotalScores] = useState();
    const [message, setMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        const s = io("http://localhost:3001/")
        setSocket(s)

        return () => {
            console.log('Disconnected');
            s.disconnect();
        }
    }, [])

    useEffect(() => {
        if (!socket || !inviteCode) return;
        socket.emit('join-room', inviteCode, name);
        socket.on('successMessage', (i) => {
            // alert('Successful connection established at ' + i);
        })
    }, [socket, inviteCode, name]);

    if(socket) {
        socket.on('start-game', () => {
            setGameStarted(true);
        })
    }

    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit("send-message", message, name, inviteCode)
        setMessage("")
    }

    useEffect(() => {
        if (socket == null) return
        socket.on("receive-message", (message, user) => {
            display(message, user)
        })
    }, [inviteCode, socket])


    const display = (message, user) => {
        const mes = document.createElement("div")
        const nameDiv = document.createElement("div")
        nameDiv.textContent = user
        mes.style.padding = '7px 10px'
        mes.style.margin = "5px 15px 15px 15px"
        nameDiv.style.margin = "15px 15px 0 15px"
        mes.style.maxWidth = "50%"
        nameDiv.style.fontWeight = "bold"
        mes.style.width = "max-content"
        mes.style.height = "auto"
        mes.style.wordWrap = "break-word"
        nameDiv.style.wordWrap = "break-word"
        mes.style.backgroundColor = "#141414"
        mes.style.color = "white"
        mes.style.alignSelf = "flex-start"
        nameDiv.style.alignSelf = "flex-start"
        mes.style.borderRadius = "10px"
        mes.textContent = message
        document.querySelector("#messages").append(nameDiv)
        document.querySelector("#messages").append(mes)
        // const chCont = document.querySelector(".message-container")
        // const ch = chCont?.scrollHeight
        // if(ch) {chCont.scroll(0, ch)}
    }

    const handleClick1 = () => {
        setClientResponse(1);
    }

    const handleClick2 = () => {
        setClientResponse(2);
    }

    const handleSubmit = () => {
        // setRoundStarted(false);
        setIsScoreDisplayed(false);
        setGameStarted(false);
        socket.emit('option-picked', name, clientResponse, socket.id, roundNumber);
    }

    const handleCheckScores = () => {
        socket.emit('check-scores');
        socket.on('get-scores', (scores) => {
            console.log(scores);
            // totalScores = scores.map((d) => <li key={d.name}>{d.name}  -  {d.score}</li>)
            // scores.map((s) => console.log(s.name));
            setTotalScores(scores);
        })
        setIsScoreDisplayed(true);
    }

    useEffect(() => {
        if(roundNumber > 8) {
            // console.log(totalScores);
            socket.emit('check-scores');
            socket.on('get-scores', (scores) => {
                history.push({ pathname: "/winner", state: { totalScores: scores } });
            })
        }
    }, [roundNumber])

    if(socket) {
        socket.on('score-returned', (s) => {
            console.log('Score obtained')
            // console.log(s);
            setScore(score + s);
            // console.log(score);
            setRoundNumber(roundNumber+1);
            setGameStarted(true);
            setClientResponse(null);
        })
    }

    return (
        <div>
            {!gameStarted ?
            <div className={classes.loading}>
                <h2 style={{ marginTop: 0 }}>Waiting for other players...</h2>
                <PacmanLoader size='40'></PacmanLoader>
            </div>
            :
            <div className={classes.mainDiv}>
                <div className={classes.divWrapper}>
                    <Card className={classes.card}>
                        <h1 style={{marginTop: 0}}>Round: {roundNumber}</h1>
                        <h3>Select the number of fishes you want to catch: </h3>
                        <div className={classes.buttonDiv}>
                            <Button onClick={handleClick1} className={classes.buttonClass} variant="contained" style={{ backgroundColor: "#f0db99"}}>1 fish</Button>
                            <Button onClick={handleClick2} className={classes.buttonClass} variant="contained" style={{ backgroundColor: "#f0db99" }}>2 fishes</Button>
                        </div>
                        <div className={classes.buttonDiv}>
                        {clientResponse ? 
                        <Button onClick={handleSubmit} className={classes.buttonClass} variant="contained" color="primary">Submit</Button> : <Button disabled className={classes.buttonClass} variant="contained"> Submit </Button>}
                        <Button onClick={handleCheckScores} className={classes.buttonClass} variant="contained" color="primary">Check scores</Button>
                        </div>
                        {isScoreDisplayed && totalScores? 
                            <ol className={classes.list}>
                                {totalScores.map((d) => (<li className={classes.listElement}>{d.name} : {d.score}</li>))}
                            </ol>
                        : null}
                    </Card>
                </div>
                <div>
                    <div className={classes.chat__container}>
                        <div className={classes.chat__header}>
                            <h3 className={classes.chat__headertext}>Chat</h3>
                        </div>
                        <div className={classes.message_container}>
                            <div id="messages" style={{ display: 'flex', flexDirection: 'column' }}>
                            </div>
                        </div>
                        <form onSubmit={(e) => sendMessage(e)} className={classes.form}>
                            <input
                                type="text"
                                placeholder="Enter Message"
                                className={classes.input}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Game;