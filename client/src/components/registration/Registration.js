import { TextField, makeStyles, Grid, Button, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from "@material-ui/core";
import ImageUploader from "../image/ImageUploader";
import { useState } from "react";
import Alert from "../dialog/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "50ch"
        },
        "& img": {
            margin: theme.spacing(2)
        }
    },
    btn: {
        margin: theme.spacing(1),
    }
}))

export default function Registration() {
    const classes = useStyles();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [alertOpened, setAlertOpened] = useState(false);
    const [photo, setPhoto] = useState(null); 
    const validate = () => firstName && lastName && email && password && password === repeatPassword;
    const sendForm = (event) => {
        if (validate()) {
            fetch("/api/users/new", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName: firstName, lastName: lastName, country: country, email: email, password: password, repeatPassword: repeatPassword })
            }).then((response) => response.json()).then((result) => {
                const userId = result.user.id;
                
            });
        } else {
            setAlertOpened(true);
        }
    };
    return (
        <div>
            <Grid container alignItems="center" justify="center" style={{ minHeight: "100vh", minWidth: "100vh" }} direction="row">
                <Grid item xs>
                    <ImageUploader url="/api/images" imagePath="1" fileChange={(f) => setPhoto(f)}></ImageUploader>
                </Grid>

                <Grid item xs>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField id="firstName"
                                required
                                variant="outlined"
                                label="First Name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                InputLabelProps={{ shrink: true }}></TextField>
                        </div>
                        <div>
                            <TextField id="lastName"
                                required
                                variant="outlined"
                                label="Last Name"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                InputLabelProps={{ shrink: true }}></TextField>
                        </div>
                        <div>
                            <TextField id="country"
                                variant="outlined"
                                label="Country"
                                value={country}
                                onChange={(event) => setCountry(event.target.value)}
                                InputLabelProps={{ shrink: true }}></TextField>
                        </div>
                        <div>
                            <TextField id="email"
                                required
                                variant="outlined"
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                InputLabelProps={{ shrink: true }}></TextField>
                        </div>
                        <div>
                            <TextField required
                                id="password"
                                variant="outlined"
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                InputLabelProps={{ shrink: true }}></TextField>
                        </div>
                        <div>
                            <TextField required
                                id="repeatPassword"
                                variant="outlined"
                                type="password"
                                label="Repeat password"
                                value={repeatPassword}
                                onChange={(event) => setRepeatPassword(event.target.value)}
                                InputLabelProps={{ shrink: true }}></TextField>
                        </div>
                        <Grid container alignItems="flex-end">
                            <Button className={classes.btn} onClick={sendForm} variant="outlined" >Add user</Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            <Dialog open={alertOpened}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle>Invalid input!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please, check form
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAlertOpened(false)}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}