import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PredictionCard from './components/PredictionCard';
import ChartsSection from './components/ChartsSection';
import RecommendationsSection from './components/RecommendationsSection';
import WeatherForecast from './components/WeatherForecast';
import ActionButtons from './components/ActionButtons';
import BottomNavigation from './components/BottomNavigation';
import Icon from '../../components/AppIcon';

const PredictionResultsDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Mock prediction data
  const predictionData = {
    id: "pred_2025_001",
    cropType: "Rice (Basmati)",
    season: "Kharif 2025",
    expectedYield: 4.2,
    unit: "tonnes",
    areaUnit: "hectare",
    minYield: 3.8,
    maxYield: 4.6,
    confidence: 87,
    districtAverage: 3.5,
    stateAverage: 3.2,
    performanceIndicator: 20,
    location: {
      district: "Guntur",
      state: "Andhra Pradesh",
      coordinates: { lat: 16.3067, lng: 80.4365 }
    },
    inputData: {
      soilType: "Clay Loam",
      area: 2.5,
      previousCrop: "Wheat",
      irrigationType: "Drip"
    },
    generatedAt: new Date()?.toISOString()
  };

  // Mock historical data for charts
  const historicalData = [
    { year: "2020", yield: 3.2, rainfall: 850, temperature: 28 },
    { year: "2021", yield: 3.8, rainfall: 920, temperature: 29 },
    { year: "2022", yield: 3.5, rainfall: 780, temperature: 30 },
    { year: "2023", yield: 4.0, rainfall: 890, temperature: 28 },
    { year: "2024", yield: 3.9, rainfall: 910, temperature: 29 },
    { year: "2025*", yield: 4.2, rainfall: 900, temperature: 28 }
  ];

  // Mock weather data for charts
  const weatherData = [
    { month: "Jan", temperature: 25, rainfall: 15 },
    { month: "Feb", temperature: 28, rainfall: 10 },
    { month: "Mar", temperature: 32, rainfall: 20 },
    { month: "Apr", temperature: 35, rainfall: 45 },
    { month: "May", temperature: 38, rainfall: 85 },
    { month: "Jun", temperature: 35, rainfall: 120 },
    { month: "Jul", temperature: 32, rainfall: 180 },
    { month: "Aug", temperature: 31, rainfall: 160 },
    { month: "Sep", temperature: 30, rainfall: 140 },
    { month: "Oct", temperature: 28, rainfall: 95 },
    { month: "Nov", temperature: 26, rainfall: 35 },
    { month: "Dec", temperature: 24, rainfall: 20 }
  ];

  // Mock weather forecast
  const forecastData = [
    {
      condition: "partlyCloudy",
      temperature: 28,
      maxTemp: 32,
      minTemp: 24,
      humidity: 75,
      windSpeed: 12,
      rainfall: 5,
      alert: null
    },
    {
      condition: "rainy",
      temperature: 26,
      maxTemp: 29,
      minTemp: 23,
      humidity: 85,
      windSpeed: 15,
      rainfall: 25,
      alert: {
        title: "Heavy Rainfall Expected",
        description: "Postpone fertilizer application until after rain"
      }
    },
    {
      condition: "cloudy",
      temperature: 27,
      maxTemp: 30,
      minTemp: 24,
      humidity: 70,
      windSpeed: 10,
      rainfall: 0
    },
    {
      condition: "sunny",
      temperature: 30,
      maxTemp: 34,
      minTemp: 26,
      humidity: 60,
      windSpeed: 8,
      rainfall: 0
    },
    {
      condition: "partlyCloudy",
      temperature: 29,
      maxTemp: 33,
      minTemp: 25,
      humidity: 65,
      windSpeed: 11,
      rainfall: 2
    },
    {
      condition: "sunny",
      temperature: 31,
      maxTemp: 35,
      minTemp: 27,
      humidity: 55,
      windSpeed: 9,
      rainfall: 0
    },
    {
      condition: "cloudy",
      temperature: 28,
      maxTemp: 31,
      minTemp: 25,
      humidity: 72,
      windSpeed: 13,
      rainfall: 8
    }
  ];

  // Mock recommendations
  const recommendations = [
    {
      id: "irrigation",
      type: "irrigation",
      title: "Irrigation Management",
      summary: "Optimize water usage for maximum yield",
      priority: "high",
      description: `Based on your soil type (Clay Loam) and current weather patterns, implement a strategic irrigation schedule. Clay loam retains moisture well but requires careful water management to prevent waterlogging.\n\nYour drip irrigation system is ideal for precise water delivery. Monitor soil moisture levels daily and adjust irrigation frequency based on weather conditions.`,
      timeline: [
        {
          action: "Install soil moisture sensors",
          timing: "Week 1",
          details: "Place sensors at 15cm and 30cm depth"
        },
        {
          action: "Begin controlled irrigation",
          timing: "Week 2-4",
          details: "2-3 times per week, 25-30mm each session"
        },
        {
          action: "Increase frequency during flowering",
          timing: "Week 8-12",
          details: "Daily irrigation, 15-20mm per session"
        },
        {
          action: "Reduce before harvest",
          timing: "Week 16-18",
          details: "Stop irrigation 2 weeks before harvest"
        }
      ],
      benefits: [
        "20% water savings compared to flood irrigation",
        "Reduced risk of fungal diseases",
        "Better nutrient uptake efficiency",
        "Improved grain quality"
      ]
    },
    {
      id: "fertilization",
      type: "fertilization",
      title: "Nutrient Management",
      summary: "Balanced fertilization for optimal growth",
      priority: "high",
      description: `Your clay loam soil has good nutrient retention capacity. Apply fertilizers in split doses to match crop nutrient demand and minimize losses.\n\nBased on soil analysis and crop requirements, follow the recommended NPK schedule with organic matter incorporation for sustained soil health.`,
      timeline: [
        {
          action: "Basal fertilizer application",
          timing: "At sowing",
          details: "50% Nitrogen, 100% Phosphorus, 50% Potash"
        },
        {
          action: "First top dressing",
          timing: "3-4 weeks after sowing",
          details: "25% Nitrogen with micronutrients"
        },
        {
          action: "Second top dressing",
          timing: "6-7 weeks after sowing",
          details: "25% Nitrogen and 50% Potash"
        },
        {
          action: "Foliar spray",
          timing: "During grain filling",
          details: "Zinc and Iron chelated fertilizers"
        }
      ],
      benefits: [
        "Improved nutrient use efficiency",
        "Enhanced grain filling",
        "Better plant vigor and disease resistance",
        "Increased protein content"
      ]
    },
    {
      id: "pestControl",
      type: "pestControl",
      title: "Integrated Pest Management",
      summary: "Preventive pest and disease control",
      priority: "medium",
      description: `Implement integrated pest management (IPM) practices to protect your crop from major pests and diseases common in your region.\n\nRegular monitoring and early intervention are key to successful pest management. Use biological controls wherever possible and chemical pesticides only when necessary.`,
      timeline: [
        {
          action: "Install pheromone traps",
          timing: "Week 1",
          details: "For stem borer and leaf folder monitoring"
        },
        {
          action: "Weekly field scouting",
          timing: "Throughout season",
          details: "Check for pest eggs, larvae, and disease symptoms"
        },
        {
          action: "Biological control release",
          timing: "Week 4-6",
          details: "Trichogramma cards for stem borer control"
        },
        {
          action: "Preventive fungicide spray",
          timing: "Week 8-10",
          details: "Before flowering to prevent blast disease"
        }
      ],
      benefits: [
        "Reduced pesticide residues",
        "Cost-effective pest control",
        "Preserved beneficial insects",
        "Sustainable farming practices"
      ]
    },
    {
      id: "harvesting",
      type: "harvesting",
      title: "Harvest Planning",
      summary: "Optimal timing for maximum quality",
      priority: "low",
      description: `Plan your harvest timing based on grain moisture content and weather conditions. Proper harvest timing ensures maximum yield and grain quality.\n\nMonitor grain maturity indicators and weather forecasts to determine the ideal harvest window.`,
      timeline: [
        {
          action: "Monitor grain filling",
          timing: "Week 14-16",
          details: "Check grain hardness and color change"
        },
        {
          action: "Test grain moisture",
          timing: "Week 17",
          details: "Harvest when moisture is 20-22%"
        },
        {
          action: "Arrange harvesting equipment",
          timing: "Week 18",
          details: "Book combine harvester in advance"
        },
        {
          action: "Post-harvest handling",
          timing: "Immediately after harvest",
          details: "Proper drying and storage arrangements"
        }
      ],
      benefits: [
        "Maximum grain yield",
        "Better grain quality and price",
        "Reduced post-harvest losses",
        "Timely field preparation for next crop"
      ]
    }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('smartcrop-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSavePrediction = async (data) => {
    // Mock save functionality
    console.log('Saving prediction:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, id: data?.id };
  };

  const handleSharePrediction = async (data, method) => {
    // Mock share functionality
    console.log('Sharing prediction via:', method, data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, method };
  };

  const handleViewOnMap = () => {
    navigate('/farm-location-mapping', { 
      state: { 
        coordinates: predictionData?.location?.coordinates,
        predictionData 
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Processing Your Prediction</h2>
            <p className="text-muted-foreground">Analyzing data and generating recommendations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header />
      <main className="container mx-auto px-4 lg:px-6 py-6">
        <Breadcrumb />
        
        {/* Success Banner */}
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={24} className="text-success" />
            <div>
              <h2 className="font-semibold text-success">Prediction Generated Successfully!</h2>
              <p className="text-sm text-success/80">
                Your AI-powered crop yield prediction is ready with personalized recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <PredictionCard prediction={predictionData} />
            <ChartsSection 
              historicalData={historicalData} 
              weatherData={weatherData} 
            />
            <RecommendationsSection recommendations={recommendations} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <WeatherForecast 
              forecastData={forecastData} 
              location={predictionData?.location} 
            />
            <ActionButtons
              predictionData={predictionData}
              onSave={handleSavePrediction}
              onShare={handleSharePrediction}
              onViewMap={handleViewOnMap}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-muted rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-2">About This Prediction</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• This prediction is based on AI analysis of soil conditions, weather patterns, and historical yield data</p>
                <p>• Confidence level of {predictionData?.confidence}% indicates high reliability of the prediction</p>
                <p>• Recommendations are personalized for your specific farm conditions and location</p>
                <p>• Regular monitoring and following recommendations can help achieve predicted yields</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default PredictionResultsDashboard;