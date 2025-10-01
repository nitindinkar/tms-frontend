import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const TIDListing = ({ setShowGenerateModal }) => {
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportPeriod, setReportPeriod] = useState("today");

  const tableData = [
    { tid: '123456789010', name: 'Bhagirath Prajapat', mobile: '9876543210', age: 38, status: 'Active' },
    { tid: '123456789011', name: 'Rahul chauhan', mobile: '9876543211', age: 40, status: 'Active' },
    { tid: '123456789012', name: 'Ravindra Kumar', mobile: '9876543212', age: 52, status: 'Pending' },
    { tid: '123456789013', name: 'Shanti Kumari', mobile: '9876543213', age: 38, status: 'Active' },
    { tid: '123456789014', name: 'Bhagirath Prajapat', mobile: '9876543210', age: 38, status: 'Active' },
  ];

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const paginatedData = tableData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="card">
      
      <div className="card-header px-3">
        <div className="search-container">
        <h4 className="mb-3">Beneficiary TID Details</h4>
        <div className="row">
          <div className="col-md-8">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search by TID, Name, Mobile Number..." />
              <button className="btn btn-success" type="button">
                <i className="bi bi-search"></i> Search
              </button>
            </div>
          </div>
          <div className="col-md-4 text-md-end">
            <button 
              className="btn btn-success" 
              onClick={() => setShowGenerateModal(true)}
            >
              <i className="bi bi-plus-circle"></i> Generate New TID
            </button>
          </div>
        </div>
      </div>

      </div>
      <div className="card-body">
      {/* Report Download Section - Moved inside the card */}
      <div className="report-download">
        <div className="report-options">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="reportPeriod"
              id="today"
              value="today"
              checked={reportPeriod === "today"}
              onChange={(e) => setReportPeriod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="today">
              Today
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="reportPeriod"
              id="yesterday"
              value="yesterday"
              checked={reportPeriod === "yesterday"}
              onChange={(e) => setReportPeriod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="yesterday">
              Yesterday
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="reportPeriod"
              id="last7days"
              value="last7days"
              checked={reportPeriod === "last7days"}
              onChange={(e) => setReportPeriod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="last7days">
              Last 07 days
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="reportPeriod"
              id="last30days"
              value="last30days"
              checked={reportPeriod === "last30days"}
              onChange={(e) => setReportPeriod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="last30days">
              Last 30 days
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="reportPeriod"
              id="all"
              value="all"
              checked={reportPeriod === "all"}
              onChange={(e) => setReportPeriod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="all">
              All
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="reportPeriod"
              id="datewise"
              value="datewise"
              checked={reportPeriod === "datewise"}
              onChange={(e) => setReportPeriod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="datewise">
              Date Wise
            </label>
          </div>

          <button
            className="btn btn-success download-btn"
            id="downloadReportBtn"
            onClick={() => console.log("Download report for:", reportPeriod)}
          >
            <i className="bi bi-download" /> Download Report
          </button>
        </div>
      </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="select-all" />
                  </div>
                </th>
                <th>Beneficiary TID</th>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Age (in Yrs.)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr key={index}>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox"/>
                    </div>
                  </td>
                  <td>{row.tid}</td>
                  <td>{row.name}</td>
                  <td>{row.mobile}</td>
                  <td>{row.age}</td>
                  <td>
                    <span className={`badge ${row.status === 'Active' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-success">
                      <i className="bi bi-arrow-right"></i> Pre Authorization
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="table-footer">
          <nav aria-label="Page navigation" className="d-flex align-items-center">
            <ul className="pagination mb-0 me-3">
              <li className="page-item disabled">
                <a className="page-link" href="#">Previous</a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">4</a></li>
              <li className="page-item"><a className="page-link" href="#">5</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
            
            <div className="d-flex align-items-center">
              <span className="me-2">Show</span>
              <select 
                className="form-select form-select-sm" 
                id="recordsPerPage" 
                style={{width: 'auto'}}
                value={recordsPerPage}
                onChange={handleRecordsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className="ms-2">entries</span>
            </div>
          </nav>
          <p className="text-muted mb-0">Showing {paginatedData.length} of {tableData.length} TIDS</p>
        </div>
      </div>
    </div>




  );
};

export default TIDListing;