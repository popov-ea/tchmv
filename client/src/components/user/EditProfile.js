import { makeStyles, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, CircularProgress } from "@material-ui/core";
import { useState } from "react";
import ImageUploader from "../image/ImageUploader";
import authService from "../../services/authService";
import authHeader from "../../services/authHeader";

const useStyle = makeStyles((theme) => ({
    gridCol: {
        margin: theme.spacing(4)
    },
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "57ch"
        }
    },
    loading: {
        float: "right",
        margin: theme.spacing(1)
    },
    btn: {
        margin: theme.spacing(1)
    }
}));

export default function EditProfile(props) {
    const imgUrl = "api/images/for-user";
    const userId = props.userId || authService.getUser().id;
    const classes = useStyle();
    const [fetched, setFetched] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [about, setAbout] = useState("");
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(fetched);

    const [alertOpened, setAlertOpened] = useState(false);
    const [errorText, setErrorText] = useState("");

    if (!fetched) {
        fetch("/api/users/info/" + userId, {
            headers: authHeader()
        }).then((response) => response.json())
            .then((result) => {
                if (result) {
                    setFirstName(result.firstName);
                    setLastName(result.lastName);
                    setCountry(result.country);
                    setAbout(result.about);
                }
                setFetched(true);
            })
            .catch(() => {
                setErrorText("Can't get user information");
                setAlertOpened(true);
                setFetched(true)
            });
    }


    const validate = () => firstName && lastName;

    const sendForm = () => {
        if (!validate()) {
            setErrorText("Ivalid form");
            setAlertOpened(true);
        }
        fetch("/api/users/info/" + userId, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                ...authHeader()
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                country: country,
                about: about
            })
        }).then(() => {
            if (photo) {
                const formData = new FormData();
                formData.set("file", photo);
                return fetch("/api/images/for-user/" + userId, {
                    method: "POST",
                    headers: authHeader(),
                    body: formData
                });
            }
            return Promise.resolve();
        }).catch(() => {
            setErrorText("Can't save user information");
            setAlertOpened(true);
        });
    }

    return (<Grid container justify="center" alignItems="center" style={{ minWidth: "100vh", minHeight: "100vh" }} direction="row" className={classes.root}>
        <Grid item className={classes.gridCol}>
            <ImageUploader imagePath={userId} url={imgUrl} fileChange={(f) => setPhoto(f)}></ImageUploader>
        </Grid>
        <Grid style={{ maxWidth: 500 }} item container direction="column" className={classes.gridCol}>
            <div>
                <TextField required
                    variant="outlined"
                    label="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}></TextField>
            </div>
            <div>
                <TextField required
                    variant="outlined"
                    label="Last name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}></TextField>
            </div>
            <div>
                <TextField
                    variant="outlined"
                    label="Country"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}></TextField>
            </div>
            <div>
                <TextField
                    variant="outlined"
                    label="About"
                    multiline
                    value={about}
                    onChange={(event) => setAbout(event.target.value)}></TextField>
            </div>
            <div>
                <Button onClick={sendForm} variant="outlined" className={classes.btn}>
                    Save
                </Button>
                {loading && <CircularProgress size={25} className={classes.loading}></CircularProgress>}
            </div>
        </Grid>

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
    </Grid>);
}