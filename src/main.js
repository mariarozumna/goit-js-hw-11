import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const gallery = document.querySelector('.gallery');
  const loader = document.createElement('span');
  loader.classList.add('loader');

  form.addEventListener('submit', handleSearch);

  function handleSearch(event) {
    event.preventDefault();

    const searchInput = form.querySelector('.input').value;

    if (!searchInput.trim()) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search query.',
      });
      return;
    }

    showLoader();

    const BASE_URL = 'https://pixabay.com/api';
    const KEY = '41927866-cfb01af7ede59fae11104cea9';

    fetch(`${BASE_URL}/?key=${KEY}&q=${searchInput}&image_type=photo&orientation=horizontal&safesearch=true`)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length > 0) {
          displayImages(data.hits);
        } else {
          iziToast.error({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
          });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while fetching data. Please try again!',
        });
      })
      .finally(() => {
        hideLoader(); 
        form.reset();
      });
  }

  function displayImages(images) {
    gallery.innerHTML = '';

    images.forEach(image => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      const img = document.createElement('img');

      link.href = image.largeImageURL;
      img.src = image.webformatURL;
      img.alt = image.tags;

      link.appendChild(img);
      listItem.appendChild(link);
      gallery.appendChild(listItem);
    });

    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
  }

  function showLoader() {
    form.appendChild(loader);
  }

  function hideLoader() {
    if (form.contains(loader)) {
      form.removeChild(loader);
    }
  }
});