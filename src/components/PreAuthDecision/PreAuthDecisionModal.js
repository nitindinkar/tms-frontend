import React, { useState, useEffect } from "react";
import { Modal, Table, Form, Button, Row, Col, Dropdown, Card } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import Swal from "sweetalert2";

const PreAuthDecisionModal = ({ show, handleClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Define initial form data based on screenshots
  const initialFormData = {
    // Step 1 - Patient Details (from screenshot 12.jpg)
    patientName: "",
    patientNameHindi: "",
    admissionNo: "",
    beneficiaryEnrollNo: "",
    registeredMobNo: "",
    rtaFlag: "No",
    
    // Contact Details of Patient
    mobileNo: "",
    houseNo: "",
    rationCard: "",
    creationDate: "",
    colonyStreet: "",
    gramPanchayat: "",
    tehsil: "",
    state: "Rajasthan",
    blockWard: "",
    village: "",
    district: "",
    pinCode: "",
    
    // Verification fields
    verifiedBy: "",
    policyYear: "",
    administrativeError: false,
    itServicesFailure: false,
    
    // Hospital Details (from screenshot 10.jpg)
    hospitalCode: "",
    hospitalName: "",
    hospitalAddress: "",
    doctorName: "",
    
    // Step 2 - Package Details (from screenshots 10.jpg and 11.jpg)
    selectedPackages: [],
    
    // Step 3 - Documents & Previous History (from screenshots 10.jpg and 13.jpg)
    documents: [],
    finalRemarks: ""
  };

  const [formData, setFormData] = useState(initialFormData);

  // Mock data for packages based on screenshot 11.jpg
  const [packages, setPackages] = useState([]);

  // Document upload states
  const [documentData, setDocumentData] = useState({
    documentType: "",
    file: null,
    remarks: ""
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!show) {
      setCurrentStep(1);
      setFormData(initialFormData);
      setDocumentData({
        documentType: "",
        file: null,
        remarks: ""
      });
    } else {
      // Load mock data when modal opens
      loadMockData();
    }
  }, [show]);

  // Mock data for hospitals
  const hospitals = [
    "AIIMS Jodhpur",
    "SMS Hospital Jaipur",
    "JLN Hospital Ajmer",
    "Mahatma Gandhi Hospital",
    "Rajasthan Hospital"
  ];

  // Mock data for doctors
  const doctors = [
    "Dr. AMIT GOENKA",
    "Dr. GAURAV SHARMA", 
    "Dr. MANINDER PAL KOCH",
    "DR. RAPREET SONI",
    "DR. RAHUL PATNI"
  ];

  // Document types
  const documentTypes = [
    "Admission Note",
    "Investigation Reports", 
    "Previous Treatment History",
    "ID Proof",
    "Address Proof",
    "Medical Certificate"
  ];

  // Load mock data based on screenshots
  const loadMockData = () => {
    // Mock package data from screenshot 11.jpg
    const mockPackages = [
      { 
        id: 1, 
        code: "1555-ST011AM-00", 
        name: "Conservative management: management of Quest / Addromer/ Showroom Redefined translation and investigations included", 
        category: "Secondary", 
        rate: 342960, 
        bookedAmount: 342960, 
        status: "Pending",
        action: "",
        prescribingDoctor: "DOC Q&TXT PolyPhv4jph",
        remarks: "MC20402400203402040204862048042040204060204202",
      }
    ];

    setPackages(mockPackages);
    
    // Set some initial form data
    setFormData(prev => ({
      ...prev,
      selectedPackages: mockPackages,
      balanceSecondary: 342960,
      balanceTertiary: 0
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePackageAction = (index, action) => {
    const updatedPackages = [...formData.selectedPackages];
    updatedPackages[index].status = action;
    updatedPackages[index].action = action;
    
    setFormData(prev => ({
      ...prev,
      selectedPackages: updatedPackages
    }));
  };

  const updatePackageField = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      selectedPackages: prev.selectedPackages.map((pkg, i) => 
        i === index ? { ...pkg, [field]: value } : pkg
      )
    }));
  };

  // Get badge color based on status
  const getBadgeColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'danger';
      case 'Query':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  // Handle document upload
  const handleDocumentUpload = () => {
    if (!documentData.documentType || !documentData.file) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please select document type and choose a file',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    // Check file type and size
    if (documentData.file.type !== 'application/pdf') {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File Type',
        text: 'Please select a PDF file',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    if (documentData.file.size > 500 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'File size must be less than 500 KB',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    const newDocument = {
      id: Date.now(),
      type: documentData.documentType,
      fileName: documentData.file.name,
      file: documentData.file,
      status: "Uploaded",
      remarks: documentData.remarks,
      uploadDate: new Date().toLocaleString()
    };

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, newDocument]
    }));

    // Reset form
    setDocumentData({
      documentType: "",
      file: null,
      remarks: ""
    });

    // Reset file input
    const fileInput = document.getElementById('documentFile');
    if (fileInput) fileInput.value = '';

    Swal.fire({
      icon: 'success',
      title: 'Document Uploaded!',
      text: 'Document has been uploaded successfully',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Validate before submit
    if (formData.selectedPackages.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Package Required',
        text: 'Please add at least one package before submitting',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    // Validate and submit form data
    Swal.fire({
      icon: 'success',
      title: 'Pre-Authorization Submitted!',
      text: 'Your pre-authorization request has been submitted successfully.',
      timer: 2000,
      showConfirmButton: false
    });
    
    // Reset form and close modal
    handleClose();
  };

  // Steps definition
  const steps = [
    { number: 1, label: "Patient & Hospital Details", actualStep: 1 },
    { number: 2, label: "Wallet & Package Details", actualStep: 2 },
    { number: 3, label: "Documents & History", actualStep: 3 }
  ];

  // Mock data for previous hospitalization (from screenshot 10.jpg and 13.jpg)
  const previousHospitalizations = [];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      className="animate__animated animate__fadeInDown animate__faster"
      centered
      scrollable
      backdrop="static"
      style={{ maxWidth: '95vw' }}
    >
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>Pre Authorization Decision</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        {/* Step Indicator */}
        <div className="step-indicator mb-4">
          {steps.map((step) => (
            <div
              key={step.actualStep}
              className={`step ${
                currentStep === step.actualStep ? "active" : ""
              } ${currentStep > step.actualStep ? "completed" : ""}`}
            >
              <div className="step-icon">{step.number}</div>
              <div className="step-label">{step.label}</div>
            </div>
          ))}
        </div>

        {/* Step 1: Patient & Hospital Details */}
        {currentStep === 1 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading mb-4">Patient & Hospital Information</h4>
            
            {/* Patient Details - Combined from Patient Details and Contact Details */}
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h6 className="mb-0">Patient Details</h6>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Patient Name (in English):</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.patientName}
                        onChange={(e) => handleInputChange('patientName', e.target.value)}
                        placeholder="Enter patient name in English"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Patient Name (in Hindi):</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.patientNameHindi}
                        onChange={(e) => handleInputChange('patientNameHindi', e.target.value)}
                        placeholder="रोगी का नाम हिंदी में"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Admission No:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.admissionNo}
                        onChange={(e) => handleInputChange('admissionNo', e.target.value)}
                        placeholder="Enter admission number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Beneficiary Enroll No:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.beneficiaryEnrollNo}
                        onChange={(e) => handleInputChange('beneficiaryEnrollNo', e.target.value)}
                        placeholder="Enter beneficiary enrollment number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Registered Mob No:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.registeredMobNo}
                        onChange={(e) => handleInputChange('registeredMobNo', e.target.value)}
                        placeholder="Enter mobile number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>RTA Flag:</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          type="radio"
                          label="Yes"
                          name="rtaFlag"
                          checked={formData.rtaFlag === "Yes"}
                          onChange={() => handleInputChange('rtaFlag', "Yes")}
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="No"
                          name="rtaFlag"
                          checked={formData.rtaFlag === "No"}
                          onChange={() => handleInputChange('rtaFlag', "No")}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Separator for Contact Details */}
                <h6 className="mb-3">Contact Details of Patient</h6>
                
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile No:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.mobileNo}
                        onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                        placeholder="Enter mobile number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>House No:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.houseNo}
                        onChange={(e) => handleInputChange('houseNo', e.target.value)}
                        placeholder="Enter house number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ration Card:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.rationCard}
                        onChange={(e) => handleInputChange('rationCard', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Creation Date:</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.creationDate}
                        onChange={(e) => handleInputChange('creationDate', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Colony/Street:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.colonyStreet}
                        onChange={(e) => handleInputChange('colonyStreet', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gram Panchayat:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.gramPanchayat}
                        onChange={(e) => handleInputChange('gramPanchayat', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tehsil:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.tehsil}
                        onChange={(e) => handleInputChange('tehsil', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>State:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Block/Ward:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.blockWard}
                        onChange={(e) => handleInputChange('blockWard', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Village:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.village}
                        onChange={(e) => handleInputChange('village', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>District:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pin Code:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.pinCode}
                        onChange={(e) => handleInputChange('pinCode', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>                
                <Row>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Verified By:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.verifiedBy}
                        onChange={(e) => handleInputChange('verifiedBy', e.target.value)}
                        placeholder="Enter verified by"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Policy Year:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.policyYear}
                        onChange={(e) => handleInputChange('policyYear', e.target.value)}
                        placeholder="Enter policy year"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Administrative Error"
                        checked={formData.administrativeError}
                        onChange={() => handleCheckboxChange('administrativeError')}
                        className="mt-4"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="IT services Failure"
                        checked={formData.itServicesFailure}
                        onChange={() => handleCheckboxChange('itServicesFailure')}
                        className="mt-4"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Hospital Details - All fields in one row */}
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h6 className="mb-0">Details of Hospital</h6>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Hospital Code:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.hospitalCode}
                        onChange={(e) => handleInputChange('hospitalCode', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Hospital Name:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.hospitalName}
                        onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Hospital Address:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.hospitalAddress}
                        onChange={(e) => handleInputChange('hospitalAddress', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Doctor Name:</Form.Label>
                      <Form.Select
                        value={formData.doctorName}
                        onChange={(e) => handleInputChange('doctorName', e.target.value)}
                      >
                        <option value="">Select Doctor</option>
                        {doctors.map(doctor => (
                          <option key={doctor} value={doctor}>{doctor}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Step 2: Package Details */}
        {currentStep === 2 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading mb-4">Wallet & Package Details</h4>
            
            {/* Wallet Details - from screenshot 10.jpg and 11.jpg */}
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h6 className="mb-0">Wallet Details</h6>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Balance in Secondary Package (Rs.):</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.balanceSecondary || 342960}
                        readOnly
                        className="fw-bold text-success"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Balance in Tertiary Package (Rs.):</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.balanceTertiary || 0}
                        readOnly
                        className="fw-bold"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Package Details Table - from screenshot 10.jpg and 11.jpg */}
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h6 className="mb-0">Package Details</h6>
              </Card.Header>
              <Card.Body>
                {formData.selectedPackages.length > 0 ? (
                  <div className="table-responsive" style={{ fontSize: '0.875rem' }}>
                    <Table striped bordered hover>
                      <thead className="table-light">
                        <tr>
                          <th>Package Code</th>
                          <th>Package Name</th>
                          <th>Package Category</th>
                          <th>Package Rate (Rs.)</th>
                          <th>Booked Amt (Rs.)</th>
                          <th>Status</th>
                          <th>Prescribing Doctor</th>
                          <th style={{ minWidth: '120px' }}>Actions</th>
                          <th>Remarks</th>
                          <th>Reason</th>
                          <th>Reply</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.selectedPackages.map((pkg, index) => (
                          <tr key={index}>
                            <td className="text-nowrap">{pkg.code}</td>
                            <td style={{ minWidth: '300px' }}>{pkg.name}</td>
                            <td>{pkg.category}</td>
                            <td className="text-nowrap">₹{pkg.rate?.toLocaleString()}</td>
                            <td className="text-nowrap">₹{pkg.bookedAmount?.toLocaleString()}</td>
                            <td>
                              <Badge bg={getBadgeColor(pkg.status)}>
                                {pkg.status || 'Pending'}
                              </Badge>
                            </td>
                            <td style={{ minWidth: '200px' }}>
                              <Form.Select
                                size="sm"
                                value={pkg.prescribingDoctor || ''}
                                onChange={(e) => updatePackageField(index, 'prescribingDoctor', e.target.value)}
                              >
                                <option value="">Select Doctor</option>
                                {doctors.map(doctor => (
                                  <option key={doctor} value={doctor}>{doctor}</option>
                                ))}
                              </Form.Select>
                            </td>
                            <td>
                              <div className="d-flex flex-column gap-1" style={{ minWidth: '100px' }}>
                                <Button
                                  size="sm"
                                  variant={pkg.action === 'Approved' ? 'success' : 'outline-success'}
                                  onClick={() => handlePackageAction(index, 'Approved')}
                                  className="w-100"
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant={pkg.action === 'Rejected' ? 'danger' : 'outline-danger'}
                                  onClick={() => handlePackageAction(index, 'Rejected')}
                                  className="w-100"
                                >
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  variant={pkg.action === 'Query' ? 'warning' : 'outline-warning'}
                                  onClick={() => handlePackageAction(index, 'Query')}
                                  className="w-100"
                                >
                                  Query
                                </Button>
                              </div>
                            </td>
                            <td style={{ minWidth: '200px' }}>
                              <Form.Control
                                as="textarea"
                                rows={2}
                                size="sm"
                                value={pkg.remarks || ''}
                                onChange={(e) => updatePackageField(index, 'remarks', e.target.value)}
                                placeholder="Enter remarks"
                              />
                            </td>
                            <td style={{ minWidth: '200px' }}>
                              <Form.Control
                                as="textarea"
                                rows={2}
                                size="sm"
                                value={pkg.reason || ''}
                                onChange={(e) => updatePackageField(index, 'reason', e.target.value)}
                                placeholder="Enter reason..."
                              />
                            </td>
                            <td style={{ minWidth: '200px' }}>
                              <Form.Control
                                as="textarea"
                                rows={2}
                                size="sm"
                                value={pkg.reply || ''}
                                onChange={(e) => updatePackageField(index, 'reply', e.target.value)}
                                placeholder="No reply yet"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted">
                    <p>No records found.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Step 3: Documents & History */}
        {currentStep === 3 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading mb-4">Documents & Previous History</h4>
            
            {/* Document Upload Section - from screenshot 13.jpg */}
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h6 className="mb-0">Upload Documents</h6>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={4}>
                    <Form.Label>Document Type:</Form.Label>
                    <Form.Select
                      value={documentData.documentType}
                      onChange={(e) => setDocumentData(prev => ({
                        ...prev,
                        documentType: e.target.value
                      }))}
                    >
                      <option value="">Select Document Type</option>
                      {documentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col md={4}>
                    <Form.Label>Upload Document:</Form.Label>
                    <Form.Control
                      id="documentFile"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setDocumentData(prev => ({
                        ...prev,
                        file: e.target.files[0]
                      }))}
                    />
                    <Form.Text className="text-muted">
                      PDF, JPG, PNG files only (Max 500KB)
                    </Form.Text>
                  </Col>

                  <Col md={3}>
                    <Form.Label>Remarks:</Form.Label>
                    <Form.Control
                      type="text"
                      value={documentData.remarks}
                      onChange={(e) => setDocumentData(prev => ({
                        ...prev,
                        remarks: e.target.value
                      }))}
                      placeholder="Enter remarks"
                    />
                  </Col>

                  <Col md={1} className="d-flex align-items-end">
                    <Button 
                      variant="success"
                      onClick={handleDocumentUpload}
                      disabled={!documentData.documentType || !documentData.file}
                      className="w-100"
                    >
                      Upload
                    </Button>
                  </Col>
                </Row>

                {/* Uploaded Documents Table */}
                {formData.documents.length > 0 && (
                  <div className="mt-4">
                    <h6>Uploaded Documents</h6>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Document Name</th>
                          <th>Click To Download</th>
                          <th>Remarks</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.documents.map((doc, index) => (
                          <tr key={doc.id}>
                            <td>{doc.type}</td>
                            <td>
                              <Button variant="outline-primary" size="sm">
                                Download {doc.fileName}
                              </Button>
                            </td>
                            <td>{doc.remarks}</td>
                            <td>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => removeDocument(index)}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Previous Hospitalization - from screenshot 10.jpg and 13.jpg */}
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h6 className="mb-0">Details of Previous Hospitalization</h6>
              </Card.Header>
              <Card.Body>
                {previousHospitalizations.length > 0 ? (
                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead className="table-light">
                        <tr>
                          <th>TID</th>
                          <th>Patient Name</th>
                          <th>Admission Date</th>
                          <th>Hospital Name</th>
                          <th>Pkg Code</th>
                          <th>Pkg Name</th>
                          <th>Pkg Cost</th>
                          <th>Status</th>
                          <th>Ass-Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previousHospitalizations.map((record, index) => (
                          <tr key={index}>
                            <td>{record.tid}</td>
                            <td>{record.patientName}</td>
                            <td>{record.admissionDate}</td>
                            <td>{record.hospitalName}</td>
                            <td>{record.pkgCode}</td>
                            <td>{record.pkgName}</td>
                            <td>{record.pkgCost}</td>
                            <td>{record.status}</td>
                            <td>{record.assYear}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted">
                    <p>No records found.</p>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Final Remarks */}
            <Card>
              <Card.Header className="bg-light">
                <h6 className="mb-0">Final Remarks</h6>
              </Card.Header>
              <Card.Body>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.finalRemarks}
                  onChange={(e) => handleInputChange('finalRemarks', e.target.value)}
                  placeholder="Enter final remarks for the pre-authorization decision..."
                />
              </Card.Body>
            </Card>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="bg-light">
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        
        <div className="d-flex gap-2">
          {currentStep > 1 && (
            <Button variant="btn btn-outline-secondary" onClick={prevStep}>
              <i className="bi bi-arrow-left me-1"></i> Back
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button variant="success" onClick={nextStep}>
              Next <i className="bi bi-arrow-right ms-1"></i>
            </Button>
          ) : (
            <Button variant="success" onClick={handleSubmit}>
              <i className="bi bi-check-circle me-1"></i> Submit Pre-Auth Decision
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PreAuthDecisionModal;