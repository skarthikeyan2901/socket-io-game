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
    card: {
        width: '41%',
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divWrapper: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(15),
        textAlign: 'center'
    },
    buttonClass: {
        margin: '20px',
        width: '170px',
        height: '60px',
        fontSize: '16px',
    },
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
            alert('Successful connection established at ' + i);
        })
    }, [socket, inviteCode, name]);

    if(socket) {
        socket.on('start-game', () => {
            setGameStarted(true);
        })
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
        socket.emit('option-picked', name, clientResponse, socket.id);
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
            console.log(totalScores);
            socket.emit('check-scores');
            socket.on('get-scores', (scores) => {
                history.push({ pathname: "/winner", state: { totalScores: scores } });
            })
        }
    }, [roundNumber])

    if(socket) {
        socket.on('score-returned', (s) => {
            console.log('Score obtained')
            console.log(s);
            setScore(score + s);
            console.log(score);
            setRoundNumber(roundNumber+1);
            setGameStarted(true);
            setClientResponse(null);
        })
    }

    return (
        <div>
            {!gameStarted ?
            <div className={classes.loading}>
                <h2 style={{ marginTop: 0}}>Waiting for other players...</h2>
                <PacmanLoader size='40'></PacmanLoader>
            </div>
            :
            <div className={classes.divWrapper}>
                <Card className={classes.card}>
                    <h1 style={{marginTop: 0}}>Round: {roundNumber}</h1>
                    <h3>Select the number of fishes you want to catch: </h3>
                    <Button onClick={handleClick1} className={classes.buttonClass} variant="contained" style={{ backgroundColor: "#f0db99"}}>1 fish</Button>
                    <Button onClick={handleClick2} className={classes.buttonClass} variant="contained" style={{ backgroundColor: "#f0db99" }}>2 fishes</Button>
                    {clientResponse ? 
                    <Button onClick={handleSubmit} className={classes.buttonClass} variant="contained" color="primary">Submit</Button> : <Button disabled className={classes.buttonClass} variant="contained"> Submit </Button>}
                    <Button onClick={handleCheckScores} className={classes.buttonClass} variant="contained" color="primary">Check scores</Button>
                    {isScoreDisplayed && totalScores? 
                        <ol>
                            {totalScores.map((d) => (<li>{d.name} - {d.score}</li>))}
                        </ol>
                    : null}
                </Card>
            </div>}
        </div>
    )
}

export default Game;