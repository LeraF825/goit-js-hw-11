
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ImagesAPI } from './fetchImage';


const formElem = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryElem = document.querySelector('.gallery');

hideLoadBtn();

const imagesAPI = new ImagesAPI();
formElem.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function onFormSubmit(e) {
  e.preventDefault();
  hideLoadBtn();
  let query = e.target.elements.searchQuery.value.trim();
  imagesAPI.PAGE = 1;
  imagesAPI.QUERY = query;
  galleryElem.innerHTML = '';
 
  if (query === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.',
    );
    return;
  }

  imagesAPI.getImages().then(data => {
    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    } else {
      renderImages(data.hits);
      showLoadBtn();
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }  
  })
  .catch(error => console.log(error))
  .finally(() => {
    formElem.reset();
  });
}

function imagesMarkup(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
          <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy"  width="250" height="200"/>
          <div class="info">
            <p class="info-item"><b>Likes</b>${likes}</p>
            <p class="info-item"><b>Views</b>${views}</p>
            <p class="info-item"><b>Comments</b>${comments}</p>
            <p class="info-item"><b>Downloads</b>${downloads}</p>
          </div>
          </a>
        </div>
    `;
      }
    )
    .join('');
}

function renderImages(hits){
const markup = imagesMarkup(hits);
galleryElem.insertAdjacentHTML('beforeend',markup)
}

function onLoadMore(){
imagesAPI.PAGE++;
imagesAPI.getImages().then(data => {
  renderImages(data.hits);  
  simpleLightBox = new SimpleLightbox('.gallery a').refresh();

  const totalPages = Math.ceil(data.totalHits/imagesAPI.PER_PAGE);

  if(imagesAPI.PAGE >= totalPages){
    hideLoadBtn();
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results.",
    );
  }
}).catch(error => console.log(error));
}

function hideLoadBtn(){
  loadMoreBtn.classList.add('js-hidden');
}

function showLoadBtn(){
  loadMoreBtn.classList.remove('js-hidden');
}