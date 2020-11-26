import { Button, Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyle = makeStyles((theme) => ({
    btn: {
        margin: theme.spacing(1)
    },
    btnContainer: {
        margin: theme.spacing(1)
    }
}))

export default function ImageUploader(props) {
    const url = props.url, imagePath = props.imagePath;
    const [src, setSrc] = useState(imagePath ? url + "/" + imagePath : url);
    const classes = useStyle();

    const handleAddClick = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = (e) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
                setSrc(URL.createObjectURL(file));
            }
            if (props.fileChange) {
                props.fileChange(file);
            }
            if (props.uploadImmediately && props.uploadUrl) {
                fetch(props.uploadUrl, {
                    method: "POST",
                    headers: {
                        "Content-type": "multipart/form-data"
                    },
                    body: file
                });
            }
        };
        input.click();
    };

    const handleDeleteClick = () => {
        setSrc(imagePath ? url + "/" + imagePath : url);
        if (props.deleteImmediately && props.deleteUrl) {
            fetch(props.deleteUrl, {
                method: "GET"
            });
        }
    };

    return (<Grid container alignItems="center" justify="center" direction="column">
        <img src={src} width={400}></img>
        <div className={classes.btnContainer}>
            <Button className={classes.btn} variant="outlined" onClick={handleAddClick}>Добавить</Button>
            <Button className={classes.btn} variant="outlined" onClick={handleDeleteClick}>Удалить</Button>
        </div>

    </Grid>)
}