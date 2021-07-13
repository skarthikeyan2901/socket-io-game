import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    buttonClass: {
        margin: '50px',
        width: '200px',
        height: '80px',
        fontSize: '17px'
    },
    welcome: {
        textAlign: 'center',
        margin: 0,
        fontSize: '70px',
        paddingTop: '70px',
    },
    chooseText: {
        textAlign: 'center',
        fontSize: '40px',
        margin: 0
    },
    image: {
        maxHeight: '40%',
        alignSelf: 'center'
    },
    divWrapper: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(11)
    },
    card: {
        width: '50%',
        backgroundColor: 'lightblue'
    }
}));

function Home() {

    const [id, setId] = useState();
    const classes = useStyles();

    const generateNumber = () => {
        let n = Math.floor(Math.random() * 90000) + 10000;
        setId(n);
    }

    return (
        <div className={classes.divWrapper}>
            <Card className={classes.card}>
                <h1 className={classes.welcome}>Welcome!</h1><br/>
                <h2 className={classes.chooseText}>Choose mode to enter the game</h2>
                <div style={{textAlign: "center"}}>
                    <Button className={classes.buttonClass} variant="contained" color="primary" onClick={generateNumber}>Start New Game</Button>
                    <Link to="/join" style={{textDecoration: 'none'}}><Button className={classes.buttonClass} variant="contained" color="primary">Join Game</Button></Link>
                </div>
                <div>
                    {id ? <h2 style={{ textAlign: "center" }}>Invite code: {id}</h2> : <div />}
                </div>
            </Card>
        </div>
    )
}

export default Home;