import { Box, Drawer } from "@material-ui/core";
import { Route, Switch, withRouter } from "react-router-dom";
import authService from "../services/authService";
import Home from "./Home";
import Login from "./login/Login";
import NewPost from "./post/NewPost";
import PostsList from "./post/PostsList";
import Registration from "./registration/Registration";
import AuthRoute from "./routes/AuthRoute";
import RoleAuthRoute from "./routes/RoleAuthRoute";
import ChangePassword from "./user/ChangePassword";
import ChangePin from "./user/ChangePin";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import Navigation from "./Navigation";
import Routes from "../services/routes";
import InitPost from "./post/InitPost";
import InitDialog from "./chat/InitDialog";
import Chat from "./chat/chat";

export default function Layout(props) {
    return (
        <Box>
            <Navigation></Navigation>   
            <Switch>
                <Route path={Routes.registration} component={Registration}></Route>
                <AuthRoute path={Routes.profile} component={Profile}></AuthRoute>
                <AuthRoute path={Routes.editProfile} component={EditProfile}></AuthRoute>
                <AuthRoute path={Routes.changePassword} component={ChangePassword}></AuthRoute>
                <AuthRoute path={Routes.newLost} component={NewPost} lost></AuthRoute>
                <AuthRoute path={Routes.newFound} component={NewPost} found></AuthRoute>
                <AuthRoute path={Routes.allPosts} component={PostsList} type="all"></AuthRoute>
                <AuthRoute path={Routes.initPost} component={InitPost}></AuthRoute>
                <AuthRoute path={Routes.dialog} component={Chat}></AuthRoute>
                { /*<AuthRoute path={Routes.dialogs} component={}></AuthRoute> */}
                <AuthRoute path={Routes.initDialog} component={InitDialog}></AuthRoute>
                <Route path={Routes.login} component={Login}></Route>
                <AuthRoute path={Routes.home} component={PostsList}></AuthRoute>
            </Switch>
        </Box>
    )
}