import { Component } from 'react';
import React from 'react';
import Notiflix from 'notiflix';

import { AppStyled } from './App.styled';
import { ImageGallery } from './Img-Gal/ImageGallery.styled';
import { Button } from './ButtonFolder/button';
import { AppiImageFinder } from './Appi';
import { Searchbar } from './SearchbarFolder/Searchbar';
import { LoaderCont } from './Loader';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
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
      Notiflix.Notify.warning('Enter what you need to search.');
      return;
    }
    try {
      this.setState({ isLoading: true });
      const { totalHits, hits } = await AppiImageFinder(splitQuery, this.state.page);
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry dude, no images. Maybe try later?'
        );

        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      Notiflix.Notify.warning('Ohhhhh, something going wrong, try again');
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