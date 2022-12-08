const init = () => {
    routes();
    routesOptions();
}

//Makes the different sectionns of the documentation visible
const routes = () => {
    let btn_home = document.querySelector("#btn_home_id");
    let btn_routes = document.querySelector("#btn_routes_id");
    let btn_info = document.querySelector("#btn_info_id");
    let btn_contact = document.querySelector("#btn_contact_id");

    btn_home.addEventListener("click", () => {
            document.querySelector("#home_id").style.display = "flex";
        
            document.querySelector("#routes_id").style.display = "none";
            document.querySelector("#info_id").style.display = "none";
            document.querySelector("#contact_id").style.display = "none";
    })
    btn_routes.addEventListener("click", () => {
            document.querySelector("#routes_id").style.display = "flex";
        
            document.querySelector("#home_id").style.display = "none";
            document.querySelector("#info_id").style.display = "none";
            document.querySelector("#contact_id").style.display = "none";
    })
    btn_info.addEventListener("click", () => {
            document.querySelector("#info_id").style.display = "flex";
        
            document.querySelector("#routes_id").style.display = "none";
            document.querySelector("#home_id").style.display = "none";
            document.querySelector("#contact_id").style.display = "none";
    })
    btn_contact.addEventListener("click", () => {
            document.querySelector("#contact_id").style.display = "flex";
        
            document.querySelector("#home_id").style.display = "none";
            document.querySelector("#info_id").style.display = "none";
            document.querySelector("#routes_id").style.display = "none";
    })


}

//Controls what content is presented to the viewer when choosing request
const routesOptions = () => {

}


init();