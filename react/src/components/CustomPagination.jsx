import React from 'react';

const CustomPagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="pagination" style={{ display: "flex", justifyContent: "flex-end", margin: "1.5rem", borderTop: "solid grey 1px", padding: "1.1rem" }}>
        <button className='paginationButton' onClick={() => handlePageChange(currentPage - 1)} style={{ backgroundColor: currentPage !== 1 ? "lightgreen" : "lightgrey" }} disabled={currentPage === 1}>
            Previous
        </button>
        <span>{currentPage} of {totalPages}</span>
        <button className='paginationButton' onClick={() => handlePageChange(currentPage + 1)} style={{ backgroundColor: currentPage !== totalPages ? "lightgreen" : "lightgrey" }} disabled={currentPage === totalPages}>
            Next
        </button>
    </div>

  );
};

export default CustomPagination;