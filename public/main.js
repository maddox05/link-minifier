import {mini_link_checker} from "./server/server.js";
import {auth} from "./server/server.js";

const normal_link_input = document.getElementById("normal_link_input");

const mini_link_button = document.getElementById("minify_button");


async function mini_link_creator() {
    if (auth.currentUser.uid !== null) {
        let mini_link = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        for (let i = 0; i < 5; i++) {
            mini_link += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        // check if link is valid first
        if (mini_link_checker(normal_link_input.value, mini_link, auth.currentUser.uid)) {
            normal_link_input.value = "";
            console.log("link created")
        }

    } else {
        console.log("not logged in")
    }
}
mini_link_button.addEventListener("click", mini_link_creator);