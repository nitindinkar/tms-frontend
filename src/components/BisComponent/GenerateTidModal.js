import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import { Modal, Dropdown, Button } from "react-bootstrap";
import Swal from "sweetalert2"; // Import SweetAlert2

const GenerateTidModal = ({
  show,
  handleClose,
  showSuccess,
  backdropClicked,
}) => {
  // Camera states using your working logic
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const fileInputRef = useRef(null);
  const [photoSaved, setPhotoSaved] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [skipStep2, setSkipStep2] = useState(false);
  const [skipStep3, setSkipStep3] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    rtaCase: "no",
    admissionType: "normal",
    hasJanAadhaar: true,
    patientName: "",
    patientAge: "",
    gender: "",
    isMlcCase: false,
    assaultType: "",
    isPatientIdentified: false,
    identifierName: "",
    identifierRelation: "",
    identifierContact: "",
    identityType: "",
    identityNumber: "",
    entitlementType: "",
    rationCard: "",
    mobileNo: "",
    houseNumber: "",
    street: "",
    block: "",
    gramPanchayat: "",
    village: "",
    tehsil: "",
    district: "",
    stateName: "",
    pinCode: "",
    bhamashaId: "",
    janAadhaarId: "",
    memberName: "",
    memberAge: "",
    memberGender: "",
    memberRelation: "",
    memberId: "",
    photo: null,
    verifyMethod: "aadhaar",
  });

  const memberDetailsResp = [
    {
      aadhaarNo: "XXXXXXXX7906",
      abhaNo: "ABHA1234",
      nameHindi: "भगीरथ प्रजापत",
      nameEnglish: "Bhagirath Prajapat",
      gender: "Male",
      relation: "Self",
      age: 38,
      dob: "1985-01-01",
      hhid: "HH1234",
      category: "INSTANT",
      isAadhaarVerified: 1,
      verifyMethod: "aadhaar",
      verifyStatus: 1,
      aadhaarHitCount: 1,
      fmrReqCount: 0,
      assessmentYear: "2025",
    },
    {
      aadhaarNo: "XXXXXXXX8318",
      abhaNo: "ABHA5678",
      nameHindi: "प्रवंश प्रजापत",
      nameEnglish: "Pravansh Prajapat",
      gender: "Male",
      relation: "Son",
      age: 11,
      dob: "2014-05-10",
      hhid: "HH1234",
      category: "INSTANT",
      isAadhaarVerified: 0,
      verifyMethod: "aadhaar",
      verifyStatus: 0,
      aadhaarHitCount: 0,
      fmrReqCount: 0,
      assessmentYear: "2025",
    },
    {
      aadhaarNo: "XXXXXXXX8318",
      abhaNo: "ABHA5678",
      nameHindi: "प्रवंश प्रजापत",
      nameEnglish: "Pravansh Prajapat",
      gender: "Male",
      relation: "Son",
      age: 11,
      dob: "2014-05-10",
      hhid: "HH1234",
      category: "INSTANT",
      isAadhaarVerified: 0,
      verifyMethod: "aadhaar",
      verifyStatus: 0,
      aadhaarHitCount: 0,
      fmrReqCount: 0,
      assessmentYear: "2025",
    },
    {
      aadhaarNo: "XXXXXXXX8318",
      abhaNo: "ABHA5678",
      nameHindi: "प्रवंश प्रजापत",
      nameEnglish: "Pravansh Prajapat",
      gender: "Male",
      relation: "Son",
      age: 11,
      dob: "2014-05-10",
      hhid: "HH1234",
      category: "INSTANT",
      isAadhaarVerified: 0,
      verifyMethod: "aadhaar",
      verifyStatus: 0,
      aadhaarHitCount: 0,
      fmrReqCount: 0,
      assessmentYear: "2025",
    },
    // Add more members here...
  ];

  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);

  const handleSingleMemberSelect = (index) => {
    if (selectedMemberIndex === index) {
      setSelectedMemberIndex(null); // unselect if clicked again
    } else {
      setSelectedMemberIndex(index);
    }
  };

  console.log("Form Data:", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // const handleSingleSelect = (key, value) => setFormData({ ...formData, [key]: value });

  // Camera logic from your working example
  useEffect(() => {
    const enableCamera = async () => {
      try {
        setCameraError("");
        const constraints = {
          video: {
            facingMode: isFrontCamera ? "user" : "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        setCameraError(
          "Unable to access camera. Please check permissions and try again."
        );
        setStreaming(false);
      }
    };
    if (streaming) {
      enableCamera();
    }
    // Cleanup on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [streaming, isFrontCamera]);

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    setPhoto(canvas.toDataURL("image/jpeg"));
    setPhotoSaved(false); // Reset saved state when new photo is taken
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setStreaming(false);
  };

  const startCamera = () => {
    setStreaming(true);
    setPhotoSaved(false);
  };

  const switchCamera = () => {
    setIsFrontCamera(!isFrontCamera);
    if (streaming) {
      stopCamera();
      setTimeout(() => setStreaming(true), 300);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
        setPhotoSaved(false); // Reset saved state when new file is uploaded
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file (jpg, jpeg, png, gif, bmp)");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const savePhoto = () => {
    if (photo) {
      setPhotoSaved(true);
      Swal.fire({
        icon: "success",
        title: "Photo saved successfully!",
        timer: 500,
        showConfirmButton: false,
      });
    } else {
      alert("Please capture or upload a photo first.");
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    setPhotoSaved(false);
    startCamera();
  };

  // Cleanup camera when component unmounts or modal closes
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Cleanup camera when moving away from photo step
  useEffect(() => {
    if (currentStep !== 4) {
      stopCamera();
    }
  }, [currentStep]);

  // Reset form when modal closes
  useEffect(() => {
    if (!show) {
      setCurrentStep(1);
      setSkipStep2(false);
      setSkipStep3(false);
    }
  }, [show]);

  // Update skipStep2 and skipStep3 based on admission type and Jan Aadhaar
  useEffect(() => {
    if (formData.admissionType === "normal") {
      // For normal admission: skip step 2 only if no Jan Aadhaar
      setSkipStep2(!formData.hasJanAadhaar);
      setSkipStep3(false);
    } else if (formData.admissionType === "emergency") {
      // For emergency admission: skip both step 2 and step 3
      setSkipStep2(true);
      setSkipStep3(true);
    }
  }, [formData?.hasJanAadhaar, formData.admissionType]);

  // Single select handler for checkbox groups
  const handleSingleSelect = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
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
    clearStates();
    showSuccess();
  };

  // Determine which steps to display in the step indicator
  const getStepsToDisplay = () => {
    if (skipStep2 && skipStep3) {
      // Emergency case: show only step 1 and step 4
      return [
        { number: 1, label: "Search Beneficiary", actualStep: 1 },
        { number: 2, label: "Capture Photograph", actualStep: 4 },
      ];
    } else if (skipStep2 && !skipStep3) {
      // Normal admission without Jan Aadhaar: skip step 2
      return [
        { number: 1, label: "Search Beneficiary", actualStep: 1 },
        { number: 2, label: "Instant Beneficiary", actualStep: 3 },
        { number: 3, label: "Capture Photograph", actualStep: 4 },
      ];
    } else {
      // Normal admission with Jan Aadhaar: show all steps
      return [
        { number: 1, label: "Search Beneficiary", actualStep: 1 },
        { number: 2, label: "Contact Details", actualStep: 2 },
        { number: 3, label: "Member Details", actualStep: 3 },
        { number: 4, label: "Capture Photograph", actualStep: 4 },
      ];
    }
  };

  const clearStates = () => {
    stopCamera();
    handleClose();
    setPhoto(null);
    setStreaming(false);
    setCameraError("");
    setIsFrontCamera(false);
    fileInputRef.current = null;
    setPhotoSaved(false);
  };

  const stepsToDisplay = getStepsToDisplay();
  return (
    <Modal
      show={show}
      onHide={clearStates}
      size="xl"
      className="animate__animated animate__fadeInDown animate__faster"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Generate New TID</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Step Indicator */}
        <div className="step-indicator mb-2">
          {stepsToDisplay.map((step) => (
            <div
              key={step.actualStep}
              className={`step ${
                currentStep === step.actualStep ? "active" : ""
              } ${currentStep > step.actualStep ? "completed" : ""} ${
                skipStep2 && step.actualStep === 2 ? "skipped" : ""
              }`}
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
                <label className="form-label">
                  Road Traffic Accident (RTA) Case{" "}
                  <span className="text-danger">*</span>
                </label>
                <div className="single-select-group">
                  <div className="form-check">
                    <input
                      className="form-check-input single-select"
                      type="checkbox"
                      name="rtaCase"
                      id="rta-no"
                      checked={formData.rtaCase === "no"}
                      onChange={() => handleSingleSelect("rtaCase", "no")}
                    />
                    <label className="form-check-label" htmlFor="rta-no">
                      No
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input single-select"
                      type="checkbox"
                      name="rtaCase"
                      id="rta-yes"
                      checked={formData.rtaCase === "yes"}
                      onChange={() => handleSingleSelect("rtaCase", "yes")}
                    />
                    <label className="form-check-label" htmlFor="rta-yes">
                      Yes
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Admission Type <span className="text-danger">*</span>
                </label>
                <div className="single-select-group">
                  <div className="form-check">
                    <input
                      className="form-check-input single-select"
                      type="checkbox"
                      name="admissionType"
                      id="admission-normal"
                      checked={formData.admissionType === "normal"}
                      onChange={() =>
                        handleSingleSelect("admissionType", "normal")
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="admission-normal"
                    >
                      Normal
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input single-select"
                      type="checkbox"
                      name="admissionType"
                      id="admission-emergency"
                      checked={formData.admissionType === "emergency"}
                      onChange={() =>
                        handleSingleSelect("admissionType", "emergency")
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="admission-emergency"
                    >
                      Emergency
                    </label>
                  </div>
                </div>
              </div>
              {formData.admissionType === "normal" && (
                <div className="col-md-4">
                  <label className="form-label">
                    Do you have Jan Aadhaar ID?{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <div className="single-select-group">
                    <div className="form-check">
                      <input
                        className="form-check-input single-select"
                        type="checkbox"
                        name="hasJanAadhaar"
                        id="jan-yes"
                        checked={formData?.hasJanAadhaar === true}
                        onChange={() =>
                          handleSingleSelect("hasJanAadhaar", true)
                        }
                      />
                      <label className="form-check-label" htmlFor="jan-yes">
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input single-select"
                        type="checkbox"
                        name="hasJanAadhaar"
                        id="jan-no"
                        checked={formData?.hasJanAadhaar === false}
                        onChange={() =>
                          handleSingleSelect("hasJanAadhaar", false)
                        }
                      />
                      <label className="form-check-label" htmlFor="jan-no">
                        No
                      </label>
                    </div>
                  </div>
                  {!formData?.hasJanAadhaar && (
                    <div className="alert alert-info mt-2 small">
                      <i className="bi bi-info-circle"></i> Step 2 will be
                      skipped as you don't have Jan Aadhaar ID.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Emergency Form - Conditionally Rendered */}
            {formData.admissionType === "emergency" && (
              <div
                id="emergency-form"
                className="emergency-form p-3 border rounded"
              >
                <div className="emergency-section">
                  <h5>Patient Details</h5>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <label className="form-label">Patient Name</label>
                      <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div className="col-md-3 mb-2">
                      <label className="form-label">Age</label>
                      <input
                        type="number"
                        name="patientAge"
                        className="form-control"
                        placeholder="Age"
                        value={formData.patientAge}
                        onChange={handleChange}
                      />
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
                            checked={formData.gender === "male"}
                            onChange={() =>
                              handleSingleSelect("gender", "male")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="gender-male"
                          >
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
                            checked={formData.gender === "female"}
                            onChange={() =>
                              handleSingleSelect("gender", "female")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="gender-female"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="emergency-section">
                  <h5>Medico-Legal Case (MLC)</h5>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="single-select-group">
                        <div className="form-check">
                          <input
                            className="form-check-input single-select"
                            type="checkbox"
                            name="isMlcCase"
                            id="mlc-yes"
                            checked={formData.isMlcCase === true}
                            onChange={() =>
                              handleSingleSelect("isMlcCase", true)
                            }
                          />
                          <label className="form-check-label" htmlFor="mlc-yes">
                            Yes
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input single-select"
                            type="checkbox"
                            name="isMlcCase"
                            id="mlc-no"
                            checked={formData.isMlcCase === false}
                            onChange={() =>
                              handleSingleSelect("isMlcCase", false)
                            }
                          />
                          <label className="form-check-label" htmlFor="mlc-no">
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MLC Details - Conditionally Rendered */}
                  {formData.isMlcCase && (
                    <div
                      id="mlc-details"
                      className="mlc-details bg-light rounded"
                    >
                      <div className="row">
                        <div className="col-md-12 mb-2">
                          <label className="form-label">
                            Assault And Battery, Including Domestic Violence
                          </label>
                          <select className="form-select">
                            <option>
                              Assault And Battery, Including Domestic Violence
                            </option>
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
                            name="isPatientIdentified"
                            id="patient-unidentified"
                            checked={formData.isPatientIdentified === false}
                            onChange={() =>
                              handleSingleSelect("isPatientIdentified", false)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="patient-unidentified"
                          >
                            Un-identified
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input single-select"
                            type="checkbox"
                            name="isPatientIdentified"
                            id="patient-identified"
                            checked={formData.isPatientIdentified === true}
                            onChange={() =>
                              handleSingleSelect("isPatientIdentified", true)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="patient-identified"
                          >
                            Identified
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Identification Details - Conditionally Rendered */}
                  {formData.isPatientIdentified && (
                    <div
                      id="identification-details"
                      className="identification-details bg-light rounded"
                    >
                      <h5>Details of Person Identifying Patient</h5>
                      <div className="row">
                        <div className="col-md-4 mb-2">
                          <label className="form-label">
                            Name of the Person Identifying Patient
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="identifierName"
                            placeholder="Enter name"
                            value={formData.identifierName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4 mb-2">
                          <label className="form-label">
                            Relationship with Patient
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="relationshipWithPatient"
                            placeholder="Enter relationship"
                            value={formData.relationshipWithPatient}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4 mb-2">
                          <label className="form-label">Contact No.</label>
                          <input
                            type="tel"
                            name="identifierContact"
                            className="form-control"
                            placeholder="Enter contact number"
                            value={formData.identifierContact}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Identity Details - Conditionally Shown */}
            {formData?.hasJanAadhaar && formData.admissionType === "normal" && (
              <div className="row">
                <div className="col-md-4 mb-2">
                  <label className="form-label">
                    Identity Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      errors.identityType ? "is-invalid" : ""
                    }`}
                    name="identityType"
                    value={formData.identityType}
                    onChange={handleChange}
                  >
                    <option value="">Select Identity Type</option>
                    <option value="aadhaar">Aadhaar Card</option>
                    <option value="driving">Driving License</option>
                    <option value="voter">Voter ID</option>
                    <option value="pan">PAN Card</option>
                  </select>
                  {errors.identityType && (
                    <div className="invalid-feedback">
                      {errors.identityType}
                    </div>
                  )}
                </div>

                <div className="col-md-4 mb-2">
                  <label className="form-label">
                    Identity Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.identityNumber ? "is-invalid" : ""
                    }`}
                    name="identityNumber"
                    value={formData.identityNumber}
                    onChange={handleChange}
                    placeholder="Enter Identity Number"
                  />
                  {errors.identityNumber && (
                    <div className="invalid-feedback">
                      {errors.identityNumber}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && !skipStep2 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading">Contact Details of Beneficiary</h4>
            <div className="row">
              <div className="col-md-4 mb-2">
                <label className="form-label">Entitlement Type</label>
                <div className="form-control bg-light">NFSA</div>
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Ration Card No</label>
                <div className="form-control bg-light">123456789</div>
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Mobile No</label>
                <div className="form-control bg-light">123456789</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-2">
                <label className="form-label">House Number</label>
                <div className="form-control bg-light">123</div>
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Colony/Street</label>
                <div className="form-control bg-light">ABCD Colony</div>
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Block/Ward</label>
                <div className="form-control bg-light">Ward No 26</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <label className="form-label">Gram Panchayat</label>
                <div className="form-control bg-light">Abc Grampanchayat</div>
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Village</label>
                <div className="form-control bg-light">ABC Village</div>
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Tehsil</label>
                <div className="form-control bg-light">ABCD</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <label className="form-label">District</label>
                <div className="form-control bg-light">Abc District</div>
              </div>
              <div className="col-md-4 ">
                <label className="form-label">State</label>
                <div className="form-control bg-light">Rajasthan</div>
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Pincode</label>
                <div className="form-control bg-light">303303</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 ">
                <label className="form-label">Bhamasha ID</label>
                <div className="form-control bg-light">ABCDEFGH</div>
              </div>
              <div className="col-md-6 ">
                <label className="form-label">Jan Aadhaar ID</label>
                <div className="form-control bg-light">4XXXXXXXX88</div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="tab-pane fade show active">
            {formData?.hasJanAadhaar && (
              <>
                <h4 className="step-heading">Member Details of Beneficiary</h4>
                {/* Verify By Field */}
                <div className="row">
                  <div className="col-md-12">
                    <label className="form-label">
                      Verify By? <span className="text-danger">*</span>
                    </label>
                    <div className="single-select-group">
                      <div className="form-check">
                        <input
                          className="form-check-input single-select"
                          type="checkbox"
                          name="verifyMethod"
                          id="verify-aadhaar"
                          checked={formData.verifyMethod === "aadhaar"}
                          onChange={() =>
                            handleSingleSelect("verifyMethod", "aadhaar")
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="verify-aadhaar"
                        >
                          Aadhaar
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input single-select"
                          type="checkbox"
                          name="verifyMethod"
                          id="verify-moic"
                          checked={formData.verifyMethod === "moic"}
                          onChange={() =>
                            handleSingleSelect("verifyMethod", "moic")
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="verify-moic"
                        >
                          Medical Officer In Charge (MOIC)
                        </label>
                      </div>
                    </div>

                    {/* MOIC Document Upload Field - Conditionally Rendered */}
                    {formData.verifyMethod === "moic" && (
                      <div
                        id="moic-doc-upload"
                        className="moic-doc-upload mt-3 p-3 border rounded "
                      >
                        <div className="row">
                          <div className="col-md-10">
                            <label className="form-label">
                              Upload MOIC Approved Document{" "}
                              <span className="text-danger">*</span>
                            </label>
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
                        <th>Select</th>
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
                      {memberDetailsResp.map((member, index) => (
                        <tr key={index}>
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedMemberIndex === index}
                                onChange={() => handleSingleMemberSelect(index)}
                              />
                            </div>
                          </td>
                          <td>{member.nameEnglish}</td>
                          <td>{member.nameHindi}</td>
                          <td>{member.gender}</td>
                          <td>{member.age}</td>
                          <td>{member.category}</td>
                          <td>{member.aadhaarNo}</td>
                          <td>
                            {member.verifyStatus === 1 ? (
                              <span className="badge bg-success">Verified</span>
                            ) : (
                              <span className="badge bg-warning text-dark">
                                Pending
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="dropdown">
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="outline-secondary"
                                  size="sm"
                                  disabled={member.verifyMethod === "moic"}
                                >
                                  <i className="bi bi-three-dots-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">
                                    <i className="bi bi-person-check" /> Verify
                                    Aadhaar
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    <i className="bi bi-plus-circle" /> Create
                                    ABHA
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#">
                                    <i className="bi bi-arrow-repeat" />{" "}
                                    Verified/Update ABHA
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Instant Beneficiary Form - Conditionally Rendered */}
            {!formData?.hasJanAadhaar &&
              formData.admissionType === "normal" && (
                <div id="instant-beneficiary-form">
                  <h5 className="step-heading">Instant Beneficiary Details</h5>

                  <div className="row">
                    <div className="col-md-4 mb-2">
                      <label className="form-label">
                        Patient Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="patientName"
                        className="form-control"
                        placeholder="Enter patient name"
                        value={formData.patientName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label">Age</label>
                      <input
                        type="number"
                        name="patientAge"
                        className="form-control"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label">
                        Gender <span className="text-danger">*</span>
                      </label>
                      <div className="single-select-group">
                        <div className="form-check">
                          <input
                            className="form-check-input single-select"
                            type="checkbox"
                            name="gender"
                            id="instant-gender-male"
                            checked={formData.gender === "male"}
                            onChange={() =>
                              handleSingleSelect("gender", "male")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="instant-gender-male"
                          >
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input single-select"
                            type="checkbox"
                            name="gender"
                            id="instant-gender-female"
                            checked={formData.gender === "female"}
                            onChange={() =>
                              handleSingleSelect("gender", "female")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="instant-gender-female"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label">Mobile No</label>
                      <input
                        type="tel"
                        name="mobileNo"
                        className="form-control"
                        placeholder="Enter mobile number"
                        value={formData.mobileNo}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label">House No</label>
                      <input
                        type="text"
                        name="houseNo"
                        className="form-control"
                        placeholder="Enter house number"
                        value={formData.houseNo}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label">Colony/Street</label>
                      <input
                        type="text"
                        name="colonyStreet"
                        className="form-control"
                        placeholder="Enter colony/street"
                        value={formData.colonyStreet}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label">Block/Ward</label>
                      <input
                        type="text"
                        name="blockWard"
                        className="form-control"
                        placeholder="Enter block/ward"
                        value={formData.blockWard}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label">Village</label>
                      <input
                        type="text"
                        name="village"
                        className="form-control"
                        placeholder="Enter village"
                        value={formData.village}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mb-2">
                      <label className="form-label">Tehsil</label>
                      <input
                        type="text"
                        name="tehsil"
                        className="form-control"
                        placeholder="Enter tehsil"
                        value={formData.tehsil}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label">
                        Incident District <span className="text-danger">*</span>
                      </label>
                      <select className="form-select">
                        <option value="">- Select -</option>
                        <option value="district1">District 1</option>
                        <option value="district2">District 2</option>
                        <option value="district3">District 3</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label">Pin Code</label>
                      <input
                        type="text"
                        name="pinCode"
                        className="form-control"
                        placeholder="Enter pin code"
                        value={formData.pinCode}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label">
                        Residence State <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="residenceState"
                        onChange={handleChange}
                        value={formData.residenceState}
                      >
                        <option value="">- Select -</option>
                        <option value="state1">State 1</option>
                        <option value="state2">State 2</option>
                        <option value="state3">State 3</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-2">
                      <label className="form-label">
                        Residence District
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="residenceDistrict"
                        onChange={handleChange}
                        value={formData.residenceDistrict}
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
                            name="verifyMethod"
                            id="verification-aadhaar"
                            checked={formData.verifyMethod === "aadhaar"}
                            onChange={() =>
                              handleSingleSelect("verifyMethod", "aadhaar")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="verification-aadhaar"
                          >
                            Aadhaar
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input single-select"
                            type="checkbox"
                            name="verifyMethod"
                            id="verification-moic"
                            checked={formData.verifyMethod === "moic"}
                            onChange={() =>
                              handleSingleSelect("verifyMethod", "moic")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="verification-moic"
                          >
                            Medical Officer In Charge (MOIC)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Aadhaar Case Conditionally Rendered */}
                  {formData.verifyMethod === "aadhaar" && (
                    <div
                      id="moic-doc-upload"
                      className="moic-doc-upload m-0 p-3 border rounded "
                    >
                      <div className="row">
                        <div className="col-md-12 mb-2">
                          <label className="form-label">Aadhaar No</label>
                          <div className="d-flex align-items-center">
                            <input
                              type="text"
                              className="form-control me-2"
                              placeholder="Aadhaar number"
                            />
                            <label
                              className="form-check-label small"
                              htmlFor="aadhaar-not-verified"
                            >
                              Not Verified
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* MOIC Document Upload Field - Conditionally Rendered */}
                  {formData.verifyMethod === "moic" && (
                    <div
                      id="moic-doc-upload"
                      className="moic-doc-upload mt-3 p-3 border rounded "
                    >
                      <div className="row">
                        <div className="col-md-10">
                          <label className="form-label">
                            Upload MOIC Approved Document{" "}
                            <span className="text-danger">*</span>
                          </label>
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
                  <div className="instant-approval-section mt-3 p-3 border rounded bg-light">
                    <h5 className="mb-3">Instant Approval Document</h5>
                    <p className="small text-muted mb-3">
                      Citizen is not enrolled with MAA Yojana. In case of
                      Emergency, an approval request form document can be
                      uploaded and after approval from concerned District
                      Collector or Govt. Hospitality and Medical Department (in
                      case of Govt. hospital), citizen can avail benefits.
                    </p>

                    <div className="row mb-3">
                      <div className="col-md-10">
                        <label className="form-label">
                          Upload Approval Document (Only PDF file, not more than
                          500 KB, is allowed)
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          accept=".pdf"
                        />
                        <small className="text-muted">
                          Maximum file size: 500 KB
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
                </div>
              )}
          </div>
        )}

        {currentStep === 4 && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading">
              Capture Patient's Photograph or Upload Patient's Photograph in
              jpg/jpeg/png/gif/bmp Format
            </h4>
            <div className="row">
              <div className="col-md-6">
                {/* Camera View */}
                {streaming ? (
                  <div className="camera-view">
                    <div className="photo-preview mb-3">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          backgroundColor: "#000",
                        }}
                      />
                    </div>
                    <div className="camera-controls">
                      <div className="d-flex gap-2 flex-wrap justify-content-center">
                        <button
                          className="btn btn-success btn-lg"
                          onClick={takePhoto}
                        >
                          <i className="bi bi-camera-fill me-2"></i>
                          Capture Photo
                        </button>
                        <button
                          className="btn btn-outline-success"
                          onClick={switchCamera}
                          disabled={!streaming}
                        >
                          <i className="bi bi-arrow-repeat me-2"></i>
                          Switch Camera
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={stopCamera}
                        >
                          <i className="bi bi-x-circle me-2"></i> Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : photo ? (
                  <div className="captured-photo-section">
                    <div className="photo-preview mb-3">
                      <img
                        src={photo}
                        alt="Captured Patient"
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                    <div className="d-flex gap-2 justify-content-center">
                      {!photoSaved ? (
                        <>
                          <button
                            className="btn btn-success"
                            onClick={savePhoto}
                          >
                            <i className="bi bi-check-circle me-2"></i>
                            Save
                          </button>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={retakePhoto}
                          >
                            <i className="bi bi-arrow-repeat me-2"></i>
                            Retake
                          </button>
                        </>
                      ) : (
                        <div className="alert alert-success w-100 text-center">
                          <i className="bi bi-check-circle me-2"></i>
                          Photo saved successfully!
                          <div className="mt-2">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={retakePhoto}
                            >
                              <i className="bi bi-arrow-repeat me-1"></i>
                              Take New Photo
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="upload-section">
                    <div
                      className="photo-upload"
                      onClick={triggerFileInput}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="upload-icon">
                        <i className="bi bi-cloud-arrow-up"></i>
                      </div>
                      <h3>Upload Patient's Photograph</h3>
                      <p>Click here to upload an image</p>
                      <p className="text-muted">
                        Supported formats: jpg, jpeg, png, gif, bmp
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                    <div className="camera-controls mt-4">
                      <div className="d-flex gap-2 flex-wrap justify-content-center">
                        <button
                          className="btn btn-success btn-lg"
                          onClick={startCamera}
                        >
                          <i className="bi bi-camera-video me-2"></i>
                          Open Camera
                        </button>
                        <button
                          className="btn btn-outline-success"
                          onClick={switchCamera}
                          disabled={!streaming}
                        >
                          <i className="bi bi-arrow-repeat me-2"></i>
                          Switch Camera
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={stopCamera}
                        >
                          <i className="bi bi-x-circle me-2"></i> Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {cameraError && (
                  <div className="alert alert-danger mt-3" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {cameraError}
                    <div className="mt-2">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={startCamera}
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <h5>Photo Preview</h5>
                <div className="photo-preview mb-3">
                  {photo && photoSaved ? (
                    <img
                      src={photo}
                      alt="Captured Patient"
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <div className="col-md-6">
                      <h5>Uploaded Photograph</h5>
                      <div className="photo-preview mb-3">
                        {photo && photoSaved ? (
                          <img
                            src={photo}
                            alt="Captured Patient"
                            style={{
                              width: "100%",
                              height: "300px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        ) : (
                          <img
                            src="https://i.postimg.cc/C1SrTZnf/default-avatar-photo-placeholder-profile-icon-vector.jpg"
                            alt="Patient Photo Placeholder"
                            style={{
                              width: "100%",
                              height: "300px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        )}
                      </div>

                      {photo && photoSaved && (
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => {
                              setPhoto(null);
                              setPhotoSaved(false);
                            }}
                          >
                            <i className="bi bi-trash me-1"></i> Remove Photo
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {photo && photoSaved && (
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setPhoto(null);
                        setPhotoSaved(false);
                      }}
                    >
                      <i className="bi bi-trash me-1"></i> Remove Photo
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Hidden canvas for capturing photos */}
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          className="btn-close btn-customeclose"
          onClick={clearStates}
        >
          {" "}
          Close
        </button>
        {currentStep > 1 && (
          <Button type="button" variant="outline-secondary" onClick={prevStep}>
            <i className="bi bi-arrow-left"></i> Back
          </Button>
        )}
        {currentStep < 4 ? (
          <Button type="button" variant="success" onClick={nextStep}>
            Next <i className="bi bi-arrow-right"></i>
          </Button>
        ) : (
          <Button type="button" variant="success" onClick={generateTid}>
            <i className="bi bi-check-circle"></i> Generate TID
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default GenerateTidModal;
