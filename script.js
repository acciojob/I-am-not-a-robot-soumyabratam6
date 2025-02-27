document.addEventListener("DOMContentLoaded", () => {
    const imagesContainer = document.getElementById("images");
    const message = document.getElementById("h");
    const resultMessage = document.getElementById("para");
    const resetButton = document.getElementById("reset");
    const verifyButton = document.getElementById("verify");

    let imageUrls = [
        "https://picsum.photos/id/237/200/300",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/200/300?grayscale",
        "https://picsum.photos/200/300/",
        "https://picsum.photos/200/300.jpg"
    ];
    
    let selectedImages = [];
    
    function shuffleAndRenderImages() {
        let duplicateIndex = Math.floor(Math.random() * imageUrls.length);
        let duplicateImage = imageUrls[duplicateIndex];

        let imagesWithDuplicate = [...imageUrls, duplicateImage];
        imagesWithDuplicate.sort(() => Math.random() - 0.5);

        imagesContainer.innerHTML = "";
        imagesWithDuplicate.forEach((src, index) => {
            let img = document.createElement("img");
            img.src = src;
            img.dataset.src = src;
            img.classList.add("tile");
			if (src === "https://picsum.photos/id/237/200/300") {
			    img.classList.add("img1");
			} else if (src === "https://picsum.photos/seed/picsum/200/300") {
			    img.classList.add("img2");
			} else if (src ==="https://picsum.photos/200/300?grayscale") {
				img.classList.add("img3");
			} else if (src ==="https://picsum.photos/200/300/") {
				img.classList.add("img4");
			} else if (src === "https://picsum.photos/200/300.jpg") {
				img.classList.add("img5");
			}
            img.addEventListener("click", () => handleImageClick(img));
            imagesContainer.appendChild(img);
        });

        selectedImages = [];
        resetButton.style.display = "none";
        verifyButton.style.display = "none";
        resultMessage.textContent = "";
    }

    function handleImageClick(img) {
        if (selectedImages.length >= 2) return;
        if (selectedImages.includes(img)) return;

        img.classList.add("selected");
        selectedImages.push(img);

        resetButton.style.display = "block";

        if (selectedImages.length === 2) {
            verifyButton.style.display = "block";
        }
    }

    function resetState() {
        selectedImages.forEach(img => img.classList.remove("selected"));
        selectedImages = [];
        resetButton.style.display = "none";
        verifyButton.style.display = "none";
        resultMessage.textContent = "";
    }

    function verifySelection() {
        if (selectedImages.length !== 2) return;

        let src1 = selectedImages[0].dataset.src;
        let src2 = selectedImages[1].dataset.src;

        if (src1 === src2) {
            resultMessage.textContent = "You are a human. Congratulations!";
        } else {
            resultMessage.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }

        verifyButton.style.display = "none";
    }

    resetButton.addEventListener("click", resetState);
    verifyButton.addEventListener("click", verifySelection);

    shuffleAndRenderImages();
});
