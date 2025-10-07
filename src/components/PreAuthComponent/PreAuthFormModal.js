import React, { useState, useEffect } from "react";
import { Modal, Table, Form, Button, Row, Col, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import Swal from "sweetalert2";

const PreAuthFormModal = ({ show, handleClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Patient Details
    tid: "T0909254271667",
    patientName: "Suraj Kumar",
    patientNameHindi: "सूरज कुमार",
    policyYear: "2025-2026",
    registeredMobNo: "9079073013",
    referencedTID: "None",
    admissionNo: "None",
    beneficiaryEnrollMobNo: "5126753785",
    rtaFlag: "No",
    gender: "Male",
    
    // Step 2 - Package Selection
    specialty: "",
    selectedPackages: [],
    
    // Step 3 - Documents
    documents: [],
    doctorPrescription: null,
    otherDocuments: [],
    finalRemarks: ""
  });

  // Mock data for packages
  const [packages, setPackages] = useState([]);
  const [specialties, setSpecialties] = useState([
    "Cardiology", "Neurology", "Orthopedics", "General Surgery", 
    "Pediatrics", "Gynecology", "Ophthalmology", "ENT"
  ]);

  // Search states
  const [specialtySearch, setSpecialtySearch] = useState("");
  const [packageSearch, setPackageSearch] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);

  // Document upload states
  const [doctorPrescriptionFile, setDoctorPrescriptionFile] = useState(null);
  const [otherDocumentData, setOtherDocumentData] = useState({
    documentType: "",
    packageCode: "",
    file: null,
    remarks: ""
  });

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

  // Document types for other documents
  const documentTypes = [
    "Admission Note",
    "Investigation Reports",
    "Previous Treatment History",
    "ID Proof",
    "Address Proof",
    "Insurance Card",
    "Medical Certificate",
    "Discharge Summary"
  ];

  // Load mock package data
  useEffect(() => {
    // Simulate API call to get packages
    const mockPackages = [
      { id: 1, code: "PKG001", name: "Cardiac Bypass Surgery", category: "Tertiary", rate: 150000, specialty: "Cardiology" },
      { id: 2, code: "PKG002", name: "Knee Replacement", category: "Secondary", rate: 80000, specialty: "Orthopedics" },
      { id: 3, code: "PKG003", name: "Cataract Surgery", category: "Secondary", rate: 15000, specialty: "Ophthalmology" },
      { id: 4, code: "PKG004", name: "Neuro Surgery", category: "Tertiary", rate: 200000, specialty: "Neurology" },
      { id: 5, code: "PKG005", name: "Normal Delivery", category: "Secondary", rate: 10000, specialty: "Gynecology" },
      { id: 6, code: "PKG006", name: "C-Section", category: "Secondary", rate: 20000, specialty: "Gynecology" },
      { id: 7, code: "PKG007", name: "Appendectomy", category: "Secondary", rate: 25000, specialty: "General Surgery" },
      { id: 8, code: "PKG008", name: "Heart Valve Replacement", category: "Tertiary", rate: 180000, specialty: "Cardiology" }
    ];
    setPackages(mockPackages);
    setFilteredPackages(mockPackages);
  }, []);

  // Filter packages based on search term and specialty
  useEffect(() => {
    let filtered = packages;
    
    // Filter by selected specialty
    if (formData.specialty) {
      filtered = filtered.filter(pkg => 
        pkg.specialty.toLowerCase() === formData.specialty.toLowerCase()
      );
    }
    
    // Filter by package search term
    if (packageSearch) {
      filtered = filtered.filter(pkg => 
        pkg.name.toLowerCase().includes(packageSearch.toLowerCase()) ||
        pkg.code.toLowerCase().includes(packageSearch.toLowerCase())
      );
    }
    
    setFilteredPackages(filtered);
  }, [formData.specialty, packageSearch, packages]);

  // Filter specialties based on search
  const filteredSpecialties = specialties.filter(specialty =>
    specialty.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePackageSelect = (pkg) => {
    setFormData(prev => ({
      ...prev,
      selectedPackages: [...prev.selectedPackages, { ...pkg, prescribingDoctor: "", bookedAmount: "" }]
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

  // Handle Doctor's Prescription upload
  const handleDoctorPrescriptionUpload = () => {
    if (!doctorPrescriptionFile) {
      Swal.fire({
        icon: 'warning',
        title: 'No File Selected',
        text: 'Please choose a file for Doctor\'s Prescription',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    // Check file type and size
    if (doctorPrescriptionFile.type !== 'application/pdf') {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File Type',
        text: 'Please select a PDF file',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    if (doctorPrescriptionFile.size > 500 * 1024) {
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
      type: "Doctor's Prescription",
      fileName: doctorPrescriptionFile.name,
      file: doctorPrescriptionFile,
      status: "Uploaded",
      remarks: "",
      uploadDate: new Date().toLocaleString(),
      isMandatory: true
    };

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, newDocument],
      doctorPrescription: newDocument
    }));

    setDoctorPrescriptionFile(null);
    
    // Reset file input
    const fileInput = document.getElementById('doctorPrescriptionFile');
    if (fileInput) fileInput.value = '';

    Swal.fire({
      icon: 'success',
      title: 'Uploaded!',
      text: 'Doctor\'s Prescription uploaded successfully',
      timer: 1500,
      showConfirmButton: false
    });
  };

  // Handle Other Document upload
  const handleOtherDocumentUpload = () => {
    if (!otherDocumentData.documentType || !otherDocumentData.file) {
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
    if (otherDocumentData.file.type !== 'application/pdf') {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File Type',
        text: 'Please select a PDF file',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    if (otherDocumentData.file.size > 500 * 1024) {
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
      type: otherDocumentData.documentType,
      packageCode: otherDocumentData.packageCode,
      fileName: otherDocumentData.file.name,
      file: otherDocumentData.file,
      status: "Uploaded",
      remarks: otherDocumentData.remarks,
      uploadDate: new Date().toLocaleString(),
      isMandatory: false
    };

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, newDocument],
      otherDocuments: [...prev.otherDocuments, newDocument]
    }));

    // Reset form
    setOtherDocumentData({
      documentType: "",
      packageCode: "",
      file: null,
      remarks: ""
    });

    // Reset file input
    const fileInput = document.getElementById('otherDocumentFile');
    if (fileInput) fileInput.value = '';

    Swal.fire({
      icon: 'success',
      title: 'Document Added!',
      text: 'Document uploaded and added to records',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const removeDocument = (index) => {
    const documentToRemove = formData.documents[index];
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
      doctorPrescription: documentToRemove.isMandatory ? null : prev.doctorPrescription,
      otherDocuments: documentToRemove.isMandatory ? prev.otherDocuments : prev.otherDocuments.filter(doc => doc.id !== documentToRemove.id)
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
    if (formData.documents.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Documents Required',
        text: 'Please upload at least one document before submitting',
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
    setCurrentStep(1);
    setFormData({
      tid: "T0909254271667",
      patientName: "Suraj Kumar",
      patientNameHindi: "सूरज कुमार",
      policyYear: "2025-2026",
      registeredMobNo: "9079073013",
      referencedTID: "None",
      admissionNo: "None",
      beneficiaryEnrollMobNo: "5126753785",
      rtaFlag: "No",
      gender: "Male",
      specialty: "",
      selectedPackages: [],
      documents: [],
      doctorPrescription: null,
      otherDocuments: [],
      finalRemarks: ""
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

  // Check if package is already selected
  const isPackageSelected = (pkgId) => {
    return formData.selectedPackages.some(pkg => pkg.id === pkgId);
  };

  // Steps definition
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
      backdrop="static"
    >
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>Pre Authorization Request Form</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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

        {/* Step 1: Patient Details */}
        {currentStep === 1 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading">Patient Information</h4>
            
            <Row>
              <Col md={4}>
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
              <Col md={4}>
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
              <Col md={4}>
                <div className="mb-3">
                  <Form.Label>Gender:</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Male"
                      name="gender"
                      checked={formData.gender === "Male"}
                      onChange={() => handleInputChange('gender', "Male")}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Female"
                      name="gender"
                      checked={formData.gender === "Female"}
                      onChange={() => handleInputChange('gender', "Female")}
                    />
                  </div>
                </div>
              </Col>
              <Col md={4}>
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
              <Col md={4}>
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
              <Col md={4}>
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
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                      {formData.specialty || "Choose Specialty"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100">
                      <div className="p-2">
                        <Form.Control
                          type="text"
                          placeholder="Search specialty..."
                          value={specialtySearch}
                          onChange={(e) => setSpecialtySearch(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      {filteredSpecialties.map(specialty => (
                        <Dropdown.Item 
                          key={specialty}
                          onClick={() => {
                            handleInputChange('specialty', specialty);
                            setSpecialtySearch("");
                          }}
                        >
                          {specialty}
                        </Dropdown.Item>
                      ))}
                      {filteredSpecialties.length === 0 && (
                        <Dropdown.Item disabled>No specialties found</Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <Form.Label>Search Packages:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by package name or code..."
                    value={packageSearch}
                    onChange={(e) => setPackageSearch(e.target.value)}
                    disabled={!formData.specialty}
                  />
                </div>
              </Col>
            </Row>

            {formData.specialty && (
              <div className="package-selection mb-4">
                <h6>Available Packages for {formData.specialty}</h6>
                {filteredPackages.length > 0 ? (
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
                        {filteredPackages.map(pkg => (
                          <tr key={pkg.id}>
                            <td>{pkg.code}</td>
                            <td>{pkg.name}</td>
                            <td>{pkg.category}</td>
                            <td>₹{pkg.rate.toLocaleString()}</td>
                            <td>
                              <Button
                                variant={isPackageSelected(pkg.id) ? "secondary" : "success"}
                                size="sm"
                                onClick={() => handlePackageSelect(pkg)}
                                disabled={isPackageSelected(pkg.id)}
                              >
                                {isPackageSelected(pkg.id) ? "Added" : "Add Package"}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted border rounded">
                    <i className="bi bi-search display-4"></i>
                    <p className="mt-2">No packages found</p>
                    <small>Try adjusting your search criteria</small>
                  </div>
                )}
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
                        <th>Booked Amount (₹)</th>
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
                              value={pkg.bookedAmount}
                              onChange={(e) => updatePackageField(index, 'bookedAmount', e.target.value)}
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

            {formData.selectedPackages.length === 0 && formData.specialty && (
              <div className="text-center py-4 text-muted">
                <i className="bi bi-inbox display-4"></i>
                <p className="mt-2">No packages selected</p>
                <small>Select packages from the list above</small>
              </div>
            )}

            {!formData.specialty && (
              <div className="text-center py-4 text-muted">
                <i className="bi bi-clipboard-plus display-4"></i>
                <p className="mt-2">Select a specialty to view packages</p>
                <small>Choose a specialty from the dropdown above</small>
              </div>
            )}
            
            <div className="alert alert-info mt-4 small">
              <i className="bi bi-info-circle me-2"></i>
              NOTE: Hospital authorized by CMHO for COVID19 treatment will be eligible to avail COVID19 related packages.
            </div>

          </div>
        )}

        {/* Step 3: Document Upload */}
        {currentStep === 3 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading">Document Upload</h4>
            
            {/* Doctor's Prescription Section */}
            <div className="doctor-prescription-section mb-4">
              <label className="form-label mb-3">
                Doctor's Prescription <span className="text-danger">*</span>
              </label>
              
              <div className="upload-card p-3 border rounded bg-light">
                <Row className="align-items-center">
                  <Col md={10}>
                    <Form.Label className="fw-bold">Upload Doctor's Prescription:</Form.Label>
                    <div className="d-flex gap-2 align-items-center">
                      <Form.Control
                        id="doctorPrescriptionFile"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setDoctorPrescriptionFile(e.target.files[0])}
                      />

                    </div>
                    <Form.Text className="text-muted">
                      File must be PDF and size should not exceed 500 KB
                    </Form.Text>
                  </Col>
                  <Col md={2}>
                    <div className="d-flex gap-2 justify-content-end">
                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={handleDoctorPrescriptionUpload}
                        disabled={!doctorPrescriptionFile}
                      >
                        Upload
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => {
                          setDoctorPrescriptionFile(null);
                          document.getElementById('doctorPrescriptionFile').value = '';
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            {/* Other Documents Section */}
            <div className="other-documents-section">
              <label className="form-label mb-3">
                Upload below Document (Document must be a PDF file size not more than 500 kb each)
              </label>

              {/* Document Upload Form */}
              <div className="upload-form-card p-4 border rounded mb-4">
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Label className="fw-bold">Mandatory Document Type:</Form.Label>
                    <Form.Select
                      value={otherDocumentData.documentType}
                      onChange={(e) => setOtherDocumentData(prev => ({
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

                  <Col md={6}>
                    <Form.Label className="fw-bold">Package Code:</Form.Label>
                    <Form.Select
                      value={otherDocumentData.packageCode}
                      onChange={(e) => setOtherDocumentData(prev => ({
                        ...prev,
                        packageCode: e.target.value
                      }))}
                    >
                      <option value="">Select Package</option>
                      {formData.selectedPackages.map(pkg => (
                        <option key={pkg.code} value={pkg.code}>{pkg.code} - {pkg.name}</option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col md={6}>
                    <Form.Label className="fw-bold">Upload Report Documents:</Form.Label>
                    <div className="d-flex gap-2 align-items-center">
                      <Form.Control
                        id="otherDocumentFile"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setOtherDocumentData(prev => ({
                          ...prev,
                          file: e.target.files[0]
                        }))}
                      />
                    </div>
                    <Form.Text className="text-muted">
                      Max file size: 500 KB
                    </Form.Text>
                  </Col>

                  <Col md={6}>
                    <Form.Label className="fw-bold">Enter Remarks:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={otherDocumentData.remarks}
                      onChange={(e) => setOtherDocumentData(prev => ({
                        ...prev,
                        remarks: e.target.value
                      }))}
                      placeholder="Enter remarks..."
                    />
                  </Col>

                  <Col md={12}>
                    <div className="d-flex justify-content-end gap-2">
                      <Button 
                        variant="success" 
                        onClick={handleOtherDocumentUpload}
                        disabled={!otherDocumentData.documentType || !otherDocumentData.file}
                      >
                        Insert Record
                      </Button>
                      <Button 
                        variant="secondary"
                        onClick={() => setOtherDocumentData({
                          documentType: "",
                          packageCode: "",
                          file: null,
                          remarks: ""
                        })}
                      >
                        Clear
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Uploaded Documents Table */}
              <div className="uploaded-documents-table">
                <label className="form-label mb-3">Uploaded Documents</label>
                
                {formData.documents.length > 0 ? (
                  <div className="table-responsive">
                    <Table striped bordered hover className="table-sm">
                      <thead className="table-primary">
                        <tr>
                          <th width="5%">S.No.</th>
                          <th width="25%">Report Document Name</th>
                          <th width="15%">Upload Status</th>
                          <th width="30%">Remarks</th>
                          <th width="10%">Delete Record</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.documents.map((doc, index) => (
                          <tr key={doc.id}>
                            <td className="text-center">{index + 1}</td>
                            <td>
                              <div>
                                <strong>{doc.type}</strong>
                                {doc.packageCode && (
                                  <div className="text-muted small">
                                    Package: {doc.packageCode}
                                  </div>
                                )}
                                <div className="text-muted small">
                                  File: {doc.fileName}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-success">{doc.status}</span>
                              <div className="text-muted small mt-1">
                                {doc.uploadDate}
                              </div>
                            </td>
                            <td>
                              {doc.remarks || <span className="text-muted">No remarks</span>}
                            </td>
                            <td className="text-center">
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => removeDocument(index)}
                                title="Delete Record"
                              >
                                <i className="bi bi-trash"></i> Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-5 border rounded bg-light">
                    <i className="bi bi-file-earmark-text display-4 text-muted"></i>
                    <p className="mt-3 text-muted fw-bold">No records found.</p>
                    <small className="text-muted">
                      Upload documents using the forms above to see them listed here.
                    </small>
                  </div>
                )}
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
              <i className="bi bi-check-circle me-1"></i> Submit Pre-Auth
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PreAuthFormModal;