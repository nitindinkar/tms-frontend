import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PreAuthTIDListingForDecision from '../../components/PreAuthDecision/PreAuthTidListingForDecision';

const PreAuthorizationDecision = () => {

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Pre Authorization Decision</h1>
        </div>
        <PreAuthTIDListingForDecision/>
      </div>
    </>
  );
};

export default PreAuthorizationDecision;