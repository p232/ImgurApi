import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "../css/galleriesList.css";
import { asyncGetGalleries } from "../actions/galleries";
import { changeFilter } from "../actions/filter";
import { GalleryFilter } from "./galleryFilter.jsx";
import Post from "./post.jsx";

class GalleriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      currentPage: 0,
      listEnd: false,
      list: [],
      perPage: 40,
      hotSelected: true,
      topSelected: false,
      load: false
    };
    this.infinityScroll = this.infinityScroll.bind(this);
  }

  componentDidMount() {
    this.props.getGalleries(this.props.filter);
    window.addEventListener("scroll", this.infinityScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.infinityScroll);
  }

  infinityScroll() {
    const { pageYOffset } = window;
    const {
      documentElement: { clientHeight, scrollHeight, scrollTop }
    } = document;
    const { load, listEnd, page, currentPage, perPage } = this.state;
    const scrollTopFinal = pageYOffset || scrollTop;
    if (
      Math.ceil(clientHeight) + Math.ceil(scrollTopFinal) >=
        Math.ceil(scrollHeight) &&
      !load
    ) {
      if (listEnd) {
        this.props.changeFilter({ page: ++this.state.page });
        this.setState({
          page: ++this.state.page,
          load: true,
          listEnd: false,
          currentPage: currentPage + perPage
        });
      } else {
        this.loadNextGalleries(this.props, true);
      }
    }
  }

  onFilterChange(event) {
    const select = event.target;
    const option = select.options[select.selectedIndex];
    this.setState({
      currentPage: 0,
      load: true,
      useFilter: true,
      page: 0
    });
    this.props.changeFilter({
      [select.name]: option.value,
      page: 0
    });
    if (select.name === "section") {
      option.value === "hot"
        ? this.setState({ hotSelected: true })
        : this.setState({ hotSelected: false });
    } else if (select.name === "sort") {
      option.value === "top"
        ? this.setState({ topSelected: true })
        : this.setState({ topSelected: false });
    }
  }

  loadNextGalleries(props, nextPage = false) {
    let currentNextPage;
    let propslist;

    propslist = props.list.hasOwnProperty("items")
      ? props.list.items
      : props.list;
    if (this.state.currentPage + this.state.perPage >= propslist.length) {
      this.setState({ listEnd: true });
      currentNextPage = this.state.currentPage;
    } else {
      currentNextPage = this.state.currentPage + this.state.perPage;
      this.setState({ listEnd: false });
    }
    if (this.state.useFilter) {
      window.scrollTo(0, 0);
      this.setState({
        list: [
          ...propslist.slice(
            this.state.currentPage,
            this.state.currentPage + this.state.perPage
          )
        ],
        currentPage: currentNextPage,
        useFilter: false
      });
    } else {
      this.setState({
        list: [
          ...this.state.list,
          ...propslist.slice(
            this.state.currentPage,
            this.state.currentPage + this.state.perPage
          )
        ],
        currentPage: currentNextPage
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.filter) !== JSON.stringify(this.props.filter)
    ) {
      this.props.getGalleries(nextProps.filter);
    } else {
      this.setState({ load: false });
      this.loadNextGalleries(nextProps);
    }
  }

  render() {
    let propslist;
    return (
      <div className="row gallery-list">
        <GalleryFilter
          filterOptions={this.props.filter}
          onFilterChange={this.onFilterChange.bind(this)}
          topSelected={this.state.topSelected}
          hotSelected={this.state.hotSelected}
        />
        {this.state.list ? (
          this.state.list.map(post => {
            return <Post key={post.id} post={post} />;
          })
        ) : (
          <p>Please wait, while galleries are loading</p>
        )}
        {this.state.load && (
          <div className="loader">
            <h3 className="loader__title" />
            <img
              src="img/load.gif"
              alt="loading..."
              className="loader__image"
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  let stategalleriesList;
  stategalleriesList = state.galleriesList.hasOwnProperty("items")
    ? state.galleriesList.items
    : state.galleriesList;

  return {
    list: stategalleriesList,
    filter: state.galleriesFilter
  };
};

const mapDispatchToProps = dispatch => ({
  getGalleries: params => {
    dispatch(asyncGetGalleries(params));
  },
  changeFilter: (name, newValue) => {
    dispatch(changeFilter(name, newValue));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(GalleriesList)
);
