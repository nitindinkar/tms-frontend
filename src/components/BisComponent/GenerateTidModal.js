import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import { Modal, Dropdown, Button } from "react-bootstrap";
import Swal from "sweetalert2"; // Import SweetAlert2
// import { getBeneficiaryDetails } from "../../framework/apiendpoint";
import {
  IDENTITY_TYPES,
  initialFormData,
  MlcCaseList,
  genderList,
  stateMaster,
  districtResponse,
} from "../../constants";

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
  const [skipContactDetail, setSkipContactDetail] = useState(false);
  const [skipMemberDetail, setSkipMemberDetail] = useState(false);
  const [errors, setErrors] = useState({});
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  console.log("Filtered Districts:", filteredDistricts);
  const [beneficiaryData, setBeneficiaryData] = useState({
    mobileNo: "7728906789",
    emailId: "Aa@gmail.com",
    houseNo: "AB-111",
    colonyStreet: "Near temple",
    wardBlock: "C090",
    village: "jodhpur",
    gramPanchayat: "C090W005",
    tehsil: "jodhpur",
    policeStation: "shyam nagar",
    districtCode: 2,
    stateCode: 8,
    pinCode: 341503,
    hofMobileNo: "7728906789",
    beneficiaryCategory: null,
    janAadhaarId: "4735561159",
    rationCardNo: "2345678901234",
    abhaNo: null,
    bhamashaAckNo: null,
    memberDetailsResp: [
      {
        janAadhaarId: null,
        janAadhaarMemberId: "36546802974",
        mobileNo: "7728906789",
        nameHindi: "भागीरथ प्रजापत",
        nameEnglish: "Bhagirath Prajapat",
        age: 26,
        dob: null,
        gender: "Male",
        relation: "Husband",
        hhid: "91864755",
        beneficiaryCategory: "INSTANT",
      },
      {
        janAadhaarId: null,
        janAadhaarMemberId: "96757250782",
        mobileNo: "7728906789",
        nameHindi: "प्रवंश प्रजापत",
        nameEnglish: "Pravansh Prajapat",
        age: 27,
        dob: null,
        gender: "Male",
        relation: "Son",
        hhid: "91864756",
        beneficiaryCategory: "INSTANT",
      },
      {
        janAadhaarId: null,
        janAadhaarMemberId: "46149464714",
        mobileNo: "7728906789",
        nameHindi: "रक्षिता",
        nameEnglish: "Rakshita",
        age: 28,
        dob: null,
        gender: "Female",
        relation: "Daughter",
        hhid: "137382590",
        beneficiaryCategory: "INSTANT",
      },
    ],
  });
  const [formData, setFormData] = useState(initialFormData);

  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);

  const getStateName = (code) => {
    const state = stateMaster.find((s) => s.stateCode === code);
    return state ? state.descriptionEnglish : "-";
  };

  const getDistrictName = (code) => {
    const district = districtResponse.find((d) => d.districtCode === code);
    return district ? district.descriptionEnglish : "-";
  };

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // When residenceState changes, filter districts
    if (name === "residenceState") {
      const filtered = districtResponse.filter(
        (district) => district.stateCode === Number(value)
      );
      setFilteredDistricts(filtered);

      // reset district when state changes
      setFormData((prev) => ({ ...prev, residenceDistrict: "" }));
    }
  };

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
      setSkipContactDetail(false);
      setSkipMemberDetail(false);
    }
  }, [show]);

  // Update skipContactDetail and skipMemberDetail based on admission type and Jan Aadhaar
  useEffect(() => {
    if (formData.admissionType === "normal") {
      // For normal admission: skip step 2 only if no Jan Aadhaar
      setSkipContactDetail(!formData.isJanAadhaar);
      setSkipMemberDetail(false);
    } else if (formData.admissionType === "emergency") {
      // For emergency admission: skip both step 2 and step 3
      setSkipContactDetail(true);
      setSkipMemberDetail(true);
    }
  }, [formData?.isJanAadhaar, formData.admissionType]);

  // Single select handler for checkbox groups
  const handleSingleSelect = (field, value) => {
    setFormData((prev) => {
      let updatedForm = { ...prev, [field]: value };

      // 🧠 1️⃣ If RTA = Yes → Admission Type = Emergency (force)
      if (field === "isRta" && value === "yes") {
        updatedForm.admissionType = "emergency";
      }

      // 🧠 2️⃣ If Admission Type = Normal → RTA must be No
      if (field === "admissionType" && value === "normal") {
        updatedForm.isRta = "no";
      }

      // 🧠 3️⃣ If RTA = No → user can choose Admission Type freely (no forced change)
      // So no automatic update needed for this case.

      return updatedForm;
    });
  };

  const hasVerifiedMember = beneficiaryData?.memberDetailsResp?.some(
    (member) => member.verifyStatus === "verified"
  );

  const nextStepFunc = () => {
    if (currentStep < 4) {
      let nextStep = currentStep + 1;

      // ✅ Emergency admission: directly generate TID (no photo step)
      if (formData.admissionType === "emergency") {
        generateTid(); // directly call success modal
        return; // stop here, no step progression
      }

      if (currentStep === 1) {
        // CASE 1: Normal admission but no Jan Aadhaar (skip contact only)
        if (skipContactDetail && !skipMemberDetail) {
          nextStep = 3;
        }
        // CASE 2: Normal admission WITH Jan Aadhaar → call API before moving ahead
        else if (!skipContactDetail && !skipMemberDetail) {
          if (
            formData.admissionType === "normal" &&
            formData.identityType &&
            formData.identityNumber
          ) {
            console.log("Calling getSearchBeneficiary()...");
            // getSearchBeneficiary();
          }
        }
      }
      // CASE 3: Skip step 3 for emergency — handled above already

      setCurrentStep(nextStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      let previousStep = currentStep - 1;

      // Handle step skipping logic when going back
      if (currentStep === 4) {
        if (skipContactDetail && skipMemberDetail) {
          // Emergency case: go back to step 1 from step 4
          previousStep = 1;
        } else if (skipContactDetail && !skipMemberDetail) {
          // Normal admission without Jan Aadhaar: go back to step 3 from step 4
          previousStep = 3;
        }
      } else if (currentStep === 3 && skipContactDetail) {
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
    if (formData.admissionType === "emergency") {
      // ✅ Only show first step (no photo capture)
      return [{ number: 1, label: "Search Beneficiary", actualStep: 1 }];
    } else if (skipContactDetail && skipMemberDetail) {
      // Normal but skipping both (theoretically shouldn't happen now)
      return [
        { number: 1, label: "Search Beneficiary", actualStep: 1 },
        { number: 2, label: "Capture Photograph", actualStep: 4 },
      ];
    } else if (skipContactDetail && !skipMemberDetail) {
      // Normal admission without Jan Aadhaar: skip contact only
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
    setFormData(initialFormData);
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
                skipContactDetail && step.actualStep === 2 ? "skipped" : ""
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
                      name="isRta"
                      id="rta-no"
                      checked={formData.isRta === "no"}
                      onChange={() => handleSingleSelect("isRta", "no")}
                    />
                    <label className="form-check-label" htmlFor="rta-no">
                      No
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input single-select"
                      type="checkbox"
                      name="isRta"
                      id="rta-yes"
                      checked={formData.isRta === "yes"}
                      onChange={() => handleSingleSelect("isRta", "yes")}
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
                        name="isJanAadhaar"
                        id="jan-yes"
                        checked={formData?.isJanAadhaar === true}
                        onChange={() =>
                          handleSingleSelect("isJanAadhaar", true)
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
                        name="isJanAadhaar"
                        id="jan-no"
                        checked={formData?.isJanAadhaar === false}
                        onChange={() =>
                          handleSingleSelect("isJanAadhaar", false)
                        }
                      />
                      <label className="form-check-label" htmlFor="jan-no">
                        No
                      </label>
                    </div>
                  </div>
                  {!formData?.isJanAadhaar && (
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
                        name="nameEnglish"
                        value={formData.nameEnglish}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div className="col-md-3 mb-2">
                      <label className="form-label">Age</label>
                      <input
                        type="number"
                        name="age"
                        className="form-control"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        name="genderId"
                        value={formData.genderId}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        {genderList.map((g) => (
                          <option key={g.genderId} value={g.genderId}>
                            {g.description}
                          </option>
                        ))}
                      </select>
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
                    <div className="col-md-12 mb-2">
                      <label className="form-label">
                        MLC Case Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select ${
                          errors.mlcCase ? "is-invalid" : ""
                        }`}
                        name="mlcCaseId"
                        value={formData.mlcCaseId}
                        onChange={handleChange}
                      >
                        <option value="">Select MLC Case</option>
                        {MlcCaseList.map((item) => (
                          <option key={item.mlcCaseId} value={item.mlcCaseId}>
                            {item.description}
                          </option>
                        ))}
                      </select>
                      {errors.mlcCase && (
                        <div className="invalid-feedback">{errors.mlcCase}</div>
                      )}
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
                            name="isPatientIdentify"
                            id="patient-unidentified"
                            checked={formData.isPatientIdentify === false}
                            onChange={() =>
                              handleSingleSelect("isPatientIdentify", false)
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
                            name="isPatientIdentify"
                            id="patient-identified"
                            checked={formData.isPatientIdentify === true}
                            onChange={() =>
                              handleSingleSelect("isPatientIdentify", true)
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
                  {formData.isPatientIdentify && (
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
                            name="identifierRelation"
                            placeholder="Enter relationship"
                            value={formData.identifierRelation}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4 mb-2">
                          <label className="form-label">Contact No.</label>
                          <input
                            type="tel"
                            name="identifierContactNo"
                            className="form-control"
                            placeholder="Enter contact number"
                            value={formData.identifierContactNo}
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
            {formData?.isJanAadhaar && formData.admissionType === "normal" && (
              <div className="row">
                <div className="col-md-4 mb-2">
                  <label className="form-label">
                    Identity Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select`}
                    name="identityType"
                    value={formData.identityType}
                    onChange={handleChange}
                  >
                    <option value="">Select Identity Type</option>
                    {IDENTITY_TYPES.map((type) => (
                      <option
                        key={type.identityTypeId}
                        value={type.identityTypeId}
                      >
                        {type.description}
                      </option>
                    ))}
                  </select>
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

        {currentStep === 2 && !skipContactDetail && (
          <div className="tab-pane fade show active">
            <h4 className="step-heading">Contact Details of Beneficiary</h4>
            <div className="row">
              <div className="col-md-4 mb-2">
                <label className="form-label">Entitlement Type</label>
                <div className="form-control bg-light">
                  {beneficiaryData?.entitlementType || "-"}
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Ration Card No</label>
                <div className="form-control bg-light">
                  {beneficiaryData?.rationCardNo || "-"}
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Mobile No</label>
                <div className="form-control bg-light">
                  {beneficiaryData?.mobileNo || "-"}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-2">
                <label className="form-label">House Number</label>
                <div className="form-control bg-light">
                  {beneficiaryData?.houseNo || "-"}
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Colony/colonyStreet</label>
                <div className="form-control bg-light">
                  {beneficiaryData?.colonyStreet || "-"}
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <label className="form-label">Block/Ward</label>
                <div className="form-control bg-light">
                  {beneficiaryData?.wardBlock || "-"}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <label className="form-label">Gram Panchayat</label>
                <div className="form-control bg-light">
                  {beneficiaryData?.gramPanchayat || "-"}
                </div>
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Village</label>
                <div className="form-control bg-light">
                  {beneficiaryData?.village || "-"}
                </div>
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Tehsil</label>
                <div className="form-control bg-light">
                  {beneficiaryData?.tehsil || "-"}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">District</label>
                <div className="form-control bg-light">
                  {getDistrictName(beneficiaryData?.districtCode)}
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label">State</label>
                <div className="form-control bg-light">
                  {getStateName(beneficiaryData?.stateCode)}
                </div>
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Pincode</label>
                <div className="form-control bg-light">
                  {beneficiaryData?.pinCode || "-"}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 ">
                <label className="form-label">Bhamasha ID</label>
                <div className="form-control bg-light">
                  {beneficiaryData?.bhamashaId || "-"}
                </div>
              </div>
              <div className="col-md-6 ">
                <label className="form-label">Jan Aadhaar ID</label>
                <div className="form-control bg-light">
                  {beneficiaryData?.janAadhaarId || "-"}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="tab-pane fade show active">
            {formData?.isJanAadhaar && (
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
                  <table className="table table-hover align-middle">
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
                      {beneficiaryData?.memberDetailsResp?.map(
                        (member, index) => {
                          const isVerified = member.verifyStatus === 1;
                          const hasVerifiedMember =
                            beneficiaryData.memberDetailsResp.some(
                              (m) => m.verifyStatus === 1
                            );
                          const disableRow = hasVerifiedMember && !isVerified;

                          return (
                            <tr
                              key={index}
                              className={
                                isVerified
                                  ? "table-success"
                                  : disableRow
                                  ? "table-secondary"
                                  : ""
                              }
                              style={{
                                opacity: disableRow ? 0.6 : 1,
                                cursor: disableRow ? "not-allowed" : "pointer",
                              }}
                              title={
                                disableRow
                                  ? "Disabled because another member is already verified"
                                  : ""
                              }
                            >
                              <td>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={selectedMemberIndex === index}
                                    onChange={() =>
                                      handleSingleMemberSelect(index)
                                    }
                                    disabled={disableRow}
                                  />
                                </div>
                              </td>
                              <td>{member.nameEnglish}</td>
                              <td>{member.nameHindi}</td>
                              <td>{member.gender}</td>
                              <td>{member.age}</td>
                              <td>{member.beneficiaryCategory}</td>
                              <td>{member.aadhaarNo}</td>
                              <td>
                                {isVerified ? (
                                  <span className="badge bg-success">
                                    Verified
                                  </span>
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
                                      disabled={
                                        disableRow ||
                                        member.verifyMethod === "moic"
                                      }
                                    >
                                      <i className="bi bi-three-dots-vertical"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Dropdown.Item href="#">
                                        <i className="bi bi-person-check" />{" "}
                                        Verify Aadhaar
                                      </Dropdown.Item>
                                      <Dropdown.Item href="#">
                                        <i className="bi bi-plus-circle" />{" "}
                                        Create ABHA
                                      </Dropdown.Item>
                                      <Dropdown.Item href="#">
                                        <i className="bi bi-arrow-repeat" />
                                        Verified/Update ABHA
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Instant Beneficiary Form - Conditionally Rendered */}
            {!formData?.isJanAadhaar && formData.admissionType === "normal" && (
              <div id="instant-beneficiary-form">
                <h5 className="step-heading">Instant Beneficiary Details</h5>

                <div className="row">
                  <div className="col-md-4 mb-2">
                    <label className="form-label">
                      Patient Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="nameEnglish"
                      className="form-control"
                      placeholder="Enter patient name"
                      value={formData.nameEnglish}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-2">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      name="age"
                      className="form-control"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-2">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      name="genderId"
                      value={formData.genderId}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      {genderList.map((g) => (
                        <option key={g.genderId} value={g.genderId}>
                          {g.description}
                        </option>
                      ))}
                    </select>
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
                    <label className="form-label">Colony/colonyStreet</label>
                    <input
                      type="text"
                      name="colonyStreet"
                      className="form-control"
                      placeholder="Enter colony/colonyStreet"
                      value={formData.colonyStreet}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-2">
                    <label className="form-label">Block/Ward</label>
                    <input
                      type="text"
                      name="wardBlock"
                      className="form-control"
                      placeholder="Enter block/ward"
                      value={formData.wardBlock}
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
                      value={formData.residenceState}
                      onChange={handleChange}
                    >
                      <option value="">Select Residence State</option>
                      {stateMaster.map((state) => (
                        <option key={state.stateCode} value={state.stateCode}>
                          {state.descriptionEnglish}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-2">
                    <label className="form-label">
                      Residence District <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      name="residenceDistrict"
                      value={formData.residenceDistrict}
                      onChange={handleChange}
                      disabled={!formData.residenceState} // ✅ disable when no state selected
                    >
                      <option value="">Select Residence District</option>
                      {filteredDistricts.map((district) => (
                        <option
                          key={district.districtCode}
                          value={district.districtCode}
                        >
                          {district.descriptionEnglish}
                        </option>
                      ))}
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
                    Emergency, an approval request form document can be uploaded
                    and after approval from concerned District Collector or
                    Govt. Hospitality and Medical Department (in case of Govt.
                    hospital), citizen can avail benefits.
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
        {currentStep < 4 && formData.admissionType === "normal" ? (
          <Button type="button" variant="success" onClick={nextStepFunc}>
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
