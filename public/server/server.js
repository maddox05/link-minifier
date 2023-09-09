// Purpose: Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getFirestore, collection, serverTimestamp, addDoc, query, onSnapshot, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

//treating this file like a nodejs file

import { firebaseConfig } from "../private/firebase_config.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
console.log("Firebase initialized");

const what_collection = collection(db, "mini_links"); // collection, (database, collection name) // what collection of documents I want to look at


function log_in(){ // to go to frontend
    const google_provider = new GoogleAuthProvider();
    signInWithPopup(auth, google_provider)
        .then(result =>{
            const user = result.user;
        })
        .catch(error =>{
            console.log("error",error);
        });
}
function mini_link_checker(normal_link, user_mini_link, userid){
    if(userid !== null){
        const query = query(what_collection, orderBy("timestamp", "desc"));
        getDocs(query)
            .then((snapshot) =>{
                if(snapshot.docs.includes(user_mini_link)){ // if docs alr have minilink in it
                    return false;
                }
                else{// else add the doc
                    const data ={
                        normal_link: normal_link,
                        mini_link: user_mini_link,
                        userid: userid,
                        timestamp: serverTimestamp()
                    }
                    addDoc(what_collection, data)
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
function mini_link_redirect(){
     if(window.location.href.includes("maddox.boo/")){
         //redirect
     }
     else{
         console.log("not valid")
     }
}
