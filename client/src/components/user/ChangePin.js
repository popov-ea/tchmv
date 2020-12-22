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

export default function ChangePin() {
    const classes = useStyle();
    const [pin, setPin] = useState("");
    const [errorText, setErrorText] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertOpened, setAlertOpened] = useState(false);

    const validate = () => pin != null && pin !== "" && !isNaN(pin);

    const sendForm = () => {
        if (!validate()) {
            setErrorText("Invalid PIN");
            return;
        }
        fetch("/api/users/pin", {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                ...authHeader()
            },
            body: JSON.stringify({ pin: pin })
        }).then((response) => {
            setLoading(false);
            if (!response.ok) {
                setErrorText("PIN update failed");
                setAlertOpened(true);
            }
        })
    }

    return (
        <Grid container alignItems="center" justify="center" style={{ minWidth: "100vh", minHeight: "100vh" }} direction="column" className={classes.root}>
            <Card variant="outlined" className={classes.card}>
                <CardHeader title="Change PIN"></CardHeader>
                <CardContent>
                    <div>
                        <TextField required
                            variant="outlined"
                            label="PIN"
                            onChange={(event) => setPin(event.target.value)}
                            InputLabelProps={{ shrink: true }}
                        ></TextField>
                    </div>
                    <Button className={classes.btn} variant="outlined" onClick={sendForm}>
                        Change PIN
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
    );
}