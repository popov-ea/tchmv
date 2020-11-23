import {Box} from "@material-ui/core";
import {Route, Switch} from "react-router-dom";
import Registration from "./registration/Registration";


export default function () {
    return (
        <Box>
            <Switch>    
                <Route path="/Registration" component={Registration}></Route>
            </Switch>
        </Box>
    )
}