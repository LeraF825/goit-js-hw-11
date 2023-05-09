import axios from 'axios';

export class ImagesAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '36214859-9a36ec77f3d5f2e4fe5aa554f';
  #PAGE = 1;
  #PER_PAGE = 40;

  async getImages(query) {
    const url = this.#BASE_URL;
    const params = new URLSearchParams({
      key: this.#API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.#PER_PAGE,
      page: this.#PAGE,
    });
    try {
      const response = await axios.get(`${url}?${params}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
