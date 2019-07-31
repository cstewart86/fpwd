function lazyload() {
// Get all of the images that are marked up to lazy load
const images = document.querySelectorAll('.lazy');

if ("IntersectionObserver" in window) {
const config = {
  // If the image gets within 50px in the Y axis, start the download.
  rootMargin: '50px 0px',
  threshold: 0.01
};

// The observer for the images on the page
let observer = new IntersectionObserver(onIntersection, config);
  images.forEach(image => {
    observer.observe(image);
  });

function onIntersection(entries) {
  // Loop through the entries
  entries.forEach(entry => {
    // Are we in viewport?
    if (entry.intersectionRatio > 0) {

      // Stop watching and load the image
      observer.unobserve(entry.target);
      preloadImage(entry.target);
    }
  });
}
} else {
function isInViewport(elem){let bounding=elem.getBoundingClientRect();return(bounding.top>=0&&bounding.left>=0&&bounding.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&bounding.right<=(window.innerWidth||document.documentElement.clientWidth))}
window.addEventListener('scroll',function(event){for(let i=0;i<images.length;i++){if(isInViewport(images[i])){if(images[i].getAttribute('data-src')){images[i].setAttribute('src',[i].getAttribute('data-src'));images[i].removeAttribute('data-src');if(images[i].getAttribute('data-srcset')){images[i].setAttribute('srcset',images[i].getAttribute('data-srcset'));images[i].removeAttribute('data-srcset')}
images[i].classList.remove('lazy')}}}},!1)
}
}
window.addEventListener('load',lazyload,false);
