import { Button, Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import authHeader from "../../services/authHeader";

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
                const formData = new FormData();
                formData.append("file", file);
                fetch(props.uploadUrl, {
                    method: "POST",
                    headers: authHeader(),
                    body: formData
                });
            }
        };
        input.click();
    };

    const handleDeleteClick = () => {
        if (props.deleteImmediately && props.deleteUrl) {
            setSrc(imagePath ? url + "/" + imagePath : url);
            fetch(props.deleteUrl, {
                method: "DELETE",
                headers: authHeader()
            })
        } else {
            setSrc(imagePath ? url + "/" + imagePath : url);
        }
    };

    return (<Grid container alignItems="center" justify="center" direction="column">
        <img src={src} width={400}></img>
        <div className={classes.btnContainer}>
            <Button className={classes.btn} variant="outlined" onClick={handleAddClick}>Upload</Button>
            <Button className={classes.btn} variant="outlined" onClick={handleDeleteClick}>Delete</Button>
        </div>

    </Grid>)
}