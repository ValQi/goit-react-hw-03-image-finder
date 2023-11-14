import { Component } from 'react';
import React from 'react';
import Notiflix from 'notiflix';
import axios from 'axios';
import { AppStyled } from './App.styled';
import { ImageGallery } from './Img-Gal/ImageGallery.styled';
import { Button } from './ButtonFolder/button';
import { Searchbar } from './SearchbarFolder/Searchbar';
import { LoaderCont } from './Loader';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLader: false,
  };

  handelQuery = event => {
    this.setState({
      images: [],
      query: `${Date.now()}/${event}`,
      page: 1,
      loadMore: '',
    });
  };

  handelLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  fetchImages = async () => {
    const splitQuery = this.state.query.split(/\/(.*)/)[1].trim();
  
    if (!splitQuery) {
      Notiflix.Notify.warning('Write what you need to search please.');
      return;
    }
    try {
      this.setState({ isLoading: true });
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '39839158-8a8d39ceaa5479b3be9b78b67',
          q: splitQuery,
          page: this.state.page,
          per_page: 12,
        },
      });
      const { totalHits, hits } = response.data;
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'We don`t have such an image. Try later.'
        );
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      Notiflix.Notify.warning('Sorry dude , something going wrong. Try next time.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }
  render() {
    const { images, isLoading, loadMore } = this.state;
    return (
      <AppStyled>
        <Searchbar onSubmit={this.handelQuery} />

        <ImageGallery hits={images} />
        {isLoading && <LoaderCont />}
        {loadMore && <Button onClick={this.handelLoadMore} />}
      </AppStyled>
    );
  }
}

export default App