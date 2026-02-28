let images = document.querySelectorAll(".nature-image");
let slideIndex = 0;

images[slideIndex].style.display = "block";

function moveSlide(indexUpdate) {
  slideIndex += indexUpdate;

  images.forEach((image) => {
    image.style.display = "none";
  });

  if (slideIndex === images.length) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = images.length - 1;
  }

  images[slideIndex].style.display = "block";
}
