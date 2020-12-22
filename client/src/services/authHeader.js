
export default function authHeader() {
    const accessToken = JSON.parse(window.localStorage.getItem("token"));
    if (accessToken) {
        return { "x-access-token": accessToken };
    }
    return {};
}