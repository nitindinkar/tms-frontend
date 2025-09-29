import React from 'react';

const StatsCards = () => {
  return (
<div className="row mb-4">
  <div className="col-xl-3 col-md-6 mb-4">
    <div className="stats-card card-pending">
      <div className="card-content">
        <div className="card-label">Preauthorization Raised</div>
        <div className="card-value">62</div>
        <div className="breakdown">
          <div>
            <strong>Today:</strong> 10
          </div>
          <div>
            <strong>Yesterday:</strong> 12
          </div>
          <div>
            <strong>Last week:</strong> 40
          </div>
        </div>
      </div>
      <div className="card-icon">
        <i className="bi bi-clock-history" />
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-6 mb-4">
    <div className="stats-card card-active">
      <div className="card-content">
        <div className="card-label">Preauthorization Approved</div>
        <div className="card-value">62</div>
        <div className="breakdown">
          <div>
            <strong>Today:</strong> 10
          </div>
          <div>
            <strong>Yesterday:</strong> 12
          </div>
          <div>
            <strong>Last week:</strong> 40
          </div>
        </div>
      </div>
      <div className="card-icon">
        <i className="bi bi-check-circle" />
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-6 mb-4">
    <div className="stats-card card-closed">
      <div className="card-content">
        <div className="card-label">DM Approval</div>
        <div className="card-value">62</div>
        <div className="breakdown">
          <div>
            <strong>Today:</strong> 10
          </div>
          <div>
            <strong>Yesterday:</strong> 12
          </div>
          <div>
            <strong>Last week:</strong> 40
          </div>
        </div>
      </div>
      <div className="card-icon">
        <i className="bi bi-archive" />
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-6 mb-4">
    <div className="stats-card card-total">
      <div className="card-content">
        <div className="card-label">Fund Enhancement</div>
        <div className="card-value">62</div>
        <div className="breakdown">
          <div>
            <strong>Today:</strong> 10
          </div>
          <div>
            <strong>Yesterday:</strong> 12
          </div>
          <div>
            <strong>Last week:</strong> 40
          </div>
        </div>
      </div>
      <div className="card-icon">
        <i className="bi bi-collection" />
      </div>
    </div>
  </div>
</div>
  );
};

export default StatsCards;



