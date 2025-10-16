import React from "react";
import { useState } from "react";
import GenerateTidModal from "../../components/BisComponent/GenerateTidModal";
import SuccessModal from "../../components/BisComponent/SuccessModal";
import StatsCards from "../../components/BisComponent/StatsCards";
import TIDListing from "../../components/BisComponent/TIDListing";
import "bootstrap/dist/css/bootstrap.min.css";

const BeneficiaryIdentification = ({ sidebarCollapsed }) => {
  const [modalState, setModalState] = useState("none");
  // 'none' | 'generate' | 'success'

  const openGenerateModal = () => setModalState("generate");
  const openSuccessModal = () => setModalState("success");
  const closeModal = () => setModalState("none");

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Beneficiary Identification</h1>
        </div>

        <StatsCards />
        <TIDListing setShowGenerateModal={() => setModalState("generate")} />
      </div>

      {/* Render only one modal at a time */}
      {modalState === "generate" && (
        <GenerateTidModal
          show={true}
          handleClose={closeModal}
          showSuccess={() => setModalState("success")}
        />
      )}

      {modalState === "success" && (
        <SuccessModal show={true} handleClose={closeModal} />
      )}
    </>
  );
};

export default BeneficiaryIdentification;
