import { useState } from "react";
import { Card, CardHeader, CardContent, Grid, Link, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    card: {
        width: 300,
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(3)
    },
    linkContainer: {
        marginBottom: theme.spacing(2)
    }
}));

export default function Home() {
    const classes = useStyle();
    return (
        <Grid container alignItems="center" justify="center" style={{ minWidth: "100vh", minHeight: "100vh" }} direction="row">
            <Card className={classes.card} variant="outlined">
                <CardHeader title="Users"></CardHeader>
                <CardContent>
                    <div className={classes.linkContainer}>
                        <Link href="#">
                            Browse
                        </Link>
                    </div>
                    <div className={classes.linkContainer}>
                        <Link href="/registration">
                            Create
                        </Link>
                    </div>
                    <div className={classes.linkContainer}>
                        <Link href="#">
                            Assign
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <Card className={classes.card} variant="outlined">
                <CardHeader title="Events"></CardHeader>
                <CardContent>
                    <div className={classes.linkContainer}>
                        <Link href="#">
                            Browse
                        </Link>
                    </div>
                    <div className={classes.linkContainer}>
                        <Link href="#">
                            Create
                        </Link>
                    </div>
                    <div className={classes.linkContainer}>
                        <Link href="#">
                            Assign
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <Card className={classes.card} variant="outlined">
                <CardHeader title="Documents"></CardHeader>
                <CardContent>
                    <div className={classes.linkContainer}>
                        <Link href="#">
                            Browse
                        </Link>
                    </div>
                    <div className={classes.linkContainer}>
                        <Link href="#">
                            Create
                        </Link>
                    </div>
                    <div className={classes.linkContainer}>
                        <Link>
                            Assign
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
};