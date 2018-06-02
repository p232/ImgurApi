export default function galleriesFilter(
  state = {
    page: "0",
    section: "Gaming",
    sort: "time",
    window: ""
  },
  action
) {
  switch (action.type) {
    case "CHANGE_FILTER":
      return Object.assign({}, state, action.payload.params);
  }
  return state;
}
