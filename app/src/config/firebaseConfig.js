import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAV0cJxREF4w9VThA0R7yBCQ90bAg0OSiE",
    authDomain: "tracking-faedd.firebaseapp.com",
    databaseURL: "https://akilli-bahis-mobile.europe-west1.firebasedatabase.app",
    projectId: "tracking-faedd",
    storageBucket: "tracking-faedd.appspot.com",
    messagingSenderId: "186145300614",
    appId: "1:186145300614:web:c64bd5ad6d44727e9f7107",
    measurementId: "G-25286K1BLK"
  };

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
