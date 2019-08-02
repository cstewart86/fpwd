function sharePage() {
let url = document.location.href;
const canonicalElement = document.querySelector('link[rel=canonical]');
if (canonicalElement !== null) {
    url = canonicalElement.href;
}
let title = document.querySelector('h1');
let text = document.querySelector("meta[name='description']").getAttribute('content');

if (navigator.share) {
  navigator.share({
      title: title,
      text: text,
      url: url,
  })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
}
}
