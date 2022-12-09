
const init = () => {
        routes();
        routesOptions();
        btnsEvents();
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

        let select_method = document.querySelector("#method_select");
        let subtitle_request = document.querySelector("#id_request");


        select_method.addEventListener("change", () => {

                if (select_method.value == "get") {
                        subtitle_request.innerHTML = 'You chose: ' + select_method.value;

                        document.querySelector('#get_row').style.display = "flex";

                        document.querySelector('#post_row').style.display = "none";
                        document.querySelector('#put_row').style.display = "none";
                        document.querySelector('#delete_row').style.display = "none";

                }
                if (select_method.value == "post") {
                        subtitle_request.innerHTML = 'You chose: ' + select_method.value;
                        document.querySelector('#post_row').style.display = "flex";

                        document.querySelector('#get_row').style.display = "none";
                        document.querySelector('#put_row').style.display = "none";
                        document.querySelector('#delete_row').style.display = "none";

                }
                if (select_method.value == "put") {
                        subtitle_request.innerHTML = 'You chose: ' + select_method.value;
                        document.querySelector('#put_row').style.display = "flex";

                        document.querySelector('#post_row').style.display = "none";
                        document.querySelector('#get_row').style.display = "none";
                        document.querySelector('#delete_row').style.display = "none";

                }
                if (select_method.value == "delete") {
                        subtitle_request.innerHTML = 'You chose: ' + select_method.value;
                        document.querySelector('#delete_row').style.display = "flex";

                        document.querySelector('#post_row').style.display = "none";
                        document.querySelector('#put_row').style.display = "none";
                        document.querySelector('#get_row').style.display = "none";

                }
        })
}

//Certain buttons that make the window move to a different place
const btnsEvents = () => {
        let btn_info = document.querySelector("#id_info_btn");
        let route = document.querySelector("#info_id");

        btn_info.addEventListener("click", () => {
                route.style.display = "flex";
                window.scrollTo(0, 10000)
        })
}




init();