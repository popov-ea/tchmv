import { useState } from "react";
import authHeader from "../../services/authHeader";
import Message from "./message";
import authService from "../../services/authService";
import authHeaders from "../../services/authHeader";
import { Grid, IconButton, TextField, Typography } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { io } from "socket.io-client";

const socket = io();
socket.on("connect", (socket) => {
    console.log(socket.id + " connected");
});

const getDialog = (dialogId) => fetch("api/dialogs/" + dialogId, {
    headers: authHeader()
});
export default function Chat(props) {
    const [dialog, setDialog] = useState(null);
    const [txt, setTxt] = useState("");
    const [messages, setMessages] = useState([]);
    const dialogId = props.location.state.dialogId;
    if (!dialogId) {
        return null;
    }

    if (!dialog) {
        getDialog(dialogId)
            .then((response) => response.json())
            .then((dialog) => {
                if (!dialog) {
                    return;
                }
                setDialog(dialog);
                setMessages(dialog.Messages);
            });

    }

    const sendMessage = (txt) => {
        fetch("api/dialogs/messages/" + dialogId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...authHeaders()
            },
            body: JSON.stringify({
                message: txt
            })
        }).then((response) => response.json())
            .then((msgs) => {
                if (!msgs) {
                    return;
                }
                setMessages(msgs);
            });
    };

    return dialog ? (
        <Grid container alignItems="center" justify="center" style={{ minHeight: "100vh", minWidth: "100vh" }} direction="column">
            <Grid container direction="row" alignItems="center" justify="flex-start" style={{ width: 600, borderBottom: "1px #bbb solid", paddingBottom: 4 }}>
                <img
                    style={{
                        width: 50,
                        height: 50,
                        marginRight: 20
                    }}
                    src={"api/images/for-user/" + ([(dialog.postFound && dialog.PostFound.userId), dialog.initiatorId, (dialog.PostLost && dialog.PostLost.userId)].find(id => id && id !== authService.getUser().id) || authService.getUser().id)}></img>
                <Typography>
                    Re:
                    {
                        dialog.PostFound ? dialog.PostFound.name :
                            (dialog.PostLost ? dialog.PostLost.name : "no theme")
                    }
                </Typography>
            </Grid>
            <Grid container direction="column" justify="flex-end" alignItems="center" style={{ height: 700, verticalAlign: "end" }}>
                {
                    messages && messages.length ? messages.filter(m => m.text).map((m) => <Grid item><Message width={600} text={m.text} align={m.fromUserId === authService.getUser().id ? "right" : "left"}></Message></Grid>)
                        : <h4 style={{ marginRight: 20 }}>No messages</h4>
                }
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: 20 }}>
                <div>
                    <TextField value={txt} onChange={(event) => setTxt(event.target.value)} id="standard-basic" variant="filled" style={{ width: 500 }} />
                    <IconButton onClick={(event) => txt && sendMessage(txt)}>
                        <Send style={{ width: 40, margin: 5 }} ></Send>
                    </IconButton>
                </div>
            </Grid>
        </Grid>
    ) : null;
}