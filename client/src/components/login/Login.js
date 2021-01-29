import { Grid, TextField, Button, makeStyles, Card, CardHeader, CardContent, Dialog, DialogTitle, DialogContentText, DialogContent, CardActions, DialogActions, CircularProgress, LinearProgress } from "@material-ui/core";
import authService from "../../services/authService";
import { Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import routes from "../../services/routes";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "50ch"
        }
    },
    btn: {
        margin: theme.spacing(1),
    },
    spinner: {
        float: "right",
        width: 15,
        margin: theme.spacing(2)
    }
}));

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertOpened, setAlertOpened] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(authService.isAuthenticated());

    const valildate = () => email && password;
    const sendForm = () => {
        if (valildate()) {
            setLoading(true);
            authService.login(email, password)
                .then(() => {
                    setLoading(false);
                    history.push(routes.home)
                })
                .catch((message) => {
                    setLoading(false);
                    setErrorText(message);
                    setAlertOpened(true);
                });
        } else {
            setErrorText("Invalid form");
            setAlertOpened(true);
        }
    }

    return authenticated ?
        (<Redirect to="/"></Redirect>)
        : (<Grid className={classes.root} container alignItems="center" justify="center" style={{ minHeight: "100vh", minWidth: "100vh" }} direction="column">
            <Card variant="outlined">
                <CardHeader title="Sign in" >

                </CardHeader>
                <CardContent>
                    <div>
                        <TextField variant="outlined" label="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} InputLabelProps={{ shrink: true }}></TextField>
                    </div>
                    <div>
                        <TextField variant="outlined" label="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} InputLabelProps={{ shrink: true }}></TextField>
                    </div>
                    <div>
                        <Button className={classes.btn} onClick={sendForm} variant="outlined">Sing in</Button>
                        {loading && <CircularProgress size={25} className={classes.spinner}></CircularProgress>}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={alertOpened}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle>Something went wrong...</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errorText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAlertOpened(false)}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>)
}