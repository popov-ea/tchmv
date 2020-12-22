import { useState } from "react";
import authService from "../../services/authService";
import authHeader from "../../services/authHeader";
import { Grid, makeStyles, TextField, Button, LinearProgress, Card, CardContent, CardHeader, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "57ch"
        }
    },
    btn: {
        margin: theme.spacing(1)
    },
    loading: {
        margin: theme.spacing(1)
    },
    card: {
        maxWidth: 530
    },
    loading: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [alertOpened, setAlertOpened] = useState(false);
    const classes = useStyle();

    const validate = () => oldPassword && newPassword && passwordConfirmation;
    const passwordConfirmed = () => newPassword === passwordConfirmation;

    const sendForm = () => {
        if (!validate()) {
            setErrorText("Please fill required fields");
            setAlertOpened(true);
            return;
        }
        if (!passwordConfirmed()) {
            setErrorText("Please confirm password");
            setAlertOpened(true);
            return;
        }

        setLoading(true);

        fetch("/api/users/change-password/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                ...authHeader()
            },
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword,
                passwordConfirmation: passwordConfirmation
            })
        }).then((response) => {
            setLoading(false);
            if (!response.ok) {
                setErrorText("Password update failed");
                setAlertOpened(true);
            }
        });
    };

    return (
        <Grid container alignItems="center" justify="center" style={{ minWidth: "100vh", minHeight: "100vh" }} direction="column" className={classes.root}>
            <Card variant="outlined" className={classes.card}>
                <CardHeader title="Change Password"></CardHeader>
                <CardContent>
                    <div>
                        <TextField required
                            variant="outlined"
                            type="password"
                            label="Old password"
                            onChange={(event) => setOldPassword(event.target.value)}
                            InputLabelProps={{ shrink: true }}
                        ></TextField>
                    </div>
                    <div>
                        <TextField required
                            variant="outlined"
                            type="password"
                            label="New password"
                            onChange={(event) => setNewPassword(event.target.value)}
                            InputLabelProps={{ shrink: true }}
                        ></TextField>
                    </div>
                    <div>
                        <TextField required
                            variant="outlined"
                            type="password"
                            label="Password confirmation"
                            onChange={(event) => setPasswordConfirmation(event.target.value)}
                            InputLabelProps={{ shrink: true }}
                        ></TextField>
                    </div>
                    <Button className={classes.btn} variant="outlined" onClick={sendForm}>
                        Change password
                    </Button>
                    {loading && <LinearProgress className={classes.loading}></LinearProgress>}
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
        </Grid>
    )
} 