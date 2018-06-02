import React from "react";

import "../css/filter.css";

export const GalleryFilter = props => {
  const { onFilterChange, userSelected, topSelected, filterOptions } = props;
  return (
    <div className="filter__wrapper">
      <div className="container">
        <div className="row">
          <div className="filter col-md-12">
            <div className="filter__section">
              <label htmlFor="section">Select section:</label>
              <select
                id="section"
                name="section"
                onChange={e => onFilterChange(e)}
                defaultValue={filterOptions.section}
              >
                <option value="hot">Most viral</option>
                <option value="the_more_you_know">The More You Know</option>
                <option value="science_and_tech">Science and Tech</option>
                <option value="gaming">Gaming</option>
                <option value="eat_what_you_want">Eat What You Want</option>
                <option value="aww">Aww</option>
                <option value="Inspiring">Inspiring</option>
                <option value="movies_and_tv">Movies and TV</option>

              </select>
            </div>
            <div className="filter__section">
              <label htmlFor="sort">Select sort type:</label>
              <select
                id="sort"
                name="sort"
                onChange={e => onFilterChange(e)}
                defaultValue={filterOptions.sort}
              >
                <option value="viral">Viral</option>
                <option value="top">Top</option>
                <option value="time">Time</option>
              </select>
            </div>
            {topSelected && (
              <div className="filter__section">
                <label htmlFor="section">Select time range:</label>
                <select
                  id="window"
                  name="window"
                  onChange={e => onFilterChange(e)}
                  defaultValue={filterOptions.window}
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                  <option value="all">All</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
