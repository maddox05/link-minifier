// Purpose: Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import {
	getFirestore,
	collection,
	serverTimestamp,
	addDoc,
	query,
	onSnapshot,
	getDocs,
	getDoc,
	orderBy,
	doc,
	setDoc,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	signOut,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

//treating this file like a nodejs file, kinda

import { firebaseConfig } from "../private/firebase_config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
console.log("Firebase initialized");

const what_collection = collection(db, "mini_links"); // collection, (database, collection name) // what collection of documents I want to look at

function log_in() {
	// to go to frontend
	console.log("log in");
	const google_provider = new GoogleAuthProvider();
	signInWithPopup(auth, google_provider)
		.then((result) => {
			const user = result.user;
		})
		.catch((error) => {
			console.log("error", error);
		});
}
onAuthStateChanged(auth, (user) => {
	try {
		const logout_button = document.getElementById("logout_button");
		if (user) {
			logout_button.style.visibility = "visible";
			login_button.style.visibility = "hidden";
			logout_button.addEventListener("click", () => {
				signOut(auth).catch((error) => {
					console.log("error", error);
				});
			});
			console.log("logged in");
		} else {
			logout_button.style.visibility = "hidden";
			login_button.style.visibility = "visible";
			console.log("not logged in");
		}
	} catch {
		console.log("redirecting soon or fatal error");
	}
});
const login_button = document.getElementById("login_button");
if (login_button !== null) {
	login_button.addEventListener("click", log_in);
}

export async function mini_link_checker(normal_link, user_mini_link, userid) {
	if (userid !== null) {
		const what_items = await query(what_collection, orderBy("timestamp", "desc"));
		getDocs(what_items)
			.then((snapshot) => {
				if (
					!go_through_docs_and_check_if_something_is_in_it(snapshot.docs, user_mini_link)
				) {
					// if docs alr have minilink in it
					console.log("not sent, doc already exists");
					return false;
				} else {
					// else add the doc
					const data = {
						normal_link,
						mini_link: user_mini_link,
						userid,
						timestamp: serverTimestamp(),
					};
					const docRef = doc(what_collection, user_mini_link);
					setDoc(docRef, data)
						.then((result) => {
							console.log("sent!");
							return true;
						})
						.catch((error) => {
							console.log(error);
							return false;
						});
				}
			})
			.catch((error) => {
				console.log(error);
				return false;
			});
		//technically should check if link is valid
	} else {
		return false;
	}
	// checks if mini link is makeable and if It's makeable than add it
	// returns true if link was created
	// returns false if link was not created
}
// mini_link_checker("google.com", "hjjn84h", "notnull"); test

function go_through_docs_and_check_if_something_is_in_it(docs_array, what_it_cant_equal) {
	for (let i = 0; i < docs_array.length; i++)
		if (docs_array[i].id === what_it_cant_equal) {
			console.log(docs_array[i].id);
			return false;
		}
	return true;
}
