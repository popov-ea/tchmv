import { Grid, Card, CardHeader, CardContent, Typography, makeStyles, LinearProgress } from "@material-ui/core";
import { useState } from "react";
import authHeader from "../../services/authHeader";
import authService from "../../services/authService";
import ImageUploader from "../image/ImageUploader";

const useStyle = makeStyles((theme) => ({
    gridCol: {
        margin: theme.spacing(4)
    },
    card: {
        margin: theme.spacing(1)
    },
    loading: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));

export default function Profile(props) {
    const userId = props.userId || authService.getUser().id;
    const classes = useStyle();
    const imgUrl = "api/images/for-user/";
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [about, setAbout] = useState("");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(true);

    fetch("/api/users/info/" + userId, {
        headers: authHeader()
    }).then((response) => response.json())
    .then((result) => {
        if (result) {
            setEmail(result.email);
            setFirstName(result.firstName);
            setLastName(result.lastName);
            setCountry(result.country);
            setAbout(result.about);
            setPin(result.pin);
            setLoading(false);
        }
    });

    return (
        <Grid container justify="center" alignItems="center" style={{ minWidth: "100vh", minHeight: "100vh" }} direction="row">
            <Grid item className={classes.gridCol}>
                <ImageUploader deleteImmediately uploadImmediately imagePath={userId} deleteUrl={imgUrl + userId} uploadUrl={imgUrl + userId} url={imgUrl}></ImageUploader>
            </Grid>
            <Grid style={{ maxWidth: 500 }} item container direction="column" className={classes.gridCol}>
                <Card variant="outlined" className={classes.card}>
                    <CardHeader title="Login information"></CardHeader>
                    <CardContent>
                        <Typography>{`Email: ${email || ""}`}</Typography>
                        <Typography>{"Password: *******"}</Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" className={classes.card}>
                    <CardHeader title="Profile information"></CardHeader>
                    <CardContent>
                        <Typography>{`First Name: ${firstName || ""}`}</Typography>
                        <Typography>{`Last Name: ${lastName || ""}`}</Typography>
                        <Typography>{`Country: ${country || ""}`}</Typography>
                        <Typography>{`About: ${about || ""}`}</Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" className={classes.card}>
                    <CardHeader title="Personal identification number"></CardHeader>
                    <CardContent>
                        <Typography>{`PIN: ${pin || ""}`}</Typography>
                    </CardContent>
                </Card>
                {loading && <LinearProgress className={classes.loading}></LinearProgress>}
            </Grid>
        </Grid>
    );
}