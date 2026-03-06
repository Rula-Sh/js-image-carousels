let natureCarousel = document.querySelectorAll(".nature");
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

let landCarousel = document.querySelectorAll(".land");
let landIndex = 0;
landCarousel[landIndex].style.display = "block";

function movelandCarousel(indexUpdate) {
  let oldIndex = landIndex;
  landIndex += indexUpdate;

  if (landIndex === landCarousel.length) {
    landIndex = 0;
  } else if (landIndex < 0) {
    landIndex = landCarousel.length - 1;
  }

  if (indexUpdate === 1) {
    landCarousel[oldIndex].style.animation = "slide-to-left 1.5s";
    setTimeout(() => {
      landCarousel[oldIndex].style.display = "none";
    }, 1300);
    landCarousel[landIndex].style.display = "block";
    landCarousel[landIndex].style.animation = "slide-from-right 1.5s";
  } else {
    landCarousel[oldIndex].style.animation = "slide-to-right 1.5s";
    setTimeout(() => {
      landCarousel[oldIndex].style.display = "none";
    }, 1300);
    landCarousel[landIndex].style.animation = "slide-from-left 1.5s";
    landCarousel[landIndex].style.display = "block";
  }
}