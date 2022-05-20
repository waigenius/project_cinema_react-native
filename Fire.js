import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyASs4XcTJW5HyIqshXBbl8ZloxRgXXp0PY",
    authDomain: "movies-8dcf8.firebaseapp.com",
    projectId: "movies-8dcf8",
    storageBucket: "movies-8dcf8.appspot.com",
    messagingSenderId: "775516354510",
    appId: "1:775516354510:web:90a5caa41c29361aff5d9f"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default class Fire {
    getMovies(callback) {
        const q = query(collection(db, 'movies'), orderBy('title', 'asc'));
        onSnapshot(q, (snapshot) => {
            let movies = [];
            snapshot.forEach(doc => {
                movies.push({ id: doc.id, ...doc.data() });
            });
            callback(movies); // Permet de renvoyer au niveau de notre fichier React Native
        });
    }

    addMovie(movie) {
        addDoc(collection(db, 'movies'), movie);
    }

    updateMovie(movie) {
        updateDoc(doc(db, 'movies', movie.id), movie);
    }

    deleteMovie(movie) {
        deleteDoc(doc(db, 'movies', movie.id))
    }

}

