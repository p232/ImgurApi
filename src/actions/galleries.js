const API_URL = "https://api.imgur.com/3/gallery";

export const asyncGetGalleries = ({
  section,
  sort,
  window,
  page
}) => dispatch => {
  let url_end;
  url_end = section == "hot" ? "" : "/t";
  console.log("url_end:", url_end);
  const url = `${API_URL}${url_end}/${section}/${sort}/${window}/${page}`;
  console.log("url:", url);
  fetch(url, {
    async: true,
    crossDomain: true,
    method: "GET",
    headers: {
      authorization: "Client-ID d2167eddae8bbc8"
    }
  })
    .then(response => {
      response.json().then(
        data =>
          page > 0
            ? dispatch({ type: "GALLERIES_NEXT_PAGE", payload: data.data })
            : dispatch({
                type: "FETCH_GALLERIES_SUCCESS",
                payload: data.data
              })
      );
    })
    .catch(function(error) {
      console.log("Request failed", error);
    });
};
