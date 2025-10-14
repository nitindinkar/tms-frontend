import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PreAuthFormModal from './PreAuthFormModal';

const TIDListingForPreAuth = ({ setShowGenerateModal }) => {
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPreAuthModal, setShowPreAuthModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // ✅ Actual table data from screenshot
  const tableData = [
    { tid: 'T1005252471262', name: 'Sachin Kumar', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-09-28 13:14:26.0' },
    { tid: 'T1305252471261', name: 'Sachin Kumar', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-09-28 13:14:26.0' },
    { tid: 'T0620242677592', name: 'Ashutosh', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-09-28 11:44:46.0' },
    { tid: 'T0205242677599', name: 'Ashutosh', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-09-28 11:47:52.0' },
    { tid: 'T0102232467150', name: 'Jitendra Kumar Jangir', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-02-01 16:11:03.0' },
    { tid: 'T0102232467159', name: 'Navneet Kishore Verma', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-02-01 16:18:40.0' },
    { tid: 'T1403242673795', name: 'Norat Sharma', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-03-14 18:08:01.0' },
    { tid: 'T1403242673782', name: 'Norat Sharma', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-03-14 18:18:27.0' },
    { tid: 'T1403242673779', name: 'Norat Sharma', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-03-14 18:27:29.0' },
    { tid: 'T2307232463736', name: 'Jitendra Kumar Jangir', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-07-23 17:25:42.0' },
    { tid: 'T2407232463735', name: 'Yogesh Sharma', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-07-24 11:23:47.0' },
    { tid: 'T2407232464165', name: 'Yogesh Sharma', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-07-24 11:24:09.0' },
    { tid: 'T0204232467415', name: 'Jitendra Kumar Jangir', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-04-02 16:13:20.0' },
    { tid: 'T0204232467416', name: 'Teema Bai Jangid', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-04-04 16:12:09.0' },
    { tid: 'T0105232467510', name: 'Vikram Dhaka', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-05-01 15:43:54.0' },
    { tid: 'T0905232467425', name: 'bv', admissionType: 'Normal', identityType: 'Bhamashah', enrollmentDate: '2023-05-09 12:10:53.0' }
  ];

  // ✅ Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // ✅ Get sorted data
  const getSortedData = () => {
    if (!sortConfig.key) return tableData;

    const sortedData = [...tableData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortedData;
  };

  const sortedData = getSortedData();

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // ✅ Open Modal with selected patient
  const handlePreAuthClick = (patient) => {
    setSelectedPatient(patient);
    setShowPreAuthModal(true);
  };

  const paginatedData = sortedData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // ✅ Get sort icon based on current sort state
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <i className="bi bi-arrow-down-up sort-icon" />;
    }
    return sortConfig.direction === 'asc' 
      ? <i className="bi bi-arrow-up sort-icon" />
      : <i className="bi bi-arrow-down sort-icon" />;
  };

  return (
    <div className="card">
      <div className="card-header px-3">
        {/* Search Box */}
        <div className="search-container">
          <div className="row">
            <div className="col-md-8 mb-3">
              {/* <h4 className="mb-0">Beneficiary TID's Pending For Pre-Auth Raised</h4> */}
            </div>
            <div className="col-md-8">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by TID, Name..."
                />
                <button className="btn btn-success" type="button">
                  <i className="bi bi-search" /> Search
                </button>
              </div>
            </div>
            <div className="col-md-4 text-md-end">
              {/* <button className="btn btn-success" onClick={handleGenerateTidClick}>
                <i className="bi bi-plus-circle" /> Generate New TID
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        {/* Report Download Section */}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="select-all" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('tid')}
                  style={{ cursor: 'pointer' }}
                  className="sortable-header"
                >
                  Beneficiary TID {getSortIcon('tid')}
                </th>
                <th 
                  onClick={() => handleSort('name')}
                  style={{ cursor: 'pointer' }}
                  className="sortable-header"
                >
                  Name {getSortIcon('name')}
                </th>
                <th 
                  onClick={() => handleSort('admissionType')}
                  style={{ cursor: 'pointer' }}
                  className="sortable-header"
                >
                  Admission Type {getSortIcon('admissionType')}
                </th>
                <th 
                  onClick={() => handleSort('identityType')}
                  style={{ cursor: 'pointer' }}
                  className="sortable-header"
                >
                  Identity Type {getSortIcon('identityType')}
                </th>
                <th 
                  onClick={() => handleSort('enrollmentDate')}
                  style={{ cursor: 'pointer' }}
                  className="sortable-header"
                >
                  Enrollment Date {getSortIcon('enrollmentDate')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr key={index}>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  <td>{row.tid}</td>
                  <td>{row.name}</td>
                  <td>{row.admissionType}</td>
                  <td>{row.identityType}</td>
                  <td>{row.enrollmentDate}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-success" 
                      onClick={() => handlePreAuthClick(row)}
                    >
                      <i className="bi bi-arrow-right" /> Pre Authorization
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="table-footer">
          <nav aria-label="Page navigation" className="d-flex align-items-center">
            <ul className="pagination mb-0 me-3">
              <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Next</a></li>
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
            Showing {((currentPage - 1) * recordsPerPage) + 1} to {Math.min(currentPage * recordsPerPage, sortedData.length)} of {sortedData.length} entries
          </p>
        </div>

        {/* ✅ PreAuth Modal */}
        <PreAuthFormModal
          show={showPreAuthModal}
          handleClose={() => setShowPreAuthModal(false)}
          patient={selectedPatient}
        />
      </div>
    </div>
  );
};

export default TIDListingForPreAuth;