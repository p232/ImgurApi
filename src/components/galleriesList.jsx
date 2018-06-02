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
      userSelected: false,
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
    // console.log(
    //   "clientHeight + scrollTopFinal:",
    //   clientHeight + scrollTopFinal
    // );
    // console.log("clientHeight:", clientHeight);
    // console.log("scrollTopFinal:", scrollTopFinal);
    // console.log("scrollHeight:", scrollHeight);
    // console.log("load:", load);
    // console.log("listEnd:", listEnd);
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
      option.value === "user"
        ? this.setState({ userSelected: true })
        : this.setState({ userSelected: false });
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
    // console.log("propslist:", propslist);
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
      // console.log("props.list:", props.list.items);
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
      // console.log("this.state.currentPage:", this.state.perPage);
      // console.log("slice:",{
      //   list: [
      //     ...this.state.list,
      //     ...props.list.items.slice(
      //       this.state.currentPage,
      //       this.state.currentPage + this.state.perPage
      //     )
      //   ],
      //   currentPage: currentNextPage
      // });
      // console.log("this.state.list:", this.state.list);
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
    // console.log("length:", this.props.list.length);
    // console.log("this.props.list:", this.props.list.items);
    let propslist;

    // propslist = this.props.list.hasOwnProperty("items")
    //   ? this.props.list.items
    //   : this.props.list;
    // console.log("propslist:", propslist);
    return (
      <div className="row gallery-list">
        <GalleryFilter
          filterOptions={this.props.filter}
          onFilterChange={this.onFilterChange.bind(this)}
          userSelected={this.state.userSelected}
          topSelected={this.state.topSelected}
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

const mapStateToProps = state => ({
  list: state.galleriesList,
  filter: state.galleriesFilter
});

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
