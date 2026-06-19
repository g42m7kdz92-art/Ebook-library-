import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// 🔥 Firebase config (YOU MUST REPLACE THIS WITH YOUR OWN)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Upload file permanently
window.uploadFile = async function () {
    const file = document.getElementById("fileInput").files[0];

    if (!file) {
        alert("Select a file first!");
        return;
    }

    const storageRef = ref(storage, file.name);

    await uploadBytes(storageRef, file);

    alert("Uploaded successfully!");

    loadFiles();
};

// Load files from Firebase
async function loadFiles() {
    const listRef = ref(storage, "/");

    const res = await listAll(listRef);

    const container = document.getElementById("fileList");
    container.innerHTML = "";

    res.items.forEach(async (itemRef) => {
        const url = await getDownloadURL(itemRef);

        const div = document.createElement("div");
        div.className = "file";

        div.innerHTML = `
            <p>${itemRef.name}</p>
            <a href="${url}" target="_blank">Download</a>
        `;

        container.appendChild(div);
    });
}

loadFiles();
