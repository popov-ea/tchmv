
export default function AuthHeader() {
    const accessToken = JSON.parse(window.localStorage.getItem("token"));
    if (accessToken) {
        return { "x-access-token": accessToken };
    }
    return {};
}