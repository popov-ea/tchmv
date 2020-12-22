import { Redirect, Route } from "react-router-dom";
import authService from "../../services/authService";

export default function AuthRoute(props) {
    const {component: Component, ...rest} = props;
    return <Route {...rest} render={(props) => {
        return authService.isAuthenticated() 
            ? <Component {...props} {...rest}></Component>
            : <Redirect to="/login"></Redirect>
    }}></Route>
}