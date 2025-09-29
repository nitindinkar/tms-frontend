import React, { useState } from 'react';
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
    show === true && (
      <>
        <div className="modal-backdrop fade show"></div>
        <div className={`modal fade animate__animated ${show ? 'show d-block animate__fadeInDown animate__faster' : 'animate__fadeInUp'}`}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content success-modal-content">
              <div className="success-modal-header">
                <div className="check-icon">
                  <i className="bi bi-check-lg"></i>
                </div>
                <h3 className="modal-title">TID Generated Successfully!</h3>
              </div>
              <div className="modal-body text-center p-4">
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
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default SuccessModal;
