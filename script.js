document.addEventListener("DOMContentLoaded", async () => {
    const imageResponse = await fetch("images.json");
    const textResponse = await fetch("text.json");

    let images = await imageResponse.json();
    let texts = await textResponse.json();

    const contentDiv = document.getElementById("content");
    const sourceDropdown = document.getElementById("source");
    const destinationDropdown = document.getElementById("destination");

    // Function to populate dropdowns
    function populateDropdowns() {
        sourceDropdown.innerHTML = destinationDropdown.innerHTML = "";
        
        images.forEach(image => {
            const option = document.createElement("option");
            option.value = image.id;
            option.textContent = `Image ${image.id}`;
            
            sourceDropdown.appendChild(option.cloneNode(true));
            destinationDropdown.appendChild(option);
        });
    }

    // Function to render images and text
    function render() {
        contentDiv.innerHTML = "";
        images.forEach(image => {
            const textObj = texts.find(t => t.id === image.id);
            const div = document.createElement("div");
            div.classList.add("item");
            div.innerHTML = `
                <img src="${image.src}" alt="Image ${image.id}">
                <p class="caption">${textObj.caption}</p>
                <p class="description">${textObj.description}</p>
            `;
            contentDiv.appendChild(div);
        });
    }

    // Function to swap text between two selected images
    window.swapText = function () {
        const sourceId = parseInt(sourceDropdown.value);
        const destinationId = parseInt(destinationDropdown.value);

        if (sourceId === destinationId) {
            alert("Source and Destination must be different.");
            return;
        }

        const text1 = texts.find(t => t.id === sourceId);
        const text2 = texts.find(t => t.id === destinationId);

        if (text1 && text2) {
            [text1.caption, text2.caption] = [text2.caption, text1.caption];
            [text1.description, text2.description] = [text2.description, text1.description];
            render();
        }
    };

    populateDropdowns();
    render();
});
