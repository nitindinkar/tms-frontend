import React from 'react';

const StatsCards = () => {
  return (
    <>
<div className="row mb-2">
  <div className="col stats-wrap mb-4">
    <div className="stats-card card-queries h-100">
      <div className="card-content">
        <div className="card-label">Pre-Auth Raised</div>
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
  <div className="col stats-wrap mb-4">
    <div className="stats-card card-pending h-100">
      <div className="card-content">
        <div className="card-label">Pre-Auth Approved</div>
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
  <div className="col stats-wrap mb-4">
    <div className="stats-card card-active h-100">
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
  <div className="col stats-wrap mb-4">
    <div className="stats-card card-closed h-100">
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
  <div className="col stats-wrap mb-4">
    <div className="stats-card card-total h-100">
      <div className="card-content">
        <div className="card-label">Queries</div>
        <div className="card-value">25</div>
        <div className="breakdown">
          {/* <div><strong>Pending:</strong> 5</div>
                          <div><strong>Responded:</strong> 7</div>
                          <div><strong>Rejected:</strong> 13</div> */}
        </div>
      </div>
      <div className="card-icon">
        <i className="bi bi-question-circle" />
      </div>
    </div>
  </div>
</div>
</>
  );
};

export default StatsCards;



