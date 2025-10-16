import React, { useState, useMemo } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PreAuthDecisionModal from './PreAuthDecisionModal';

const PreAuthTIDListingForDecision = ({ setShowGenerateModal }) => {
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [showPreAuthDecisionModal, setShowPreAuthDecisionModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [emergencyFilter, setEmergencyFilter] = useState(false);
    const [twoHoursPackageFilter, setTwoHoursPackageFilter] = useState(false);
    const [districtFilter, setDistrictFilter] = useState('');
  
    // ✅ Updated table data with proper column names and additional fields for filtering
    const tableData = [
      { tid: 'T1005252471262', district: 'Jaipur', hospitalCode: 'HOSP001', hospitalName: 'Jaipur General Hospital', patientName: 'Sachin Kumar', consumedTime: '2 days', isEmergency: true, hasTwoHoursPackage: false },
      { tid: 'T1305252471261', district: 'Udaipur', hospitalCode: 'HOSP002', hospitalName: 'Udaipur Medical Center', patientName: 'Sachin Kumar', consumedTime: '1 day', isEmergency: false, hasTwoHoursPackage: true },
      { tid: 'T0620242677592', district: 'Jodhpur', hospitalCode: 'HOSP003', hospitalName: 'Jodhpur City Hospital', patientName: 'Ashutosh', consumedTime: '3 days', isEmergency: true, hasTwoHoursPackage: false },
      { tid: 'T0205242677599', district: 'Kota', hospitalCode: 'HOSP004', hospitalName: 'Kota Speciality Hospital', patientName: 'Ashutosh', consumedTime: '5 hours', isEmergency: false, hasTwoHoursPackage: true },
      { tid: 'T0102232467150', district: 'Jaipur', hospitalCode: 'HOSP005', hospitalName: 'Jaipur Health Care', patientName: 'Jitendra Kumar Jangir', consumedTime: '1 day', isEmergency: true, hasTwoHoursPackage: false },
      { tid: 'T0102232467159', district: 'Ajmer', hospitalCode: 'HOSP006', hospitalName: 'Ajmer Medical Institute', patientName: 'Navneet Kishore Verma', consumedTime: '4 days', isEmergency: false, hasTwoHoursPackage: false },
      { tid: 'T1403242673795', district: 'Bikaner', hospitalCode: 'HOSP007', hospitalName: 'Bikaner General Hospital', patientName: 'Norat Sharma', consumedTime: '2 days', isEmergency: true, hasTwoHoursPackage: true },
      { tid: 'T1403242673782', district: 'Jhunjhunu', hospitalCode: 'HOSP008', hospitalName: 'Jhunjhunu Health Center', patientName: 'Norat Sharma', consumedTime: '6 hours', isEmergency: false, hasTwoHoursPackage: true },
      { tid: 'T1403242673779', district: 'Alwar', hospitalCode: 'HOSP009', hospitalName: 'Alwar City Hospital', patientName: 'Norat Sharma', consumedTime: '1 day', isEmergency: true, hasTwoHoursPackage: false },
      { tid: 'T2307232463736', district: 'Jaipur', hospitalCode: 'HOSP010', hospitalName: 'Jaipur Super Speciality', patientName: 'Jitendra Kumar Jangir', consumedTime: '3 days', isEmergency: false, hasTwoHoursPackage: false },
      { tid: 'T2407232463735', district: 'Udaipur', hospitalCode: 'HOSP011', hospitalName: 'Udaipur General Hospital', patientName: 'Yogesh Sharma', consumedTime: '2 days', isEmergency: true, hasTwoHoursPackage: true },
      { tid: 'T2407232464165', district: 'Jodhpur', hospitalCode: 'HOSP012', hospitalName: 'Jodhpur Medical Center', patientName: 'Yogesh Sharma', consumedTime: '1 day', isEmergency: false, hasTwoHoursPackage: false },
      { tid: 'T0204232467415', district: 'Kota', hospitalCode: 'HOSP013', hospitalName: 'Kota General Hospital', patientName: 'Jitendra Kumar Jangir', consumedTime: '4 days', isEmergency: true, hasTwoHoursPackage: true },
      { tid: 'T0204232467416', district: 'Jaipur', hospitalCode: 'HOSP014', hospitalName: 'Jaipur Medical Institute', patientName: 'Teema Bai Jangid', consumedTime: '2 days', isEmergency: false, hasTwoHoursPackage: false },
      { tid: 'T0105232467510', district: 'Ajmer', hospitalCode: 'HOSP015', hospitalName: 'Ajmer City Hospital', patientName: 'Vikram Dhaka', consumedTime: '1 day', isEmergency: true, hasTwoHoursPackage: true },
      { tid: 'T0905232467425', district: 'Bikaner', hospitalCode: 'HOSP016', hospitalName: 'Bikaner Health Care', patientName: 'bv', consumedTime: '5 hours', isEmergency: false, hasTwoHoursPackage: false }
    ];

    // ✅ Get unique districts for filter dropdown
    const districts = useMemo(() => {
        const uniqueDistricts = [...new Set(tableData.map(item => item.district))];
        return uniqueDistricts.sort();
    }, [tableData]);
  
    // ✅ Optimized sorting and filtering function with useMemo
    const sortedData = useMemo(() => {
        let filteredData = tableData;

        // Apply search filter
        if (searchTerm) {
            filteredData = filteredData.filter(item =>
                item.tid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.district.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply emergency filter
        if (emergencyFilter) {
            filteredData = filteredData.filter(item => item.isEmergency);
        }

        // Apply two hours package filter
        if (twoHoursPackageFilter) {
            filteredData = filteredData.filter(item => item.hasTwoHoursPackage);
        }

        // Apply district filter
        if (districtFilter) {
            filteredData = filteredData.filter(item => item.district === districtFilter);
        }

        // Apply sorting
        if (!sortConfig.key) return filteredData;
        
        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            
            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [tableData, sortConfig, searchTerm, emergencyFilter, twoHoursPackageFilter, districtFilter]);
  
    const handleSort = (key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };
  
    const handleRecordsPerPageChange = (e) => {
        setRecordsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };
  
    // ✅ Open Modal with selected patient
    const handlePreAuthClick = (patient) => {
        setSelectedPatient(patient);
        setShowPreAuthDecisionModal(true);
    };
  
    // ✅ Pagination calculations
    const totalPages = Math.ceil(sortedData.length / recordsPerPage);
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
  
    // ✅ Handle pagination navigation
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // ✅ Calculate serial number based on current page
    const getSerialNumber = (index) => {
        return (currentPage - 1) * recordsPerPage + index + 1;
    };

    // ✅ Clear all filters
    const clearFilters = () => {
        setSearchTerm('');
        setEmergencyFilter(false);
        setTwoHoursPackageFilter(false);
        setDistrictFilter('');
        setCurrentPage(1);
    };
  
    return (
        <div className="card">
            <div className="card-header px-3">
                <div className="search-container">
                    <div className="row align-items-center">
                        <div className="col-md-8 mb-3">
                            <h4 className="mb-0">Pre-Auth Approval Pending TID's</h4>
                        </div>
                        
                        {/* Search and Filters Row */}
                        <div className="col-md-12">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                {/* Left: Short Search Box */}
                                <div className="flex-grow-1" style={{ maxWidth: '400px' }}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by TID, Name..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button className="btn btn-success" type="button">
                                            <i className="bi bi-search" /> Search
                                        </button>
                                    </div>
                                </div>

                                {/* Right: All Filters */}
                                <div className="d-flex flex-wrap align-items-center gap-3">
                                    {/* Filters Header with Icon */}
                                    <div className="d-flex align-items-center fw-bold">
                                        <i className="bi bi-funnel me-1"></i>
                                        Filters:
                                    </div>

                                    {/* Emergency Filter */}
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="emergencyFilter"
                                            checked={emergencyFilter}
                                            onChange={(e) => setEmergencyFilter(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="emergencyFilter">
                                            TIDs for Emergency
                                        </label>
                                    </div>

                                    {/* Two Hours Package Filter */}
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="twoHoursFilter"
                                            checked={twoHoursPackageFilter}
                                            onChange={(e) => setTwoHoursPackageFilter(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="twoHoursFilter">
                                            TIDs with Two Hours Package
                                        </label>
                                    </div>

                                    {/* District Filter */}
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="fw-bold">District:</span>
                                        <select
                                            className="form-select form-select-sm"
                                            value={districtFilter}
                                            onChange={(e) => setDistrictFilter(e.target.value)}
                                            style={{ minWidth: '150px' }}
                                        >
                                            <option value="">All Districts</option>
                                            {districts.map(district => (
                                                <option key={district} value={district}>
                                                    {district}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Clear Filters Button */}
                                    {(searchTerm || emergencyFilter || twoHoursPackageFilter || districtFilter) && (
                                        <button 
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={clearFilters}
                                        >
                                            <i className="bi bi-x-circle"></i> Clear
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th 
                                    onClick={() => handleSort('tid')}
                                    style={{ cursor: 'pointer' }}
                                    className="sortable-header"
                                >
                                    TID {getSortIcon('tid')}
                                </th>
                                <th 
                                    onClick={() => handleSort('district')}
                                    style={{ cursor: 'pointer' }}
                                    className="sortable-header"
                                >
                                    District {getSortIcon('district')}
                                </th>
                                <th 
                                    onClick={() => handleSort('hospitalCode')}
                                    style={{ cursor: 'pointer' }}
                                    className="sortable-header"
                                >
                                    Hospital Code {getSortIcon('hospitalCode')}
                                </th>
                                <th 
                                    onClick={() => handleSort('hospitalName')}
                                    style={{ cursor: 'pointer' }}
                                    className="sortable-header"
                                >
                                    Hospital Name {getSortIcon('hospitalName')}
                                </th>
                                <th 
                                    onClick={() => handleSort('patientName')}
                                    style={{ cursor: 'pointer' }}
                                    className="sortable-header"
                                >
                                    Patient Name {getSortIcon('patientName')}
                                </th>
                                <th 
                                    onClick={() => handleSort('consumedTime')}
                                    style={{ cursor: 'pointer' }}
                                    className="sortable-header"
                                >
                                    Consumed Time {getSortIcon('consumedTime')}
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((row, index) => (
                                <tr key={row.tid}>
                                    <td>{getSerialNumber(index)}</td>
                                    <td>{row.tid}</td>
                                    <td>{row.district}</td>
                                    <td>{row.hospitalCode}</td>
                                    <td>{row.hospitalName}</td>
                                    <td>{row.patientName}</td>
                                    <td>{row.consumedTime}</td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-success" 
                                            onClick={() => handlePreAuthClick(row)}
                                        >
                                            <i className="bi bi-arrow-right" /> Pre-Auth Decision
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
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li 
                                    key={index + 1} 
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                >
                                    <button 
                                        className="page-link" 
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
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
                        Showing {((currentPage - 1) * recordsPerPage) + 1} to {Math.min(currentPage * recordsPerPage, sortedData.length)} of {sortedData.length} entries
                    </p>
                </div>
    
                {/* PreAuth Modal */}
                <PreAuthDecisionModal
                    show={showPreAuthDecisionModal}
                    handleClose={() => setShowPreAuthDecisionModal(false)}
                    patient={selectedPatient}
                />
            </div>
        </div>
    );
}

export default PreAuthTIDListingForDecision;