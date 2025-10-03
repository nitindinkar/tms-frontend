import React from 'react';
import { useState } from 'react';
import GenerateTidModal from '../../components/BisComponent/GenerateTidModal';
import SuccessModal from '../../components/BisComponent/SuccessModal';
import StatsCards from '../../components/BisComponent/StatsCards';
import TIDListing from '../../components/BisComponent/TIDListing';
import "bootstrap/dist/css/bootstrap.min.css";


const BeneficiaryIdentification = ({ sidebarCollapsed }) => {
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
  return (
    <>
      <div className="container-fluid" setShowGenerateModal={setShowGenerateModal}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Beneficiary Identification</h1>

        </div>
        
        <StatsCards />
        <TIDListing setShowGenerateModal={setShowGenerateModal} />

      </div>

    <GenerateTidModal 
    show={showGenerateModal}
    handleClose={() => setShowGenerateModal(false)}
    showSuccess={() => {
    setShowGenerateModal(false);
    setShowSuccessModal(true);
    }}
    />
    <SuccessModal 
    show={showSuccessModal}
    handleClose={() => setShowSuccessModal(false)}
    />
    </>
  );
};

export default BeneficiaryIdentification;