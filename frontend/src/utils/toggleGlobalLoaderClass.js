export const toggleGlobalLoaderClass = (action) => {
    if(action === "add"){
        document.getElementById("global-loader").classList.add('bar-container');
        document.getElementById("global-loader-bar").classList.add('bar') 
        if(document.getElementsByClassName("main-content")[0]) document.getElementsByClassName("main-content")[0].classList.add('blur-content')
    } else {
        document.getElementById("global-loader").classList.remove('bar-container');
        document.getElementById("global-loader-bar").classList.remove('bar')  
        if(document.getElementsByClassName("main-content")[0]) document.getElementsByClassName("main-content")[0].classList.remove('blur-content')
    }
   
}