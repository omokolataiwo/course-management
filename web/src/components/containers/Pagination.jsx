import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Pagination = ({
  totalItem, pageSize, currentPage, onClick
}) => {
  const chunkSize = Math.ceil(totalItem / pageSize);

  return (
    <nav aria-label="...">
      <ul className="pagination">
        {new Array(chunkSize).fill(null).map((array, index) => {
          const pageNumber = index + 1;
          const activePage = +currentPage === pageNumber ? 'active' : null;

          return (
            <li className={`${activePage} page-item`}>
              <Link
                key={pageNumber}
                to={`/course/${pageNumber}`}
                onClick={() => onClick(pageNumber)}
                className="page-link"
              >
                {pageNumber}
                <span className="sr-only">(current)</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalItem: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Pagination;
