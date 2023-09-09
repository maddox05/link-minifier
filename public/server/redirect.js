import { db } from "./server.js";
import { getFirestore, collection, serverTimestamp, addDoc, query, onSnapshot, getDocs, getDoc, orderBy, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
const what_collection = collection(db, "mini_links"); // collection, (database, collection name) // what collection of documents I want to look at

async function mini_link_redirect(){
    if(window.location.href.includes("https://maddox.boo/")){
        let doc_name = window.location.href.toString();
        doc_name = doc_name.replace("https://maddox.boo/", "");
        const docRef = doc(what_collection, doc_name);
        const docSnapshot = await getDoc(docRef);
        if(docSnapshot.exists()){
            window.location.href = docSnapshot.data().normal_link;
        }
        else{
            console.log("how am i here? doc does not exist")
        }



        //go into database, find doc with doc_name and then go to normal link with that doc

    }
    else{
        console.log("not valid link")
    }
}
if(!window.location.href.includes("index.html")){
    mini_link_redirect();
}
else{
    console.log("window includes index.html")
}