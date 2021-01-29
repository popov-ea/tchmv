import { Typography, Card } from "@material-ui/core";

export default function Message(props) {
    const text = props.text || " ";
    const align = props.align;
    const width = props.width;
    const userId = props.userId
    return (
        <div style={{ width: width }}>
            <Card elevation={4} style={{
                margin: 10,
                padding: 10,
                width: 200,
                float: align === "left" ? "left" : "right",
                textAlign: "left",
                backgroundColor: "#d0f0c0",
                borderRadius: 5
                }}
            >
                {text}
            </Card>
        </div >
    )
}