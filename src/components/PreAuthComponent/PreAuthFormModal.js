import React, { useState, useEffect } from "react";
import { Modal, Table, Form, Button, Row, Col, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import Swal from "sweetalert2";

const PreAuthFormModal = ({ show, handleClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Patient Details
    tid: "T2805254271281",
    patientName: "",
    patientNameHindi: "",
    policyYear: "",
    registeredMobNo: "",
    referencedTID: "",
    admissionNo: "",
    beneficiaryEnrollMobNo: "",
    rtaFlag: "No",
    
    // Step 2 - Package Selection
    specialty: "",
    selectedPackages: [],
    
    // Step 3 - Documents
    documents: [],
    prescribingDoctor: "",
    brotherAmount: ""
  });

  // Mock data for packages
  const [packages, setPackages] = useState([]);
  const [specialties, setSpecialties] = useState([
    "Cardiology", "Neurology", "Orthopedics", "General Surgery", 
    "Pediatrics", "Gynecology", "Ophthalmology", "ENT"
  ]);

  // Mock data for doctors
  const doctors = [
    "Dr. AMIT GOENKA",
    "Dr. GAURAV SHARMA",
    "Dr. IW BAI Bai",
    "Col. L.C.C. Gupta",
    "DR. MANINDER PAL KOCH",
    "DR. RAPREET SONI",
    "DR. RAVIESH CHAND BAIR",
    "DR. RAHUL PATNI",
    "DR. ROOP SHARMA"
  ];

  // Load mock package data
  useEffect(() => {
    // Simulate API call to get packages
    const mockPackages = [
      { id: 1, code: "PKG001", name: "Cardiac Bypass Surgery", category: "Tertiary", rate: 150000 },
      { id: 2, code: "PKG002", name: "Knee Replacement", category: "Secondary", rate: 80000 },
      { id: 3, code: "PKG003", name: "Cataract Surgery", category: "Secondary", rate: 15000 },
      { id: 4, code: "PKG004", name: "Neuro Surgery", category: "Tertiary", rate: 200000 },
      { id: 5, code: "PKG005", name: "Normal Delivery", category: "Secondary", rate: 10000 },
      { id: 6, code: "PKG006", name: "C-Section", category: "Secondary", rate: 20000 },
      { id: 7, code: "PKG007", name: "Appendectomy", category: "Secondary", rate: 25000 },
      { id: 8, code: "PKG008", name: "Heart Valve Replacement", category: "Tertiary", rate: 180000 }
    ];
    setPackages(mockPackages);
  }, []);

  // Document types
  const documentTypes = [
    "Doctor's Prescription",
    "Admission Note",
    "Investigation Reports",
    "Previous Treatment History",
    "ID Proof",
    "Address Proof",
    "Insurance Card"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePackageSelect = (pkg) => {
    setFormData(prev => ({
      ...prev,
      selectedPackages: [...prev.selectedPackages, { ...pkg, prescribingDoctor: "", brotherAmount: "" }]
    }));
  };

  const removePackage = (index) => {
    setFormData(prev => ({
      ...prev,
      selectedPackages: prev.selectedPackages.filter((_, i) => i !== index)
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

  const addDocument = (type, file) => {
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, { type, file, status: "Uploaded", remarks: "" }]
    }));
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const updateDocumentRemarks = (index, remarks) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map((doc, i) => 
        i === index ? { ...doc, remarks } : doc
      )
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
    // Validate and submit form data
    Swal.fire({
      icon: 'success',
      title: 'Pre-Authorization Submitted!',
      text: 'Your pre-authorization request has been submitted successfully.',
      timer: 2000,
      showConfirmButton: false
    });
    handleClose();
  };

  const calculateTotals = () => {
    const secondaryTotal = formData.selectedPackages
      .filter(pkg => pkg.category === "Secondary")
      .reduce((sum, pkg) => sum + (parseFloat(pkg.rate) || 0), 0);
    
    const tertiaryTotal = formData.selectedPackages
      .filter(pkg => pkg.category === "Tertiary")
      .reduce((sum, pkg) => sum + (parseFloat(pkg.rate) || 0), 0);
    
    return { secondaryTotal, tertiaryTotal };
  };

  const { secondaryTotal, tertiaryTotal } = calculateTotals();

  // Steps definition matching GenerateTidModal structure
  const steps = [
    { number: 1, label: "Patient Details", actualStep: 1 },
    { number: 2, label: "Package Selection", actualStep: 2 },
    { number: 3, label: "Document Upload", actualStep: 3 }
  ];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      className="animate__animated animate__fadeInDown animate__faster"
      centered
      scrollable
    >
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>Pre Authorization Request Form</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Step Indicator - Matching GenerateTidModal styling */}
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

        {/* Step 1: Patient Details */}
        {currentStep === 1 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading">Patient Information</h4>
            

            <Row className="mb-3">
              <Col md={6}>
                <div className="mb-3">
                  <Form.Label>Patient Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                    placeholder="Enter patient name"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <Form.Label>Patient Name Hindi:</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.patientNameHindi}
                    onChange={(e) => handleInputChange('patientNameHindi', e.target.value)}
                    placeholder="रोगी का नाम हिंदी में"
                  />
                </div>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <div className="mb-3">
                  <Form.Label>Policy Year:</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.policyYear}
                    onChange={(e) => handleInputChange('policyYear', e.target.value)}
                    placeholder="Enter policy year"
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-3">
                  <Form.Label>Registered Mobile No:</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.registeredMobNo}
                    onChange={(e) => handleInputChange('registeredMobNo', e.target.value)}
                    placeholder="Enter mobile number"
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-3">
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
                </div>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <div className="mb-3">
                  <Form.Label>Referenced TID:</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.referencedTID}
                    onChange={(e) => handleInputChange('referencedTID', e.target.value)}
                    placeholder="Enter referenced TID"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <Form.Label>Admission No:</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.admissionNo}
                    onChange={(e) => handleInputChange('admissionNo', e.target.value)}
                    placeholder="Enter admission number"
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <Form.Label>Beneficiary Enroll Mobile No:</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.beneficiaryEnrollMobNo}
                    onChange={(e) => handleInputChange('beneficiaryEnrollMobNo', e.target.value)}
                    placeholder="Enter beneficiary mobile number"
                  />
                </div>
              </Col>
            </Row>

            <div className="alert alert-info mt-4 small">
              <i className="bi bi-info-circle me-2"></i>
              NOTE: Hospital authorized by CMHO for COVID19 treatment will be eligible to avail COVID19 related packages.
            </div>
          </div>
        )}

        {/* Step 2: Package Selection */}
        {currentStep === 2 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading">Package Selection</h4>
            
            <Row className="mb-4">
              <Col md={6}>
                <div className="mb-3">
                  <Form.Label>Select Specialty:</Form.Label>
                  <Form.Select
                    value={formData.specialty}
                    onChange={(e) => handleInputChange('specialty', e.target.value)}
                  >
                    <option value="">Choose Specialty</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </Form.Select>
                </div>
              </Col>
            </Row>

            {formData.specialty && (
              <div className="package-selection mb-4">
                <h6>Available Packages for {formData.specialty}</h6>
                <div className="table-responsive">
                  <Table striped bordered hover size="sm">
                    <thead className="table-light">
                      <tr>
                        <th>Package Code</th>
                        <th>Package Name</th>
                        <th>Package Category</th>
                        <th>Package Rate (₹)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map(pkg => (
                        <tr key={pkg.id}>
                          <td>{pkg.code}</td>
                          <td>{pkg.name}</td>
                          <td>{pkg.category}</td>
                          <td>₹{pkg.rate.toLocaleString()}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handlePackageSelect(pkg)}
                              disabled={formData.selectedPackages.some(sp => sp.id === pkg.id)}
                            >
                              Add Package
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}

            {/* Selected Packages */}
            {formData.selectedPackages.length > 0 && (
              <div className="selected-packages">
                <h6>Selected Packages</h6>
                <div className="table-responsive">
                  <Table striped bordered hover size="sm">
                    <thead className="table-light">
                      <tr>
                        <th>Package Code</th>
                        <th>Package Name</th>
                        <th>Package Category</th>
                        <th>Package Rate (₹)</th>
                        <th>Prescribing Doctor</th>
                        <th>Brother Amount (₹)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.selectedPackages.map((pkg, index) => (
                        <tr key={index}>
                          <td>{pkg.code}</td>
                          <td>{pkg.name}</td>
                          <td>{pkg.category}</td>
                          <td>₹{pkg.rate.toLocaleString()}</td>
                          <td>
                            <Form.Select
                              size="sm"
                              value={pkg.prescribingDoctor}
                              onChange={(e) => updatePackageField(index, 'prescribingDoctor', e.target.value)}
                            >
                              <option value="">Select Doctor</option>
                              {doctors.map(doctor => (
                                <option key={doctor} value={doctor}>{doctor}</option>
                              ))}
                            </Form.Select>
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              size="sm"
                              value={pkg.brotherAmount}
                              onChange={(e) => updatePackageField(index, 'brotherAmount', e.target.value)}
                              placeholder="Enter amount"
                            />
                          </td>
                          <td>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removePackage(index)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                {/* Package Totals */}
                <div className="package-totals mt-3 p-3 bg-light rounded">
                  <Row>
                    <Col md={4}>
                      <strong>Total Secondary Package Amount: ₹{secondaryTotal.toLocaleString()}</strong>
                    </Col>
                    <Col md={4}>
                      <strong>Total Tertiary Package Amount: ₹{tertiaryTotal.toLocaleString()}</strong>
                    </Col>
                    <Col md={4}>
                      <strong>Grand Total: ₹{(secondaryTotal + tertiaryTotal).toLocaleString()}</strong>
                    </Col>
                  </Row>
                </div>
              </div>
            )}

            {formData.selectedPackages.length === 0 && (
              <div className="text-center py-4 text-muted">
                <i className="bi bi-inbox display-4"></i>
                <p className="mt-2">No packages selected</p>
                <small>Select a specialty and add packages from the list above</small>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Document Upload */}
        {currentStep === 3 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading">Document Upload</h4>
            
            <div className="document-upload-section">
              <h6>Upload Required Documents</h6>
              <p className="text-muted small mb-3">
                Upload below Document (Document must be a PDF file size not more than 500 kb each)
              </p>

              {/* Document Upload Form */}
              <div className="upload-form mb-4 p-3 border rounded">
                <Row className="align-items-end">
                  <Col md={4}>
                    <div className="mb-3">
                      <Form.Label>Mandatory Document Type:</Form.Label>
                      <Form.Select>
                        <option value="">Select Document Type</option>
                        {documentTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Form.Select>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-3">
                      <Form.Label>Upload Document:</Form.Label>
                      <Form.Control type="file" accept=".pdf" />
                      <Form.Text className="text-muted">
                        Maximum file size: 500 KB
                      </Form.Text>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="d-grid gap-2">
                      <Button variant="success" size="sm">Upload</Button>
                      <Button variant="secondary" size="sm">Cancel</Button>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Uploaded Documents List */}
              <div className="uploaded-documents">
                <h6>Uploaded Documents</h6>
                {formData.documents.length > 0 ? (
                  <div className="table-responsive">
                    <Table striped bordered hover size="sm">
                      <thead className="table-light">
                        <tr>
                          <th>S.No.</th>
                          <th>Report Document Name</th>
                          <th>Upload Status</th>
                          <th>Remarks</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.documents.map((doc, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{doc.type}</td>
                            <td>
                              <span className="badge bg-success">{doc.status}</span>
                            </td>
                            <td>
                              <Form.Control
                                type="text"
                                size="sm"
                                value={doc.remarks}
                                onChange={(e) => updateDocumentRemarks(index, e.target.value)}
                                placeholder="Enter remarks"
                              />
                            </td>
                            <td>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => removeDocument(index)}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted border rounded">
                    <i className="bi bi-file-earmark display-4"></i>
                    <p className="mt-2">No documents uploaded</p>
                    <small>Upload required documents using the form above</small>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="additional-info mt-4">
              <h6>Additional Information</h6>
              <div className="mb-3">
                <Form.Label>Enter Remarks:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter any additional remarks or information..."
                />
              </div>
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="bg-light">
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        
        <div className="d-flex gap-2">
          {currentStep > 1 && (
            <Button variant="outline-primary" onClick={prevStep}>
              <i className="bi bi-arrow-left me-1"></i> Back
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button variant="primary" onClick={nextStep}>
              Next <i className="bi bi-arrow-right ms-1"></i>
            </Button>
          ) : (
            <Button variant="success" onClick={handleSubmit}>
              <i className="bi bi-check-circle me-1"></i> Submit Pre-Auth
            </Button>
          )}
        </div>
      </Modal.Footer>


    </Modal>
  );
};

export default PreAuthFormModal;