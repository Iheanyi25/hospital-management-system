export const logOut = (history) => {
    localStorage.removeItem("authenticatedUser");
    localStorage.removeItem("token"); //to remove the token stored too
    history.push("/")
};