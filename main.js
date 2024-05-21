import { initializeApp } from "firebase/app";
import { getFirestore, collection, writeBatch, doc } from "firebase/firestore";
import { readFile } from "fs/promises";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "xxxxxxxxxx",
  authDomain: "xxxxxxxxxx",
  projectId: "xxxxxxxxxx",
  storageBucket: "xxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxx",
  appId: "xxxxxxxxxx",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addDocuments() {
  try {
    const data = JSON.parse(await readFile(new URL('./student.json', import.meta.url)));
    const batch = writeBatch(db);

    data.forEach(docData => {
      const docRef = doc(collection(db, "students")); 
      batch.set(docRef, docData);
    });

    await batch.commit();
    console.log("All documents added successfully!");
  } catch (e) {
    console.error("Error adding documents: ", e);
  }
}

addDocuments();