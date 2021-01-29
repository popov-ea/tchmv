import { Redirect, useHistory } from "react-router-dom";
import routes from "../../services/routes";
import { useState } from "react";
import authHeader from "../../services/authHeader";

export default function InitDialog(props) {
    const history = useHistory();
    const [dialogId, setDialogId] = useState(null);
    if (!dialogId) {
        fetch("api/dialogs/init/" + props.location.state.type + "/" + props.location.state.postId, {
            method: "GET",
            headers: authHeader()
        })
            .then((response) => response.json())
            .then((dialog) => {
                if (!dialog.id) {
                    return;
                }
                setDialogId(dialog.id);
               
            });
    } else {
        history.push("/dialog", { dialogId: dialogId });
    }


    return null;
}