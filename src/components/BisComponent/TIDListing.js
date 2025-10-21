import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReportDownload from "./reportDownload";

const TIDListing = ({ setShowGenerateModal }) => {
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const tableData = [
    {
      tid: "T123456789010",
      name: "Bhagirath Prajapat",
      mobile: "9876543210",
      age: 38,
      status: "Active",
    },
    {
      tid: "T123456789011",
      name: "Rahul chauhan",
      mobile: "9876543211",
      age: 40,
      status: "Active",
    },
    {
      tid: "T123456789012",
      name: "Ravindra Kumar",
      mobile: "9876543212",
      age: 52,
      status: "Pending",
    },
    {
      tid: "T123456789013",
      name: "Shanti Kumari",
      mobile: "9876543213",
      age: 38,
      status: "Active",
    },
    {
      tid: "T123456789014",
      name: "Bhagirath Prajapat",
      mobile: "9876543210",
      age: 38,
      status: "Active",
    },
  ];

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleGenerateTidClick = () => {
    setShowGenerateModal(true);
  };

  const paginatedData = tableData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="card">
      <div className="card-header px-3">
        {/* Search Box */}
        <div className="search-container">
          <div className="row">
            <div className="col-md-8 mb-3">
              <h4 className="mb-0">
                Beneficiary TID's Pending For Pre-Auth Raised
              </h4>
            </div>
            <div className="col-md-8">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by TID, Name, Mobile Number..."
                />
                <button className="btn btn-success" type="button">
                  <i className="bi bi-search" /> Search
                </button>
              </div>
            </div>
            <div className="col-md-4 text-md-end mt-md-0 mt-2">
              <button
                className="btn btn-success"
                onClick={handleGenerateTidClick}
              >
                <i className="bi bi-plus-circle" /> Generate New TID
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        {/* Report Download Section - Moved inside the card */}
        <ReportDownload />
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>SNo.</th>
                <th data-sort="tid">
                  Beneficiary TID{" "}
                  <i className="bi bi-arrow-down-up sort-icon" />
                </th>
                <th data-sort="name">
                  Name <i className="bi bi-arrow-down-up sort-icon" />
                </th>
                <th data-sort="mobile">
                  Mobile Number <i className="bi bi-arrow-down-up sort-icon" />
                </th>
                <th data-sort="age">
                  Age (in Yrs.) <i className="bi bi-arrow-down-up sort-icon" />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.tid}</td>
                  <td>{row.name}</td>
                  <td>{row.mobile}</td>
                  <td>{row.age}</td>
                  <td>
                    <button className="btn btn-sm btn-success">
                      <i className="bi bi-arrow-right" /> Pre Authorization
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Table Footer with Pagination and Records Per Page Dropdown */}
        <div className="table-footer">
          <nav
            aria-label="Page navigation"
            className="d-flex align-items-center"
          >
            <ul className="pagination mb-0 me-3">
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
            <div className="d-flex align-items-center justify-content-center">
              <span className="me-2">Show</span>
              <select
                className="form-select form-select-sm"
                value={recordsPerPage}
                onChange={handleRecordsPerPageChange}
                style={{ width: "auto" }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="ms-2">entries</span>
            </div>
          </nav>
          <p className="text-muted mb-0">
            Showing {(currentPage - 1) * recordsPerPage + 1} to{" "}
            {Math.min(currentPage * recordsPerPage, tableData.length)} of{" "}
            {tableData.length} entries
          </p>
        </div>
      </div>
    </div>
  );
};

export default TIDListing;
