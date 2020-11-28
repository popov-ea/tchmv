import { Redirect, Route } from "react-router-dom";
import authService from "../../services/authService";

export default function AuthRoute(props) {
    const {component, ...rest} = props;
    return <Route {...rest} render={(props) => {
        authService.isAuthenticated 
            ? <component {...props}></component>
            : <Redirect to="/login"></Redirect>
    }}></Route>
}