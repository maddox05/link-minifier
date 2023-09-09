// Purpose: Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getFirestore, collection, serverTimestamp, addDoc, query, onSnapshot, getDocs, orderBy, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

//treating this file like a nodejs file, kinda

import { firebaseConfig } from "../private/firebase_config.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
console.log("Firebase initialized");

const what_collection = collection(db, "mini_links"); // collection, (database, collection name) // what collection of documents I want to look at


function log_in(){ // to go to frontend
    console.log("log in");
    const google_provider = new GoogleAuthProvider();
    signInWithPopup(auth, google_provider)
        .then(result =>{
            const user = result.user;
        })
        .catch(error =>{
            console.log("error",error);
        });
}
const button1 = document.getElementById("button1");
button1.addEventListener("click", log_in);

async function mini_link_checker(normal_link, user_mini_link, userid){
    if(userid !== null){
        const what_items = await query(what_collection, orderBy("timestamp", "desc"));
        getDocs(what_items)
            .then((snapshot) =>{
                if(!go_through_docs_and_check_if_something_is_in_it(snapshot.docs, user_mini_link)){ // if docs alr have minilink in it
                    console.log("not sent, doc already exists")
                    return false;
                }
                else{// else add the doc
                    const data ={
                        normal_link: normal_link,
                        mini_link: user_mini_link,
                        userid: userid,
                        timestamp: serverTimestamp()
                    }
                    const docRef = doc(what_collection, user_mini_link);
                    setDoc(docRef, data)
                        .then((result)=>{
                            console.log("sent!")
                            return true;
                        })
                        .catch((error)=>{
                            console.log(error)
                            return false;
                        })

                }
            })
            .catch((error)=>{
                console.log(error)
                return false;
                }
            )
        //technically should check if link is valid

    }
    else{
        return false;
    }
    // checks if mini link is makeable and if It's makeable than add it
    // returns true if link was created
    // returns false if link was not created
}
mini_link_checker("google.com", "hjjn84h", "notnull");

function mini_link_redirect(mini_link){
     if(window.location.href.includes("maddox.boo/")){
         let doc_name = window.location.href.toString();
         doc_name = doc_name.replace("https://maddox.boo/", "");
         //go into database, find doc with doc_name and then go to normal link with that doc

     }
     else{
         console.log("not valid link")
     }
}
function go_through_docs_and_check_if_something_is_in_it(docs_array, what_it_cant_equal){
    for(let i=0; i<docs_array.length; i++)
        if(docs_array[i].id === what_it_cant_equal){
            console.log(docs_array[i].id)
            return false;
        }
    return true;
}