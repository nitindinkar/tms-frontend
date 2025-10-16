import React, { Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';

const Layout =  React.lazy(() => import('./Pages/layout/index'));
const Login =  React.lazy(() => import('./Pages/login/index'));
const BeneficiaryIdentification =  React.lazy(() => import('./Pages/beneficiaryIdentification/index'));
const PreAuthorization =  React.lazy(() => import('./Pages/pre-Authorization/index'));
const PreAuthorizationDecision = React.lazy(() => import('./Pages/pre-Authorization-Decision/index'));


const isAuthenticated = () => {
  // Replace this with real authentication check logic
 // return Cookies.get('isAuthenticated') === "true";
 return true;
};
const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/" element={<Login />} />
          
          {/* Admin routes */}
          <Route path="/" element={<PrivateRoute element={<Layout />} />}>
          <Route path="beneficiary-identification" element={<BeneficiaryIdentification />} />
          <Route path="pre-authorization" element={<PreAuthorization />} />
          <Route path='pre-authorization-decision' element={<PreAuthorizationDecision/>} />
            
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
