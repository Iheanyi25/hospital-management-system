export const logOut = () => {
    localStorage.removeItem("authenticatedUser");
    localStorage.removeItem("token"); //to remove the token stored too
    window.location.reload();
};