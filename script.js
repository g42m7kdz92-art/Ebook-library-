let files = JSON.parse(localStorage.getItem("files")) || [];

// Upload file (stored in browser only)
function uploadFile() {
    let input = document.getElementById("fileInput");

    if (input.files.length === 0) {
        alert("Select a file first!");
        return;
    }

    let file = input.files[0];

    let reader = new FileReader();

    reader.onload = function(e) {
        let fileData = {
            name: file.name,
            data: e.target.result
        };

        files.push(fileData);
        localStorage.setItem("files", JSON.stringify(files));

        displayFiles();
    };

    reader.readAsDataURL(file);
}

// Display files
function displayFiles() {
    let container = document.getElementById("fileList");
    container.innerHTML = "";

    files.forEach((file, index) => {
        let div = document.createElement("div");
        div.className = "file";

       
