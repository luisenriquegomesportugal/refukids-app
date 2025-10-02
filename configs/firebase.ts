import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBV-KAoMh9wvbqVpyzD0xDuUg3fYCF6n2M",
    authDomain: "refugio-api.firebaseapp.com",
    databaseURL: "https://refugio-api-default-rtdb.firebaseio.com",
    projectId: "refugio-api",
    storageBucket: "refugio-api.firebasestorage.app",
    messagingSenderId: "751518136462",
    appId: "1:751518136462:web:b1246dac3fabf6ebcb71df",
    measurementId: "G-WF8ZH3MYVL"
};


export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
