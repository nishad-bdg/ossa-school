import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { ListingCard, NamedLink, PaginationLinks } from '../../components';
import css from './SearchResultsPanel.module.css';
import {stringify} from "../../util/urlHelpers";

const SearchResultsPanel = props => {
  const { className, rootClassName, listings, pagination, search, setActiveListing } = props;
  const classes = classNames(rootClassName || css.root, className);
  const [pageNo, setPageNo] = useState(1);

  const handleSeeMore = () => {
     setPageNo(pageNo+1);
  };

  const paginationLinks =
    pagination && pagination.totalPages > 1 ? (
      <PaginationLinks
        className={css.pagination}
        pageName="SearchPage"
        pageSearchParams={search}
        pagination={pagination}
      />
    ) : null;

  const seeMoreButtons =
    pagination && pagination.totalPages > 1 ? (
      <NamedLink
        key={pagination.page+pageNo}
        name="SearchPage"
        params={search}
        to={{ search: stringify({ ...search, page: (pagination.page+pageNo) }) }}
      >
         <button className={css.seeMore_btn} onClick={handleSeeMore} type="button">See More</button>
      </NamedLink>
      ) : null;

  // Panel width relative to the viewport
  const panelMediumWidth = 50;
  const panelLargeWidth = 62.5;
  const cardRenderSizes = [
    '(max-width: 767px) 100vw',
    `(max-width: 1023px) ${panelMediumWidth}vw`,
    `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
    `${panelLargeWidth / 3}vw`,
  ].join(', ');

  return (
    <div className={classes}>
      <div className={css.listingCards}>
        {listings.map(l => (
          <ListingCard
            className={css.listingCard}
            key={l.id.uuid}
            listing={l}
            renderSizes={cardRenderSizes}
            setActiveListing={setActiveListing}
          />
        ))}
        {props.children}
          <div className={css.seeMore_btn_div}>
              {seeMoreButtons}
              {/*<button className={css.seeMore_btn} onClick={handleChangeSliceData} type="button">See More</button>*/}
          </div>
      </div>
      {/* {paginationLinks} */}
    </div>
  );
};

SearchResultsPanel.defaultProps = {
  children: null,
  className: null,
  listings: [],
  pagination: null,
  rootClassName: null,
  search: null,
};

const { array, node, object, string } = PropTypes;

SearchResultsPanel.propTypes = {
  children: node,
  className: string,
  listings: array,
  pagination: propTypes.pagination,
  rootClassName: string,
  search: object,
};

export default SearchResultsPanel;
