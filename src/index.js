import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ImagesAPI } from './fetchImage';

const formElem = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryElem = document.querySelector('.gallery')


const imagesAPI = new ImagesAPI();

formElem.addEventListener('submit', onFormSubmit);
// loadMoreBtn.addEventListener('click', onLoadMore);

function onFormSubmit(e) {
  e.preventDefault();
  let query = e.target.elements.searchQuery.value;
  galleryElem.innerHTML = '';
  imagesAPI.getImages(query).then(data => {
    console.log(data);
    renderImages(data.hits);
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
      <a href="${largeImageURL}">
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes</b>${likes}</p>
            <p class="info-item"><b>Views</b>${views}</p>
            <p class="info-item"><b>Comments</b>${comments}</p>
            <p class="info-item"><b>Downloads</b>${downloads}</p>
          </div>
        </div>
      </a>
    `;
      }
    )
    .join('');
}

function renderImages(hits){
const markup = imagesMarkup(hits);
galleryElem.insertAdjacentHTML('beforeend',markup)
}


function hideLoadBtn(){
    loadMoreBtn.classList.add('js-hidden');
}

function showLoadBtn(){
    loadMoreBtn.classList.remove('js-hidden');
}