import { TextField, makeStyles, Grid, Button, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Select, MenuItem, LinearProgress, FormControl, InputLabel } from "@material-ui/core";
import { useState } from "react";
import ImageUploader from "react-images-upload";
import Alert from "../dialog/Alert";
import authHeader from "../../services/authHeader";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "50ch"
        },
        "& img": {
            margin: theme.spacing(2)
        }
    },
    btn: {
        margin: theme.spacing(1),
    },
    gridCol: {
        margin: theme.spacing(4)
    },
    select: {
        margin: theme.spacing(1),
        width: "48.5ch",
        height: 50
    },
    loading: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    selectLabel: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    uploadBtn: {
        backgroundColor: "#FFF",
        color: "#111"
    }
}));

export default function NewPost(props) {
    const classes = useStyles();
    const found = props.found;

    const [photos, setPhotos] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [city, setCity] = useState(null);
    const [allCities, setAllCities] = useState(null);
    const [fetchingCities, setFetchingCities] = useState(false);

    const [district, setDistrict] = useState(null);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [allDistricts, setAllDistricts] = useState(null);
    const [fetchingDistricts, setFetchingDistricts] = useState(false);

    const [species, setSpecies] = useState(null);
    const [allSpecies, setAllSpecies] = useState(null);
    const [fetchingSpecies, setFetchingSpecies] = useState(false);

    const [breed, setBreed] = useState(null);
    const [filteredBreeds, setFilteredBreeds] = useState([]);
    const [allBreeds, setAllBreeds] = useState(null);
    const [fetchingBreeds, setFetchingBreeds] = useState(false);

    const [gender, setGender] = useState(null);
    const [genders, setGenders] = useState(null);
    const [fetchingGenders, setFetchingGenders] = useState(false);

    const [alertOpened, setAlertOpened] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [loading, setLoading] = useState(false);

    const validate = () => name && city && species;

    const sendForm = () => {
        const formData = new FormData();
        photos.forEach(p => formData.append("files", p));
        if (validate()) {
            setLoading(true);
            const post = {
                name: name,
                description: description,
                city: city,
                district: district,
                species: species,
                breed: breed,
                postType: found ? "found" : "lost"
            };
            console.log("sending...");
            console.log(post);
            fetch("api/posts/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...authHeader()
                },
                body: JSON.stringify(post)
            }).then((response) => {
                return response.json()
            }).then((result) => {
                const postId = result.id;
                const uploadImageUrl = "api/images/for-post-" + (found ? "found" : "lost") + "/" + postId;
                return fetch(uploadImageUrl, {
                    method: "POST",
                    headers: authHeader(),
                    body: formData
                });
            }).then(() => {
                setLoading(false);
            }).catch(() => {
                setErrorText("Error ocurred while saving post");
                setAlertOpened(true);
                setLoading(false);
            });
        }
    }

    if (!allCities && !fetchingCities) {
        setFetchingCities(true);
        fetch("api/dictionaries/cities").then((response) => response.json())
            .then((result) => {
                setAllCities(result);
                setFetchingCities(false);
            });
    }

    if (!allDistricts && !fetchingDistricts) {
        setFetchingDistricts(true);
        fetch("api/dictionaries/districts").then(response => response.json())
            .then((result) => {
                setAllDistricts(result);
                setFetchingDistricts(false);
            });
    }

    if (!allSpecies && !fetchingSpecies) {
        setFetchingSpecies(true);
        fetch("api/dictionaries/species").then(response => response.json())
            .then((result) => {
                setAllSpecies(result);
                setFetchingSpecies(false);
            });
    }

    if (!allBreeds && !fetchingBreeds) {
        setFetchingBreeds(true);
        fetch("api/dictionaries/breeds").then(response => response.json())
            .then((result) => {
                setAllBreeds(result);
                setFetchingBreeds(false);
            });
    }

    if (!genders && !fetchingGenders) {
        setFetchingGenders(true);
        fetch("api/dictionaries/genders").then(response => response.json())
            .then((result) => {
                setGenders(result);
                setFetchingGenders(false);
            });
    }

    const updatePhotos = (picFiles, picDataUrl) => {
        setPhotos(picFiles);
    }

    return (
        <div>
            <Grid container alignItems="center" justify="center" style={{ minHeight: "100vh", minWidth: "100vh" }} direction="row">
                <Grid item className={classes.gridCol}>
                    <ImageUploader
                        buttonClassName={classes.uploadBtn}
                        withIcon={false}
                        buttonText="Choose pet photos"
                        withPreview={true}
                        onChange={updatePhotos}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        withLabel={false}
                        maxFileSize={5242880}
                    >

                    </ImageUploader>
                </Grid>

                <Grid className={classes.gridCol} container item justify="center" direction="column" style={{ maxWidth: 300 }}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField id="name"
                                required
                                label="Title"
                                value={name}
                                onChange={(event) => setName(event.target.value)}></TextField>
                        </div>
                        <div>
                            <TextField id="description"
                                label="Description"
                                multiline
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}></TextField>
                        </div>
                        <div>
                            <FormControl>
                                <InputLabel id="city" className={classes.selectLabel}>City *</InputLabel>
                                <Select
                                    className={classes.select}
                                    labelId="city"
                                    required
                                    value={city}
                                    onChange={(event) => {
                                        setCity(event.target.value);
                                        setDistrict(null);
                                        setFilteredDistricts((allDistricts || []).filter(d => d.cityId == event.target.value));
                                    }}
                                >
                                    {(allCities || []).map((c) => (
                                        <MenuItem value={c.id}>{c.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            {
                                city ?
                                    <FormControl>
                                        <InputLabel id="dist" className={classes.selectLabel}>District</InputLabel>
                                        <Select
                                            className={classes.select}
                                            labelId="dist"
                                            value={district}
                                            onChange={(event) => setDistrict(event.target.value)}
                                        >
                                            {(filteredDistricts || []).map((d) => (
                                                <MenuItem value={d.id}>{d.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    : null
                            }

                        </div>
                        <div>
                            <FormControl>
                                <InputLabel id="sp" className={classes.selectLabel}>Species</InputLabel>
                                <Select
                                    className={classes.select}
                                    labelId="sp"
                                    value={species}
                                    onChange={(event) => {
                                        setSpecies(event.target.value);
                                        setBreed(null);
                                        setFilteredBreeds((allBreeds || []).filter(b => b.speciesId == event.target.value));
                                    }}
                                >
                                    {(allSpecies || []).map((s) => (
                                        <MenuItem value={s.id}>{s.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            {
                                species ? <FormControl>
                                    <InputLabel id="sp" className={classes.selectLabel}>Breed</InputLabel>
                                    <Select
                                        className={classes.select}
                                        labelId="sp"
                                        value={breed}
                                        onChange={(event) => setBreed(event.target.value)}
                                    >
                                        {(filteredBreeds || []).map((b) => (
                                            <MenuItem value={b.id}>{b.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                    : null
                            }
                        </div>
                        <div>
                            <FormControl>
                                <InputLabel id="gender" className={classes.selectLabel}>Gender</InputLabel>
                                <Select
                                    className={classes.select}
                                    labelId="gender"
                                    value={gender}
                                    onChange={(event) => setGender(event.target.value)}
                                >
                                    {(genders || []).map((g) => (
                                        <MenuItem value={g.id}>{g.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </form>
                    <Button className={classes.btn} onClick={sendForm} variant="outlined" >Add post</Button>
                    {loading && <LinearProgress className={classes.loading}></LinearProgress>}
                </Grid>
            </Grid>
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
        </div >
    )
}