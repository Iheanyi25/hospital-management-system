export const toggleGlobalLoaderClass = () => {
    document.getElementById("global-loader").classList.toggle('bar-container');
    document.getElementById("global-loader-bar").classList.toggle('bar')
}