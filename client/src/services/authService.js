const url = "/api/users/";

const login = (email, password) => fetch(url + "signin", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then((response) => response.json())
    .then((result) => {
        if (result.accessToken) {
            window.localStorage.setItem("user", JSON.stringify(result.user));
            window.localStorage.setItem("token", JSON.stringify(result.accessToken));
            return result;
        } 
        return Promise.reject(result.message);
    });

const logout = () => {
    window.localStorage.removeItem("user");
};

const isAuthenticated = () => {
    //TODO: check auth on server
    return window.localStorage.getItem("user") != null;
}

const getUser = () => {
    return JSON.parse(window.localStorage.getItem("user"));
}

const authService = {
    login,
    logout,
    isAuthenticated,
    getUser
}
export default authService;