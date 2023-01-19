import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

const auth = getAuth();

const submitButton = document.getElementById("submit");

if (submitButton != null) {
  submitButton.addEventListener("click", function () {
    signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  });
}

if (submitButton != null) {
  submitButton.addEventListener("click", function () {
    signOut(auth)
      .then(() => {
        console.log("bye");
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

const nameSpace = document.getElementById("data");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // const uid = user.uid;
    console.log(user.uid);
    console.log(getAuth().currentUser.displayName);
    nameSpace.innerText = getAuth().currentUser.displayName;
  } else {
    document.location.href = "main.html";
  }
});
