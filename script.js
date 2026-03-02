let natureCarousel = document.querySelectorAll(".nature-image");
let natureIndex = 0;
natureCarousel[natureIndex].style.display = "block";

function moveNatureCarousel(indexUpdate) {
  natureIndex += indexUpdate;

  natureCarousel.forEach((image) => {
    image.style.display = "none";
  });

  if (natureIndex === natureCarousel.length) {
    natureIndex = 0;
  } else if (natureIndex < 0) {
    natureIndex = natureCarousel.length - 1;
  }

  natureCarousel[natureIndex].style.display = "block";
}

let animalCarousel = document.querySelectorAll(".animal-image");
let animalIndex = 0;
animalCarousel[animalIndex].style.display = "block";

function moveAnimalsCarousel(indexUpdate) {
  let oldIndex = animalIndex;
  animalIndex += indexUpdate;

  if (animalIndex === animalCarousel.length) {
    animalIndex = 0;
  } else if (animalIndex < 0) {
    animalIndex = animalCarousel.length - 1;
  }

  if (indexUpdate === 1) {
    animalCarousel[oldIndex].style.animation = "slide-to-left 1.5s";
    setTimeout(() => {
      animalCarousel[oldIndex].style.display = "none";
    }, 1300);
    animalCarousel[animalIndex].style.display = "block";
    animalCarousel[animalIndex].style.animation = "slide-from-right 1.5s";
  } else {
    animalCarousel[oldIndex].style.animation = "slide-to-right 1.5s";
    setTimeout(() => {
      animalCarousel[oldIndex].style.display = "none";
    }, 1300);
    animalCarousel[animalIndex].style.animation = "slide-from-left 1.5s";
    animalCarousel[animalIndex].style.display = "block";
  }
}
