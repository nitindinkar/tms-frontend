import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { Modal, Dropdown } from 'react-bootstrap';

const GenerateTidModal = ({ show, handleClose, showSuccess, backdropClicked }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [verifyMethod, setVerifyMethod] = useState('aadhaar');
  const [admissionType, setAdmissionType] = useState('normal');
  const [hasJanAadhaar, setHasJanAadhaar] = useState(true);
  const [isMlcCase, setIsMlcCase] = useState(false);
  const [isPatientIdentified, setIsPatientIdentified] = useState(false);
  const [rtaCase, setRtaCase] = useState('no');
  const [gender, setGender] = useState('male');
  const [skipStep2, setSkipStep2] = useState(false);
  const [skipStep3, setSkipStep3] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!show) {
      setCurrentStep(1);
      setAdmissionType('normal');
      setHasJanAadhaar(true);
      setIsMlcCase(false);
      setIsPatientIdentified(false);
      setRtaCase('no');
      setVerifyMethod('aadhaar');
      setSkipStep2(false);
      setSkipStep3(false);
    }
  }, [show]);

  // Update skipStep2 and skipStep3 based on admission type and Jan Aadhaar
  useEffect(() => {
    if (admissionType === 'normal') {
      // For normal admission: skip step 2 only if no Jan Aadhaar
      setSkipStep2(!hasJanAadhaar);
      setSkipStep3(false);
    } else if (admissionType === 'emergency') {
      // For emergency admission: skip both step 2 and step 3
      setSkipStep2(true);
      setSkipStep3(true);
    }
  }, [hasJanAadhaar, admissionType]);

  // Single select handler for checkbox groups
  const handleSingleSelect = (setter, value, groupName) => {
    setter(value);
    console.log(`Selected ${value} for ${groupName}`);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      let nextStep = currentStep + 1;
      
      // Handle step skipping logic
      if (currentStep === 1) {
        if (skipStep2 && skipStep3) {
          // Emergency case: skip both step 2 and step 3
          nextStep = 4;
        } else if (skipStep2 && !skipStep3) {
          // Normal admission without Jan Aadhaar: skip only step 2
          nextStep = 3;
        }
      } else if (currentStep === 2 && skipStep3) {
        // If we're on step 2 and step 3 should be skipped (emergency case)
        nextStep = 4;
      }
      
      setCurrentStep(nextStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      let previousStep = currentStep - 1;
      
      // Handle step skipping logic when going back
      if (currentStep === 4) {
        if (skipStep2 && skipStep3) {
          // Emergency case: go back to step 1 from step 4
          previousStep = 1;
        } else if (skipStep2 && !skipStep3) {
          // Normal admission without Jan Aadhaar: go back to step 3 from step 4
          previousStep = 3;
        }
      } else if (currentStep === 3 && skipStep2) {
        // If we're on step 3 and step 2 was skipped
        previousStep = 1;
      }
      
      setCurrentStep(previousStep);
    }
  };

  const generateTid = () => {
    handleClose();
    showSuccess();
  };

  // Determine which steps to display in the step indicator
  const getStepsToDisplay = () => {
    if (skipStep2 && skipStep3) {
      // Emergency case: show only step 1 and step 4
      return [
        { number: 1, label: 'Search Beneficiary', actualStep: 1 },
        { number: 2, label: 'Capture Photograph', actualStep: 4 }
      ];
    } else if (skipStep2 && !skipStep3) {
      // Normal admission without Jan Aadhaar: skip step 2
      return [
        { number: 1, label: 'Search Beneficiary', actualStep: 1 },
        { number: 2, label: 'Member Details', actualStep: 3 },
        { number: 3, label: 'Capture Photograph', actualStep: 4 }
      ];
    } else {
      // Normal admission with Jan Aadhaar: show all steps
      return [
        { number: 1, label: 'Search Beneficiary', actualStep: 1 },
        { number: 2, label: 'Contact Details', actualStep: 2 },
        { number: 3, label: 'Member Details', actualStep: 3 },
        { number: 4, label: 'Capture Photograph', actualStep: 4 }
      ];
    }
  };

  const stepsToDisplay = getStepsToDisplay();
  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      size="xl" 
      className="animate__animated animate__fadeInDown animate__faster"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Generate New TID</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Step Indicator */}
        <div className="step-indicator mb-4">
          {stepsToDisplay.map(step => (
            <div 
              key={step.actualStep} 
              className={`step ${currentStep === step.actualStep ? 'active' : ''} ${currentStep > step.actualStep ? 'completed' : ''} ${skipStep2 && step.actualStep === 2 ? 'skipped' : ''}`}
            >
              <div className="step-icon">{step.number}</div>
              <div className="step-label">{step.label}</div>
            </div>
          ))}
        </div>
        
        {/* Step Content */}
        {currentStep === 1 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading">Search Beneficiary</h4>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">RTA Accidental Case <span className="text-danger">*</span></label>
                <div className="single-select-group">
                  <div className="form-check">
                    <input
                      className="form-check-input single-select"
                      type="checkbox"
                      name="rta-case"
                      id="rta-no"
                      checked={rtaCase === 'no'}
                      onChange={() => handleSingleSelect(setRtaCase, 'no', 'rta-case')}
                    />
                    <label className="form-check-label" htmlFor="rta-no">
                      No
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input single-select"
                      type="checkbox"
                      name="rta-case"
                      id="rta-yes"
                      checked={rtaCase === 'yes'}
                      onChange={() => handleSingleSelect(setRtaCase, 'yes', 'rta-case')}
                    />
                    <label className="form-check-label" htmlFor="rta-yes">
                      Yes
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label">Admission Type <span className="text-danger">*</span></label>
                <div className="single-select-group">
                  <div className="form-check">
                    <input
                      className="form-check-input single-select"
                      type="checkbox"
                      name="admission-type"
                      id="admission-normal"
                      checked={admissionType === 'normal'}
                      onChange={() => handleSingleSelect(setAdmissionType, 'normal', 'admission-type')}
                    />
                    <label className="form-check-label" htmlFor="admission-normal">
                      Normal
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input single-select"
                      type="checkbox"
                      name="admission-type"
                      id="admission-emergency"
                      checked={admissionType === 'emergency'}
                      onChange={() => handleSingleSelect(setAdmissionType, 'emergency', 'admission-type')}
                    />
                    <label className="form-check-label" htmlFor="admission-emergency">
                      Emergency
                    </label>
                  </div>
                </div>
              </div>
              {admissionType === 'normal' &&(
              <div className="col-md-4">
                <label className="form-label">Do you have Jan Aadhaar ID? <span className="text-danger">*</span></label>
                <div className="single-select-group">
                  <div className="form-check">
                    <input
                      className="form-check-input single-select"
                      type="checkbox"
                      name="jan-aadhaar"
                      id="jan-yes"
                      checked={hasJanAadhaar === true}
                      onChange={() => handleSingleSelect(setHasJanAadhaar, true, 'jan-aadhaar')}
                    />
                    <label className="form-check-label" htmlFor="jan-yes">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input single-select"
                      type="checkbox"
                      name="jan-aadhaar"
                      id="jan-no"
                      checked={hasJanAadhaar === false}
                      onChange={() => handleSingleSelect(setHasJanAadhaar, false, 'jan-aadhaar')}
                    />
                    <label className="form-check-label" htmlFor="jan-no">
                      No
                    </label>
                  </div>
                </div>
                {!hasJanAadhaar && (
                  <div className="alert alert-info mt-2 small">
                    <i className="bi bi-info-circle"></i> Step 2 will be skipped as you don't have Jan Aadhaar ID.
                  </div>
                )}
              </div>
              )}
            </div>
            
            {/* Emergency Form - Conditionally Rendered */}
            {admissionType === 'emergency' && (
              <div id="emergency-form" className="emergency-form mb-3 mt-3 p-3 border rounded">
                <div className="emergency-section">
                  <h5>Patient Details</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Patient Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Age</label>
                      <input type="number" className="form-control" placeholder="Age" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Gender</label>
                      <div className="single-select-group">
                        <div className="form-check">
                          <input
                            className="form-check-input single-select"
                            type="checkbox"
                            name="gender"
                            id="gender-male"
                            value="male"
                            checked={gender === 'male'}
                            onChange={() => handleSingleSelect(setGender, 'male', 'gender')}
                          />
                          <label className="form-check-label" htmlFor="gender-male">
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input single-select"
                            type="checkbox"
                            name="gender"
                            id="gender-female"
                            value="female"
                            checked={gender === 'female'}
                            onChange={() => handleSingleSelect(setGender, 'female', 'gender')}
                          />
                          <label className="form-check-label" htmlFor="gender-female">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="emergency-section">
                  <h5>MLC case</h5>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="single-select-group">
                        <div className="form-check">
                          <input
                            className="form-check-input single-select"
                            type="checkbox"
                            name="mlc-case"
                            id="mlc-yes"
                            checked={isMlcCase === true}
                            onChange={() => handleSingleSelect(setIsMlcCase, true, 'mlc-case')}
                          />
                          <label className="form-check-label" htmlFor="mlc-yes">
                            Yes
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input single-select"
                            type="checkbox"
                            name="mlc-case"
                            id="mlc-no"
                            checked={isMlcCase === false}
                            onChange={() => handleSingleSelect(setIsMlcCase, false, 'mlc-case')}
                          />
                          <label className="form-check-label" htmlFor="mlc-no">
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* MLC Details - Conditionally Rendered */}
                  {isMlcCase && (
                    <div id="mlc-details" className="mlc-details bg-light rounded">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">
                            Assault And Battery, Including Domestic Violence
                          </label>
                          <select className="form-select">
                            <option>Assault And Battery, Including Domestic Violence</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="emergency-section">
                  <h5>Is the patient identified?</h5>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="single-select-group">
                        <div className="form-check">
                          <input
                            className="form-check-input single-select"
                            type="checkbox"
                            name="patient-identified"
                            id="patient-unidentified"
                            checked={isPatientIdentified === false}
                            onChange={() => handleSingleSelect(setIsPatientIdentified, false, 'patient-identified')}
                          />
                          <label className="form-check-label" htmlFor="patient-unidentified">
                            Un-identified
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input single-select"
                            type="checkbox"
                            name="patient-identified"
                            id="patient-identified"
                            checked={isPatientIdentified === true}
                            onChange={() => handleSingleSelect(setIsPatientIdentified, true, 'patient-identified')}
                          />
                          <label className="form-check-label" htmlFor="patient-identified">
                            Identified
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Identification Details - Conditionally Rendered */}
                  {isPatientIdentified && (
                    <div id="identification-details" className="identification-details bg-light rounded">
                      <h5>Details of Person Identifying Patient</h5>
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <label className="form-label">
                            Name of the Person Identifying Patient
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <label className="form-label">Relationship with Patient</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter relationship"
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <label className="form-label">Contact No.</label>
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="Enter contact number"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Identity Details - Conditionally Shown */}
            {hasJanAadhaar && admissionType === 'normal' && (
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Identity Type <span className="text-danger">*</span></label>
                <select className="form-select">
                  <option>Select Identity Type</option>
                  <option>Aadhaar Card</option>
                  <option>Driving License</option>
                  <option>Voter ID</option>
                  <option>PAN Card</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Identity Number <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Identity Number"
                />
              </div>
            </div>
            )}
          </div>
        )}
        
        {currentStep === 2 && !skipStep2 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading">Contact Details of Beneficiary</h4>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Entitlement Type</label>
                <div className="form-control bg-light">NFSA</div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Ration Card No</label>
                <div className="form-control bg-light">123456789</div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Mobile No</label>
                <div className="form-control bg-light">123456789</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">House Number</label>
                <div className="form-control bg-light">123</div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Colony/Street</label>
                <div className="form-control bg-light">ABCD Colony</div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Block/Ward</label>
                <div className="form-control bg-light">Ward No 26</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Gram Panchayat</label>
                <div className="form-control bg-light">Abc Grampanchayat</div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Village</label>
                <div className="form-control bg-light">ABC Village</div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Tehsil</label>
                <div className="form-control bg-light">ABCD</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">District</label>
                <div className="form-control bg-light">Abc District</div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">State</label>
                <div className="form-control bg-light">Rajasthan</div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Pincode</label>
                <div className="form-control bg-light">303303</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Bhamasha ID</label>
                <div className="form-control bg-light">ABCDEFGH</div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Jan Aadhaar ID</label>
                <div className="form-control bg-light">4XXXXXXXX88</div>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="tab-pane fade show active">
            {hasJanAadhaar && (
              <>
                <h4 className="step-heading">Member Details of Beneficiary</h4>
                {/* Verify By Field */}
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label className="form-label">Verify By? <span className="text-danger">*</span></label>
                    <div className="single-select-group">
                      <div className="form-check">
                        <input
                          className="form-check-input single-select"
                          type="checkbox"
                          name="verify-by"
                          id="verify-aadhaar"
                          checked={verifyMethod === 'aadhaar'}
                          onChange={() => handleSingleSelect(setVerifyMethod, 'aadhaar', 'verify-by')}
                        />
                        <label className="form-check-label" htmlFor="verify-aadhaar">
                          Aadhaar
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input single-select"
                          type="checkbox"
                          name="verify-by"
                          id="verify-moic"
                          checked={verifyMethod === 'moic'}
                          onChange={() => handleSingleSelect(setVerifyMethod, 'moic', 'verify-by')}
                        />
                        <label className="form-check-label" htmlFor="verify-moic">
                          MOIC (Medical Officer In Charge)
                        </label>
                      </div>
                    </div>
                    
                    {/* MOIC Document Upload Field - Conditionally Rendered */}
                    {verifyMethod === 'moic' && (
                      <div id="moic-doc-upload" className="moic-doc-upload mt-3 p-3 border rounded ">
                        <div className='row'>
                          <div className="col-md-10">
                          <label className="form-label">Upload MOIC Approved Document <span className="text-danger">*</span></label>
                          <input
                            type="file"
                            className="form-control"
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                          <small className="text-muted">
                            Accepted formats: PDF, JPG, JPEG, PNG
                          </small>
                          </div>
                          <div className="col-md-2">
                              <label className="form-label d-block">&nbsp;</label>
                            <button className="btn btn-success btn-sm me-2">
                              Upload
                            </button>
                            <button className="btn btn-secondary btn-sm">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="select-all-members"
                            />
                          </div>
                        </th>
                        <th>Name (Eng)</th>
                        <th>Name (Hindi)</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Category</th>
                        <th>Aadhaar Number</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultChecked=""
                            />
                          </div>
                        </td>
                        <td>Bhagirath Prajapat</td>
                        <td>भगीरथ प्रजापत</td>
                        <td>Male</td>
                        <td>38</td>
                        <td>INSTANT</td>
                        <td>XXXXXXXX7906</td>
                        <td>
                          <span className="badge bg-success">Verified</span>
                        </td>
                        <td>
                          <div className="dropdown">
                          <Dropdown>
                          <Dropdown.Toggle variant="outline-secondary" size="sm" disabled={verifyMethod === 'moic'}>
                            <i className="bi bi-three-dots-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">
                              <i className="bi bi-person-check" /> Verify Aadhaar
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              <i className="bi bi-plus-circle" /> Create ABHA
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              <i className="bi bi-arrow-repeat" /> Verified/Update ABHA
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>Pravansh Prajapat</td>
                        <td>प्रवंश प्रजापत</td>
                        <td>Male</td>
                        <td>11</td>
                        <td>INSTANT</td>
                        <td>XXXXXXXX8318</td>
                        <td>
                          <span className="badge bg-warning text-dark">Pending</span>
                        </td>
                        <td>
                        <div className="dropdown">
                          <Dropdown>
                          <Dropdown.Toggle variant="outline-secondary" size="sm" disabled={verifyMethod === 'moic'}>
                            <i className="bi bi-three-dots-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">
                              <i className="bi bi-person-check" /> Verify Aadhaar
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              <i className="bi bi-plus-circle" /> Create ABHA
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              <i className="bi bi-arrow-repeat" /> Verified/Update ABHA
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                          </div>
                        </td>
                        <td>Rakshita</td>
                        <td>रक्षिता</td>
                        <td>Female</td>
                        <td>9</td>
                        <td>INSTANT</td>
                        <td>XXXXXXXX1913</td>
                        <td>
                          <span className="badge bg-warning text-dark">Pending</span>
                        </td>
                        <td>
                        <div className="dropdown">
                          <Dropdown>
                          <Dropdown.Toggle variant="outline-secondary" size="sm" disabled={verifyMethod === 'moic'}>
                            <i className="bi bi-three-dots-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">
                              <i className="bi bi-person-check" /> Verify Aadhaar
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              <i className="bi bi-plus-circle" /> Create ABHA
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              <i className="bi bi-arrow-repeat" /> Verified/Update ABHA
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Instant Beneficiary Form - Conditionally Rendered */}
            {!hasJanAadhaar && admissionType === 'normal' &&(
              <div id="instant-beneficiary-form">
                <h5 className="step-heading">Instant Beneficiary Details</h5>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Patient Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter patient name"
                    />
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Age"
                    />
                  </div>
                  
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Gender <span className="text-danger">*</span></label>
                    <div className="single-select-group">
                      <div className="form-check">
                        <input
                          className="form-check-input single-select"
                          type="checkbox"
                          name="instant-gender"
                          id="instant-gender-male"
                          checked={gender === 'male'}
                          onChange={() => handleSingleSelect(setGender, 'male', 'gender')}
                        />
                        <label className="form-check-label" htmlFor="instant-gender-male">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input single-select"
                          type="checkbox"
                          name="instant-gender"
                          id="instant-gender-female"
                          checked={gender === 'female'}
                          onChange={() => handleSingleSelect(setGender, 'female', 'gender')}
                        />
                        <label className="form-check-label" htmlFor="instant-gender-female">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mobile No</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter mobile number"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">House No</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter house number"
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Colony/Street</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter colony/street"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Block/Ward</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter block/ward"
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Village</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter village"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Tehsil</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tehsil"
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Incident District <span className="text-danger">*</span></label>
                    <select 
                      className="form-select"
                    >
                      <option value="">- Select -</option>
                      <option value="district1">District 1</option>
                      <option value="district2">District 2</option>
                      <option value="district3">District 3</option>
                    </select>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pin Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter pin code"
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Residence State <span className="text-danger">*</span></label>
                    <select 
                      className="form-select"
                    >
                      <option value="">- Select -</option>
                      <option value="state1">State 1</option>
                      <option value="state2">State 2</option>
                      <option value="state3">State 3</option>
                    </select>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Residence District <span className="text-danger">*</span></label>
                    <select 
                      className="form-select"
                    >
                      <option value="">- Select -</option>
                      <option value="district1">District 1</option>
                      <option value="district2">District 2</option>
                      <option value="district3">District 3</option>
                    </select>
                  </div>
                </div>
                
                {/* Verification Section */}
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Verification By</label>
                    <div className="single-select-group">
                      <div className="form-check">
                        <input
                          className="form-check-input single-select"
                          type="checkbox"
                          name="verification-by"
                          id="verification-aadhaar"
                          checked={verifyMethod === 'aadhaar'}
                          onChange={() => handleSingleSelect(setVerifyMethod, 'aadhaar', 'verify-by')}
                        />
                        <label className="form-check-label" htmlFor="verification-aadhaar">
                          Aadhaar
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input single-select"
                          type="checkbox"
                          name="verification-by"
                          id="verification-moic"
                          checked={verifyMethod === 'moic'}
                          onChange={() => handleSingleSelect(setVerifyMethod, 'moic', 'verify-by')}
                        />
                        <label className="form-check-label" htmlFor="verification-moic">
                          MOIC (Medical Officer In Charge)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                  
                {/* Aadhaar Case Conditionally Rendered */}
                {verifyMethod === 'aadhaar' && (
                <div id="moic-doc-upload" className="moic-doc-upload m-0 p-3 border rounded ">
                  <div className='row'>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Aadhaar No</label>
                    <div className="d-flex align-items-center">
                      <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Aadhaar number"
                      />
                        <label className="form-check-label small" htmlFor="aadhaar-not-verified">
                          Not Verified
                        </label>
                    </div>
                  </div>
                  </div>
                </div>
              )}
                  {/* MOIC Document Upload Field - Conditionally Rendered */}
              {verifyMethod === 'moic' && (
                <div id="moic-doc-upload" className="moic-doc-upload mt-3 p-3 border rounded ">
                  <div className='row'>
                    <div className="col-md-10">
                    <label className="form-label">Upload MOIC Approved Document <span className="text-danger">*</span></label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <small className="text-muted">
                      Accepted formats: PDF, JPG, JPEG, PNG
                    </small>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label d-block">&nbsp;</label>
                      <button className="btn btn-success btn-sm me-2">
                        Upload
                      </button>
                      <button className="btn btn-secondary btn-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

                {/* Instant Approval Document Section */}
                <div className="instant-approval-section mt-4 p-3 border rounded bg-light">
                  <h5 className="mb-3">Instant Approval Document</h5>
                  <p className="small text-muted mb-3">
                    Citizen is not enrolled with MAA Yojana. In case of Emergency, an approval request form document can be uploaded and after approval from concerned District Collector or Govt. Hospitality and Medical Department (in case of Govt. hospital), citizen can avail benefits.
                  </p>
                  
                  <div className="row mb-3">
                    <div className='col-md-10'>
                    <label className="form-label">Upload Approval Document (Only PDF file, not more than 500 KB, is allowed)</label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".pdf"
                    />
                    <small className="text-muted">Maximum file size: 500 KB</small>
                    </div>
                    <div className="col-md-2">
                      <label className="form-label d-block">&nbsp;</label>
                    <button className="btn btn-success btn-sm me-2">
                      Upload
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      Cancel
                    </button>
                  </div>
                  </div>
                  

                </div>
              </div>
            )}
          </div>
        )}
        
        {currentStep === 4 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading">
              Capture Patient's Photograph or upload Patient's Photograph in
              jpg/jpeg/png/gif/bmp format
            </h4>
            <div className="row">
              <div className="col-md-6">
                <div className="photo-upload">
                  <div className="upload-icon">
                    <i className="bi bi-cloud-arrow-up" />
                  </div>
                  <h3>Upload Patient's Photograph</h3>
                  <p>Drag &amp; drop your image here or click to browse</p>
                  <p className="text-muted">
                    Supported formats: jpg, jpeg, png, gif, bmp
                  </p>
                </div>
                <div className="d-flex gap-2 flex-wrap mt-3">
                  <button className="btn btn-outline-success">
                    <i className="bi bi-camera" /> Capture
                  </button>
                  <button className="btn btn-outline-success">
                    <i className="bi bi-arrow-repeat" /> Switch Camera
                  </button>
                  <button className="btn btn-success">
                    <i className="bi bi-check-circle" /> Save
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <h5>Uploaded Photograph</h5>
                <div className="photo-preview">
                  <img
                    src="https://i.postimg.cc/C1SrTZnf/default-avatar-photo-placeholder-profile-icon-vector.jpg"
                    alt="Patient Photo Placeholder"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer>
        <button type="button" className="btn-close btn-customeclose" onClick={handleClose}> Close</button>
        {currentStep > 1 && (
          <button type="button" className="btn btn-outline-secondary" onClick={prevStep}>
            <i className="bi bi-arrow-left"></i> Back
          </button>
        )}
        {currentStep < 4 ? (
          <button type="button" className="btn btn-success" onClick={nextStep}>
            Next <i className="bi bi-arrow-right"></i>
          </button>
        ) : (
          <button type="button" className="btn btn-success" onClick={generateTid}>
            <i className="bi bi-check-circle"></i> Generate TID
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default GenerateTidModal;