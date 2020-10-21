export const logOut = (history) => {
    localStorage.removeItem("authenticatedUser");
    history.push("/")
};
