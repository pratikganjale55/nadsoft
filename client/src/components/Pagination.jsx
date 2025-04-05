import React from "react";

const Pagination = ({ page, setPage, limit, setLimit, totalStudents,allData }) => {
    const totalPages = Math.ceil(totalStudents / limit);
  
    return (
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center">
        <label className="me-2">Limit:</label>
        <input
          type="number"
          className="form-control w-auto"
          value={limit}
          onChange={(e) => {
            const newLimit = Number(e.target.value);
            if (newLimit > 0) {
              setLimit(newLimit);
            }
          }}
        //   min="1"
        />
      </div>
      <div className="d-flex align-items-center">
        <button className="btn btn-primary me-2" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span>Page {page} of {allData?.total_pages}</span>
        <button className="btn btn-primary ms-2" onClick={() => setPage(page + 1)} disabled={page >= totalPages}>Next</button>
      </div>
      </div>
    );
  };
  
  export default Pagination;