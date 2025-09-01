import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CropPredictionInputForm from './pages/crop-prediction-input-form';
import FarmLocationMapping from './pages/farm-location-mapping';
import PredictionResultsDashboard from './pages/prediction-results-dashboard';
import EducationalResourcesHub from './pages/educational-resources-hub';
import SavedPredictionsHistory from './pages/saved-predictions-history';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CropPredictionInputForm />} />
        <Route path="/crop-prediction-input-form" element={<CropPredictionInputForm />} />
        <Route path="/farm-location-mapping" element={<FarmLocationMapping />} />
        <Route path="/prediction-results-dashboard" element={<PredictionResultsDashboard />} />
        <Route path="/educational-resources-hub" element={<EducationalResourcesHub />} />
        <Route path="/saved-predictions-history" element={<SavedPredictionsHistory />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
