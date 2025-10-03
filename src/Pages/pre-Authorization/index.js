import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import TIDListingForPreAuth from '../../components/PreAuthComponent/TIDListingForPreAuth';

const PreAuthorization = () => {

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Pre Authorization Request</h1>
        </div>
                  <TIDListingForPreAuth/>

      </div>
    </>
  );
};

export default PreAuthorization;