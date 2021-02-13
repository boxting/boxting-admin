import Firebase from 'firebase'
import 'firebase/storage'

export class FirebaseManager{

    private static _instance: FirebaseManager
    storage: Firebase.storage.Storage

    constructor(){
        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
            databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
            projectId: `${process.env.FIREBASE_PROJECT_ID}`,
            storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
            messagingSenderId: process.env.FIREBASE_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID
        };
        
        Firebase.initializeApp(firebaseConfig);
        
        this.storage = Firebase.storage()
    }

    public static getInstance() {
        return this._instance || (this._instance = new this())
    }
}