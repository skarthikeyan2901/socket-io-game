import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    buttonClass: {
        margin: '20px',
        width: '170px',
        height: '60px',
        fontSize: '16px',
    },
    divWrapper: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(16)
    },
    card: {
        width: '40%',
        backgroundColor: 'lightblue',
        // height: '300px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        display: 'flex',
        margin: '10px',
        marginTop: '40px',
        color: 'white',
        // width: '50%',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    buttonDiv: {    
        marginTop: '45px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        "&::placeholder": {
            fontWeight: 'bold'
        },
        height: '30px',
        fontSize: '20px'
    }
}));

function Join() {

    const classes = useStyles();
    const history = useHistory();
    const [tempInvite, setTempInvite] = useState('');
    const [name, setName] = useState('');

    const handleInviteChange = (e) => {
        setTempInvite(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = () => {
        history.push({ pathname: "/game", state: { name: name, inviteCode: tempInvite }});
    }

    return (
        <div className={classes.divWrapper}>
            <Card className={classes.card}>
                <div>
                    <FormControl className={classes.form}>
                        <TextField InputProps={{ classes: { input: classes['input'] } }} placeholder="Enter your name" value={name} onChange={handleNameChange} size="medium"></TextField>
                    </FormControl>
                    <FormControl className={classes.form}>
                        <TextField InputProps={{ classes: { input: classes['input'] } }} placeholder="Enter the invite code" value={tempInvite} onChange={handleInviteChange}></TextField>
                    </FormControl>
                </div>
                <div className={classes.buttonDiv}>
                    <Button className={classes.buttonClass} color="primary" type="submit" onClick={handleSubmit} variant="contained">Join game</Button>
                    <Link to="/" style={{ textDecoration: 'none' }}><Button variant="contained" color="primary" className={classes.buttonClass}>Go back home</Button></Link>
                </div>
            </Card>
        </div>
    )
}

export default Join;