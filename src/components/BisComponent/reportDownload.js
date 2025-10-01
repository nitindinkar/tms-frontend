import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ReportDownload = () => {
  const [reportPeriod, setReportPeriod] = useState("today");
  const [dateRange, setDateRange] = useState([]);

  const handlePeriodChange = (e) => {
    setReportPeriod(e.target.id);
  };

  const handleDownload = () => {
    console.log("Downloading report for:", reportPeriod);
    if (reportPeriod === "datewise") {
      console.log("Selected Range:", dateRange);
    }
    // Trigger your API call or download logic here
  };

  return (
    <div className="report-download">
      <div className="report-options d-flex align-items-center justify-content-between flex-wrap gap-2">

        {/* Left side: radios + date range */}
        <div className="d-flex align-items-center gap-2 flex-wrap">

          {[
            { id: "today", label: "Today" },
            { id: "yesterday", label: "Yesterday" },
            { id: "last7days", label: "Last 07 days" },
            { id: "last30days", label: "Last 30 days" },
            { id: "all", label: "All" },
            { id: "datewise", label: "Date Wise" },
          ].map((option) => (
            <div className="form-check mb-0" key={option.id}>
              <input
                className="form-check-input"
                type="radio"
                name="reportPeriod"
                id={option.id}
                checked={reportPeriod === option.id}
                onChange={handlePeriodChange}
              />
              <label className="form-check-label" htmlFor={option.id}>
                {option.label}
              </label>
            </div>
          ))}

          {/* Modern Date Range Picker */}
          {reportPeriod === "datewise" && (
            <div id="dateRangeWrapper">
              <div className="input-group input-group-sm">
                <Flatpickr
                  options={{
                    mode: "range",
                    dateFormat: "Y-m-d",
                  }}
                  value={dateRange}
                  onChange={(selectedDates) => setDateRange(selectedDates)}
                  className="form-control"
                  placeholder="Select Date Range"
                />
                <span className="input-group-text">
                  <i className="bi bi-calendar-event"></i>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right side: download button */}
        <div className="ms-auto">
          <button
            className="btn btn-success btn-sm"
            id="downloadReportBtn"
            onClick={handleDownload}
          >
            <i className="bi bi-download"></i> Download Report
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReportDownload;
