import {Box} from "@material-ui/core";
import {Route, Switch} from "react-router-dom";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import RoleAuthRoute from "./routes/RoleAuthRoute";


export default function Layout () {
    return (
        <Box>
            <Switch>    
                <RoleAuthRoute path="/Registration" component={Registration} action="users:new"></RoleAuthRoute>
                <Route path="/Login" component={Login}></Route>
            </Switch>
        </Box>
    )
}