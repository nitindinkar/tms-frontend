import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const SuccessModal = ({ show, handleClose }) => {
  const [copied, setCopied] = useState(false);

  const copyTidToClipboard = () => {
    navigator.clipboard.writeText('567245677865').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
    });
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      centered
      className="animate__animated animate__fadeInDown animate__faster"
    >
      <Modal.Header className="success-modal-header border-0 pb-0">
        <div className="check-icon">
          <i className="bi bi-check-lg"></i>
        </div>
        <Modal.Title className="w-100 text-center">
          <h3 className="modal-title">TID Generated Successfully!</h3>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="text-center p-4">
        <p className="mb-3">The Treatment ID has been successfully generated for the beneficiary.</p>
        
        <div className="tid-display">
          <span>TID:</span>
          <code>567245677865</code>
        </div>
        
        <div className="d-flex flex-column gap-2 mt-4">
          <button className="btn btn-success">
            <i className="bi bi-file-medical"></i> Pre Authorization Request
          </button>
          
          <button className="btn btn-outline-success" onClick={copyTidToClipboard}>
            <i className="bi bi-clipboard"></i> 
            {copied ? " Copied!" : " Copy TID"}
          </button>
          
          <button className="btn btn-outline-secondary" onClick={handleClose}>
            Close
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;