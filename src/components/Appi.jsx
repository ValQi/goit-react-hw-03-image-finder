import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const AppiImageFinder = async (inputedValue, page) => {
  const response = await axios.get('', {
    params: {
      q: inputedValue,
      key: '39839158-8a8d39ceaa5479b3be9b78b67',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '12',
      page: page,
    },
  });
  return response.data;
};