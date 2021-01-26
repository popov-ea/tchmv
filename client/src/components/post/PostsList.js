import { useState } from "react";
import { Tooltip, LinearProgress, Card, Typography, CardHeader, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, makeStyles, CardContent, CardActions, IconButton, CardActionArea, CardMedia, Divider } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Close, MailOutlineOutlined, Search, Pets, LocationOn } from "@material-ui/icons";
import { Carousel } from "react-responsive-carousel";

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(1),
        width: 500,
        alignItems: "center",
        "& img": {
            margin: theme.spacing(2),
            margin: "auto",
            alignSelf: "center"
        }
    },
    actionButton: {
        marginLeft: "auto"
    },
    carousel: {
        maxWidth: "100vh",
        margin: "auto",
        alignItems: "center"
    },
    cardmedia: {
        height: 400
    }
}));

export default function PostsList(props) {
    const classes = useStyles();
    const pageSize = props.pageSize || 10;
    const [start, setStart] = useState(props.start || 0);
    const [end, setEnd] = useState(props.end || (start + pageSize));
    const type = ["all", "lost", "found"].find(x => x === props.type) || "all";
    const withClosed = props.withClosed || false;
    const [pageNum, setPageNum] = useState(0);
    const [posts, setPosts] = useState(null);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [pagesCount, setPageCount] = useState(null);
    const [loadingPagesCount, setLoadingPagesCount] = useState(false);
    const [alertOpened, setAlertOpened] = useState(false);
    const [errorText, setErrorText] = useState("error((");

    const params = `type=${type}&withClosed=${withClosed}&start=${start}&end=${end}`;

    if (pagesCount === null && !loadingPagesCount) {
        setLoadingPagesCount(true);
        fetch(`api/posts/count?${params}`)
            .then((response) => {
                setLoadingPagesCount(false);
                return response.json();
            })
            .then((result) => {
                return setPageCount(Math.trunc(result / pageSize));
            })
            .catch(() => {
                return setLoadingPagesCount(false);
            });
    }

    if (!posts && !loadingPosts) {
        setLoadingPosts(true);
        fetch(`api/posts?${params}`)
            .then((response) => {
                setLoadingPosts(false);
                return response.json();
            })
            .then((result) => {
                return setPosts(result);
            })
            .catch(() => {
                return setLoadingPosts(false);
            });
    }

    return (
        <Grid container alignItems="center" justify="center" style={{ minHeight: "100vh", minWidth: "100vh" }} direction="column">
            <Grid container alignItems="center" justify="center" direction="row">
                {
                    (posts || []).map((post) => (
                        <Card className={classes.card} raised={true} >
                            <CardHeader avatar={post.type == "found"
                                ? <Tooltip title="Lost pet"><Pets color="#4D8000"></Pets></Tooltip>
                                : <Tooltip title="Found pet"><Search color="#932812"></Search></Tooltip>}
                                title={post.name} color="primary" style={{ color: post.type === "found" ? "#4D8000" : "#932812" }}></CardHeader>

                            {
                                post.images[0] && post.images[0].id && (<CardMedia className={classes.cardmedia}
                                    src={"/api/images/" + post.images[0].id} image={"/api/images/" + post.images[0].id}></CardMedia>)
                            }


                            <CardContent >
                                {/* <div style={{ height: 400, width: "100%" }}>
                                <Carousel
                                    width={800}>
                                    {
                                        (post.images || []).map(i => (<img
                                            src={`/api/images/${i.id}`}></img>))
                                    }
                                </Carousel>
                            </div> */}
                                <Typography>{`${post.species ? post.species.name : ""} ${post.breed ? post.bree.name : ""}`}</Typography>
                                <Typography style={{ verticalAlign: "center" }}>
                                    {`${post.city.name} ${post.district.name}`}
                                </Typography>
                                <Typography style={{marginTop: 10}}>
                                    {post.description}
                                </Typography>

                            </CardContent>
                            <CardActionArea>
                                <CardActions style={{ float: "inline-end", alignItems: "end" }}>
                                    <IconButton color="primary" className={classes.actionButton}>
                                        <MailOutlineOutlined></MailOutlineOutlined>
                                    </IconButton>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    ))
                }

            </Grid>

            {loadingPosts || loadingPagesCount ? <LinearProgress style={{ minWidth: "100vh" }}></LinearProgress>
                : null}
            <Pagination page={pageNum + 1} count={pagesCount + 1} size="medium" onChange={(obj, num) => {
                setPageNum(num);
                setStart(num * pageSize);
                setEnd(num * pageSize + pageSize);
                setPosts(null);
            }}></Pagination>
            <Dialog open={alertOpened}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle>Something went wrong...</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errorText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAlertOpened(false)}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )


}