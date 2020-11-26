import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, DialogContent } from "@material-ui/core";
import { useState } from "react";

export default function Alert(props) {
    const [opened, setOpened] = useState(props.opened);
    const title = props.title ?? "Внимание!";
    const text = props.text ?? "Ошибка";

    const handleClose = () => {
        setOpened(false);
    }

    return (<Dialog open={opened}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {text}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>
                Ok
            </Button>
        </DialogActions>
    </Dialog>)
}