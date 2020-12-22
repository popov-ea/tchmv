import {Box} from "@material-ui/core";
import {Route, Switch} from "react-router-dom";
import authService from "../services/authService";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import AuthRoute from "./routes/AuthRoute";
import RoleAuthRoute from "./routes/RoleAuthRoute";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";


export default function Layout () {
    return (
        <Box>
            <Switch>    
                <RoleAuthRoute path="/Registration" component={Registration} action="users:new"></RoleAuthRoute>
                <AuthRoute path="/Profile" component={Profile}></AuthRoute>
                <AuthRoute path="/EditProfile" component={EditProfile}></AuthRoute>
                <Route path="/Login" component={Login}></Route>
            </Switch>
        </Box>
    )
}