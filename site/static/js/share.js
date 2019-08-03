function sharePage() {
let url = document.location.href;
const canonicalElement = document.querySelector('link[rel=canonical]');
if (canonicalElement !== null) {
    url = canonicalElement.href;
}
let title = document.querySelector('h1').textContent;
let text = document.querySelector("meta[name='description']").getAttribute('content');

if (navigator.share) {

  let shareButton = document.querySelector('.share-button');
  shareButton.style.display = "block";

  navigator.share({
      title: title,
      text: text,
      url: url,
  })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
}
}
