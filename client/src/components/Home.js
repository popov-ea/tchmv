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
        </Grid>
    );
};