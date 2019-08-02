let url = document.location.href;
const canonicalElement = document.querySelector('link[rel=canonical]');
if (canonicalElement !== null) {
    url = canonicalElement.href;
}
let title = document.querySelector('h1');

if (navigator.share) {
  navigator.share({
      title: title,
      text: '',
      url: url,
  })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
}
