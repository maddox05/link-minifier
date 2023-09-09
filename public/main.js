import {db, mini_link_checker} from "./server/server.js";
import {auth} from "./server/server.js";

const normal_link_input = document.getElementById("normal_link_input");

const mini_link_button = document.getElementById("minify_button");

const where_to_put_link = document.getElementById("where_put_mini_link");

async function mini_link_creator() {
    try{
        const userid = auth.currentUser.uid
    }
    catch{
        where_to_put_link.innerHTML = "not logged in";
        console.log("not logged in")
        return;
    }
    if (auth.currentUser.uid !== null && is_link_valid(normal_link_input.value)) {
        let mini_link = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$*";
        for (let i = 0; i < 5; i++) {
            mini_link += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        if (mini_link_checker(normal_link_input.value, mini_link, auth.currentUser.uid)) {
            where_to_put_link.innerHTML = `<a href="https://maddox.boo/${mini_link}">https://maddox.boo/${mini_link}</a>`;
            normal_link_input.value = "";
            console.log("link created")
        }

    }
    else {
        console.log("link not valid")
        where_to_put_link.innerHTML = "link not valid";

    }
}
function is_link_valid(link) {
    if (link.includes("https://") && link.includes(".") || link.includes("http://") && link.includes(".")) {
        return true;
    } else {
        return false;
    }
}
mini_link_button.addEventListener("click", mini_link_creator);