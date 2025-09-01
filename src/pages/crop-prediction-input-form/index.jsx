import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CropTypeSelector from './components/CropTypeSelector';
import LocationSelector from './components/LocationSelector';
import SoilTypeSelector from './components/SoilTypeSelector';
import AreaSizeInput from './components/AreaSizeInput';
import WeatherDisplay from './components/WeatherDisplay';
import AdvancedOptions from './components/AdvancedOptions';
import FormProgress from './components/FormProgress';

const CropPredictionInputForm = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    cropType: '',
    state: '',
    district: '',
    soilType: '',
    area: '',
    unit: 'acres',
    irrigationMethod: '',
    fertilizerUsage: '',
    pestControl: '',
    previousYieldData: '',
    organicFarming: false
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Weather state
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('smartcrop-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Mock weather data fetch
  useEffect(() => {
    if (formData?.state && formData?.district) {
      setWeatherLoading(true);
      setWeatherError(null);
      
      // Simulate API call
      setTimeout(() => {
        const mockWeatherData = {
          location: `${formData?.district}, ${formData?.state}`,
          temperature: 28,
          humidity: 65,
          windSpeed: 12,
          rainfall: 2.5,
          lastUpdated: new Date()?.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };
        setWeatherData(mockWeatherData);
        setWeatherLoading(false);
      }, 1500);
    }
  }, [formData?.state, formData?.district]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.cropType) {
      newErrors.cropType = 'Please select a crop type';
    }

    if (!formData?.state) {
      newErrors.state = 'Please select your state';
    }

    if (!formData?.district) {
      newErrors.district = 'Please select your district';
    }

    if (!formData?.soilType) {
      newErrors.soilType = 'Please select soil type';
    }

    if (!formData?.area) {
      newErrors.area = 'Please enter farm area';
    } else if (parseFloat(formData?.area) <= 0) {
      newErrors.area = 'Area must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store form data for results page
      localStorage.setItem('crop-prediction-data', JSON.stringify({
        ...formData,
        weatherData,
        submittedAt: new Date()?.toISOString()
      }));

      // Navigate to results
      navigate('/prediction-results-dashboard');
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when field is updated
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const getCompletedFields = () => {
    return {
      cropType: !!formData?.cropType,
      state: !!formData?.state,
      district: !!formData?.district,
      soilType: !!formData?.soilType,
      area: !!formData?.area,
      unit: !!formData?.unit
    };
  };

  const isBasicFormComplete = () => {
    return formData?.cropType && formData?.state && formData?.district && 
           formData?.soilType && formData?.area && formData?.unit;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="Zap" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Crop Yield Prediction</h1>
              <p className="text-muted-foreground">Get AI-powered predictions for your farming decisions</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Progress Indicator */}
          <FormProgress 
            currentStep={1}
            totalSteps={4}
            completedFields={getCompletedFields()}
          />

          {/* Basic Information Section */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Info" size={20} className="text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Basic Information</h2>
            </div>

            <CropTypeSelector
              value={formData?.cropType}
              onChange={(value) => handleFieldChange('cropType', value)}
              error={errors?.cropType}
              disabled={loading}
            />

            <LocationSelector
              state={formData?.state}
              district={formData?.district}
              onStateChange={(value) => handleFieldChange('state', value)}
              onDistrictChange={(value) => handleFieldChange('district', value)}
              stateError={errors?.state}
              districtError={errors?.district}
              disabled={loading}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SoilTypeSelector
                value={formData?.soilType}
                onChange={(value) => handleFieldChange('soilType', value)}
                error={errors?.soilType}
                disabled={loading}
              />

              <AreaSizeInput
                area={formData?.area}
                unit={formData?.unit}
                onAreaChange={(value) => handleFieldChange('area', value)}
                onUnitChange={(value) => handleFieldChange('unit', value)}
                areaError={errors?.area}
                disabled={loading}
              />
            </div>
          </div>

          {/* Weather Information */}
          <WeatherDisplay
            weatherData={weatherData}
            loading={weatherLoading}
            error={weatherError}
          />

          {/* Advanced Options */}
          {isBasicFormComplete() && (
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Settings" size={20} className="text-accent" />
                  <h2 className="text-lg font-semibold text-foreground">Advanced Options</h2>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                >
                  {showAdvanced ? 'Hide' : 'Show'} Advanced
                </Button>
              </div>

              {showAdvanced && (
                <AdvancedOptions
                  irrigationMethod={formData?.irrigationMethod}
                  onIrrigationChange={(value) => handleFieldChange('irrigationMethod', value)}
                  fertilizerUsage={formData?.fertilizerUsage}
                  onFertilizerChange={(value) => handleFieldChange('fertilizerUsage', value)}
                  pestControl={formData?.pestControl}
                  onPestControlChange={(value) => handleFieldChange('pestControl', value)}
                  previousYieldData={formData?.previousYieldData}
                  onPreviousYieldChange={(value) => handleFieldChange('previousYieldData', value)}
                  organicFarming={formData?.organicFarming}
                  onOrganicFarmingChange={(value) => handleFieldChange('organicFarming', value)}
                  disabled={loading}
                />
              )}
            </div>
          )}

          {/* Submit Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-center sm:text-left">
                <h3 className="text-sm font-medium text-foreground mb-1">Ready for Prediction?</h3>
                <p className="text-xs text-muted-foreground">
                  Our AI will analyze your data and provide yield predictions with farming recommendations
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/saved-predictions-history')}
                  iconName="History"
                  iconPosition="left"
                  disabled={loading}
                >
                  View History
                </Button>
                
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  loading={loading}
                  iconName="Zap"
                  iconPosition="left"
                  disabled={!isBasicFormComplete()}
                  className="min-w-[160px]"
                >
                  {loading ? 'Analyzing...' : 'Get Prediction'}
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-8 bg-muted/30 border border-border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="HelpCircle" size={20} className="text-accent mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Need Help?</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Our AI prediction system analyzes multiple factors including soil type, weather patterns, 
                and farming practices to provide accurate yield forecasts.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/educational-resources-hub')}
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  Learn More
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/farm-location-mapping')}
                  iconName="Map"
                  iconPosition="left"
                >
                  Farm Mapping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropPredictionInputForm;