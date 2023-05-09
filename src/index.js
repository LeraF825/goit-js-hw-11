import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ImagesAPI } from './fetchImage';

const formElem = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

const imagesAPI = new ImagesAPI();

formElem.addEventListener('submit', onFormSubmit);
// loadMoreBtn.addEventListener('click', onLoadMore);

function onFormSubmit(e){
    e.preventDefault();
    let query = e.target.elements.searchQuery.value;
    imagesAPI.getImages(query).then(data => {
console.log(data)
    });
}