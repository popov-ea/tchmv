import { Paper, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import routes from "../../services/routes";

export default function InitPost() {
    const [redirectType, setRedirectType] = useState(null);
    switch (redirectType) {
        case "lost":
            return <Redirect to={routes.newLost}></Redirect>
        case "found":
            return <Redirect to={routes.newFound}></Redirect>
        default:
            return <div>
                <Grid container alignItems="center" justify="center" style={{ minHeight: "100vh", minWidth: "100vh" }} direction="row">
                    <Paper
                        style={{
                            backgroundColor: "#fff",
                            borderColor: "#003399",
                            borderWidth: 2,
                            width: 300,
                            height: 200,
                            margin: 30,
                        }}
                        elevation={5}
                        onClick={() => setRedirectType("lost")}
                    >
                        <Typography style={{ color: "#800500", fontSize: 35, marginTop: 75, marginLeft: 100, cursor: "pointer" }}>Lost</Typography>
                    </Paper>
                    <Paper
                        style={{
                            backgroundColor: "#fff",
                            borderColor: "#003399",
                            borderWidth: 2,
                            width: 300,
                            height: 200,
                            margin: 30,
                        }}
                        elevation={5}
                        onClick={() => setRedirectType("found")}
                    >
                        <Typography style={{ color: "#003399", fontSize: 35, marginTop: 75, marginLeft: 100, cursor: "pointer" }}>Found</Typography>
                    </Paper>
                </Grid>
            </div >
    }
}