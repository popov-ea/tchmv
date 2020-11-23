import { Button, Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyle = makeStyles((theme) => ({
    btn: {
        margin: theme.spacing(1)
    }
}))

export default function (props) {
    const url = props.url;
    const [state, setState] = useState({
        imagePath: props.imagePath
    });
    const classes = useStyle();

    return (<Grid container alignItems="center" justify="center" direction="column">
        <img src={state.imagePath ? url + "/" + state.imagePath : url} width={400}></img>
        <div>
            <Button className={classes.btn} variant="outlined">Добавить</Button>
            <Button className={classes.btn} variant="outlined">Удалить</Button>
        </div>

    </Grid>)
}