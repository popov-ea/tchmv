import {Box} from "@material-ui/core";
import {Route, Switch} from "react-router-dom";
import authService from "../services/authService";
import Home from "./Home";
import Login from "./login/Login";
import NewPost from "./post/NewPost";
import Registration from "./registration/Registration";
import AuthRoute from "./routes/AuthRoute";
import RoleAuthRoute from "./routes/RoleAuthRoute";
import ChangePassword from "./user/ChangePassword";
import ChangePin from "./user/ChangePin";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";


export default function Layout () {
    return (
        <Box>
            <Switch>    
                <AuthRoute path="/Registration" component={Registration}></AuthRoute>
                <AuthRoute path="/Profile" component={Profile}></AuthRoute>
                <AuthRoute path="/EditProfile" component={EditProfile}></AuthRoute>
                <AuthRoute path="/ChangePassword" component={ChangePassword}></AuthRoute>
                <AuthRoute path="/ChangePin" component={ChangePin}></AuthRoute>
                <AuthRoute path="/NewLost" component={NewPost} lost></AuthRoute>
                <AuthRoute path="/NewFound" component={NewPost} found></AuthRoute>
                <Route path="/Login" component={Login}></Route>
                <AuthRoute path="/" component={Home}></AuthRoute>
            </Switch>
        </Box>
    )
}