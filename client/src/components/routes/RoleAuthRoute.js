import { Redirect } from "react-router-dom";
import checkPermission from "../../accessControl/checkPermission";
import authService from "../../services/authService";
import { Route } from "react-router-dom";

export default function RoleAuthRoute(props) {
    const {component: Component, action, data, ...rest} = props;

    return <Route {...rest} render={(props) => {
        return authService.isAuthenticated() && checkPermission(authService.getUser().role, action, data)
            ? <Component {...props} {...rest}></Component>
            : <Redirect to="/"></Redirect>
    }}></Route>
}