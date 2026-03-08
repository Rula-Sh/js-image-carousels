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

const catsCarousel = document.getElementById("cats");
const carouselContainer = catsCarousel.parentElement;

window.onmousedown = (e) => {
  catsCarousel.dataset.mouseDownAt = e.clientX; // store the mouse X position in 'data-mousedownat' attribute to remember the start position
};
window.onmouseup = (e) => {
  catsCarousel.dataset.mouseDownAt = "0"; // reset data-mousedownat attribute
  catsCarousel.dataset.prevPercentage = catsCarousel.dataset.percentage; // save the final position as the new starting point for next drag
};
window.onmousemove = (e) => {
  if (catsCarousel.dataset.mouseDownAt == "0") return; // when it = 0 that means that the mouse is not pressed to move the carousel, so return nothing

  const mouseDelta = parseFloat(catsCarousel.dataset.mouseDownAt) - e.clientX; // for how far the mouse moved horizontally
  const maxDelta = window.innerWidth / 2; // calculate draging sensitivity

  const percentage = (mouseDelta / maxDelta) * -20; // convert mouse movement to carousel movement (the negative sign makes it move in the same direction as the drag)
  const nextPreUniconstrained = parseFloat(catsCarousel.dataset.prevPercentage) + percentage; // prevPercentage(the starting point from the last time i left it) + current mouse movement

  // calculate how far the carousel can actually scroll
  const carouselWidth = catsCarousel.scrollWidth;
  const containerWidth = carouselContainer.clientWidth + -60;
  const maxPercentage = -((carouselWidth - containerWidth) / carouselWidth) * 100; // if the carousel is wider than the container, calculate the maximum scroll distance as a percentage

  // prevent scrolling beyond the content, between 0% (start) and maxPercentage (end)
  const nextPercentage = Math.max(
    Math.min(nextPreUniconstrained, 0),
    maxPercentage,
  );

  catsCarousel.dataset.percentage = nextPercentage; // saves the last position i dragged the carousel in

  // animate the carousel to the new position
  catsCarousel.animate(
    { transform: `translate(${nextPercentage}%, -50%)` },
    { duration: 1200, fill: "forwards" },
  );
};
// recalculate on window resize (ensures the carousel stays within the valid range after window resize)
window.addEventListener("resize", () => {
  // recalculate bounds and adjust position (else on resize the difference will show until i try to drag)
  const carouselWidth = catsCarousel.scrollWidth;
  const containerWidth = carouselContainer.clientWidth;
  const maxPercentage = -((carouselWidth - containerWidth) / carouselWidth) * 100;

  // if the current percentage is beyond new bounds, adjust it
  let currentPercentage = parseFloat(catsCarousel.dataset.percentage) || 0;
  if (currentPercentage < maxPercentage) {
    catsCarousel.dataset.percentage = maxPercentage;
    catsCarousel.dataset.prevPercentage = maxPercentage;

    catsCarousel.animate(
      { transform: `translate(${maxPercentage}%, -50%)` },
      { duration: 300, fill: "forwards" },
    );
  }
});