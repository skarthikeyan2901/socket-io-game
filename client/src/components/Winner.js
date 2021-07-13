import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Confetti from 'react-confetti';

const useStyles = makeStyles((theme) => ({
    buttonClass: {
        margin: '20px',
        width: '170px',
        height: '60px',
        fontSize: '16px',
    },
    card: {
        width: '40%',
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divWrapper: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(25)
    },
}));

function Winner() {

    const classes = useStyles();
    const location = useLocation();
    const totalScores = location.state.totalScores;
    let maxValue = -1000;
    // console.log(totalScores);
    // const scores = Object.entries(totalScores)

    if (totalScores) {
        for (let i = 0; i < 4; i++) {
            console.log('hello')
            if (maxValue < totalScores[i]?.score) {
                maxValue = totalScores[i]?.score;
                // winner = totalScores[i]?.name;
            }
        }
    }

    const winner = totalScores.filter((e) => {
        return e.score === maxValue;
    })
    console.log(winner)

    const winnerRender = winner.map((e) => {
        return <span style={{color: 'blue'}}>{e.name} </span>
    })
    console.log(winnerRender)

    return (
        <div className={classes.divWrapper}>
            <Confetti
                width={1500}
                height={700}
            />
            <Card className={classes.card}>
            <h2 style={{marginLeft: '20px'}}>The winner(s) is/are: {winnerRender} with a score of {maxValue}</h2>
            <Link to='/' style={{textDecoration: 'none'}}><Button className={classes.buttonClass} variant="contained" color="primary">Go Back Home</Button></Link>
            </Card>
        </div>
    )
}

export default Winner;