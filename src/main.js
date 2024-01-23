import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const imageList = document.querySelector('.gallery');
  const loader = document.createElement('div'); // Corrected loader element creation

  const gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  form.addEventListener('submit', handleSearch);

  function handleSearch(event) {
    event.preventDefault();

    const searchInput = form.elements.input.value;

    imageList.innerHTML = '';

    if (!searchInput.trim()) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search query.',
        messageSize: '20px',
        messageColor: '#808080',
        backgroundColor: '#e7fc44',
        position: 'topLeft',
        timeout: 3000,
      });
      return;
    }

    showLoader();

    fetchImages(searchInput)
      .then(data => {
        if (data.hits.length === 0) {
          iziToast.show({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            messageSize: '16px',
            messageColor: 'white',
            backgroundColor: '#EF4040',
            position: 'topRight',
            timeout: 5000,
          });
        }
        imageList.innerHTML = createMarkup(data.hits);
        gallery.refresh();
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

  function fetchImages(value) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '41927866-cfb01af7ede59fae11104cea9';

    
    return fetch(`${BASE_URL}?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      });
  }

  function createMarkup(hits) {
    return hits
      .map(
        ({
          comments,
          downloads,
          largeImageURL,
          likes,
          webformatURL,
          tags,
          views,
        }) =>
          `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}">
            <ul class="gallery-item-description">
              <li>Likes: ${likes}</li>
              <li>Views: ${views}</li>
              <li>Downloads: ${downloads}</li>
              <li>Comments: ${comments}</li>
            </ul>
          </a>
        </li>`
      )
      .join('');
  }

function hideLoader() {
  // Приховати елемент завантажувача
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 500);
}

function showLoader() {
  // Показати елемент завантажувача
  loader.classList.remove('hidden');
}
});