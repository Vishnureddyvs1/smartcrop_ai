import React, { useState, useEffect } from 'react';

import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import MapControls from './components/MapControls';
import LocationSearch from './components/LocationSearch';
import FarmBoundaryDrawer from './components/FarmBoundaryDrawer';
import WeatherOverlay from './components/WeatherOverlay';
import NearbyResources from './components/NearbyResources';
import LocationDetails from './components/LocationDetails';

const FarmLocationMapping = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentView, setCurrentView] = useState('map');
  const [showWeatherLayer, setShowWeatherLayer] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [drawnAreas, setDrawnAreas] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activePanel, setActivePanel] = useState('location');
  const [mapCenter, setMapCenter] = useState({ lat: 16.3067, lng: 80.4365 });
  const [mapZoom, setMapZoom] = useState(10);

  const translations = {
    en: {
      pageTitle: "Farm Location Mapping",
      pageDescription: "Interactive mapping interface for precise farm location selection and agricultural insights",
      mapView: "Map View",
      locationPanel: "Location",
      boundaryPanel: "Boundaries",
      weatherPanel: "Weather",
      resourcesPanel: "Resources",
      toggleSidebar: "Toggle Sidebar",
      selectLocation: "Select a location on the map",
      mapInstructions: "Click on the map to select your farm location, or use the search bar to find a specific area.",
      offlineMode: "Offline Mode",
      syncData: "Sync Data"
    },
    hi: {
      pageTitle: "खेत स्थान मैपिंग",
      pageDescription: "सटीक खेत स्थान चयन और कृषि अंतर्दृष्टि के लिए इंटरैक्टिव मैपिंग इंटरफेस",
      mapView: "मैप व्यू",
      locationPanel: "स्थान",
      boundaryPanel: "सीमाएं",
      weatherPanel: "मौसम",
      resourcesPanel: "संसाधन",
      toggleSidebar: "साइडबार टॉगल करें",
      selectLocation: "मैप पर एक स्थान चुनें",
      mapInstructions: "अपने खेत का स्थान चुनने के लिए मैप पर क्लिक करें, या किसी विशिष्ट क्षेत्र को खोजने के लिए खोज बार का उपयोग करें।",
      offlineMode: "ऑफलाइन मोड",
      syncData: "डेटा सिंक करें"
    },
    te: {
      pageTitle: "వ్యవసాయ స్థాన మ్యాపింగ్",
      pageDescription: "ఖచ్చితమైన వ్యవసాయ స్థాన ఎంపిక మరియు వ్యవసాయ అంతర్దృష్టుల కోసం ఇంటరాక్టివ్ మ్యాపింగ్ ఇంటర్‌ఫేస్",
      mapView: "మ్యాప్ వ్యూ",
      locationPanel: "స్థానం",
      boundaryPanel: "సరిహద్దులు",
      weatherPanel: "వాతావరణం",
      resourcesPanel: "వనరులు",
      toggleSidebar: "సైడ్‌బార్ టోగుల్ చేయండి",
      selectLocation: "మ్యాప్‌లో ఒక స్థానాన్ని ఎంచుకోండి",
      mapInstructions: "మీ వ్యవసాయ స్థానాన్ని ఎంచుకోవడానికి మ్యాప్‌పై క్లిక్ చేయండి, లేదా నిర్దిష్ట ప్రాంతాన్ని కనుగొనడానికి శోధన బార్‌ను ఉపయోగించండి।",
      offlineMode: "ఆఫ్‌లైన్ మోడ్",
      syncData: "డేటా సింక్ చేయండి"
    },
    or: {
      pageTitle: "ଚାଷ ସ୍ଥାନ ମ୍ୟାପିଂ",
      pageDescription: "ସଠିକ ଚାଷ ସ୍ଥାନ ଚୟନ ଏବଂ କୃଷି ଅନ୍ତର୍ଦୃଷ୍ଟି ପାଇଁ ଇଣ୍ଟରାକ୍ଟିଭ ମ୍ୟାପିଂ ଇଣ୍ଟରଫେସ",
      mapView: "ମ୍ୟାପ୍ ଭ୍ୟୁ",
      locationPanel: "ସ୍ଥାନ",
      boundaryPanel: "ସୀମା",
      weatherPanel: "ପାଣିପାଗ",
      resourcesPanel: "ସମ୍ବଳ",
      toggleSidebar: "ସାଇଡବାର ଟୋଗଲ କରନ୍ତୁ",
      selectLocation: "ମ୍ୟାପରେ ଏକ ସ୍ଥାନ ଚୟନ କରନ୍ତୁ",
      mapInstructions: "ଆପଣଙ୍କ ଚାଷ ସ୍ଥାନ ଚୟନ କରିବାକୁ ମ୍ୟାପରେ କ୍ଲିକ କରନ୍ତୁ, କିମ୍ବା ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ ଅଞ୍ଚଳ ଖୋଜିବା ପାଇଁ ସର୍ଚ ବାର ବ୍ୟବହାର କରନ୍ତୁ।",
      offlineMode: "ଅଫଲାଇନ ମୋଡ",
      syncData: "ଡାଟା ସିଙ୍କ କରନ୍ତୁ"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const sidebarPanels = [
    { id: 'location', name: t?.locationPanel, icon: 'MapPin' },
    { id: 'boundaries', name: t?.boundaryPanel, icon: 'Edit3' },
    { id: 'weather', name: t?.weatherPanel, icon: 'CloudRain' },
    { id: 'resources', name: t?.resourcesPanel, icon: 'Store' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('smartcrop-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setMapCenter(location?.coordinates);
    setMapZoom(15);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleWeatherToggle = () => {
    setShowWeatherLayer(!showWeatherLayer);
  };

  const handleDrawingToggle = (isDrawing) => {
    setIsDrawingMode(isDrawing);
  };

  const handleAreaComplete = (area) => {
    const newArea = {
      id: Date.now(),
      ...area,
      area: Math.random() * 10000 + 1000 // Mock area calculation
    };
    setDrawnAreas([...drawnAreas, newArea]);
  };

  const handleAreaDelete = (areaId) => {
    setDrawnAreas(drawnAreas?.filter(area => area?.id !== areaId));
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const location = {
            name: "Current Location",
            coordinates: {
              lat: position?.coords?.latitude,
              lng: position?.coords?.longitude
            },
            address: "Your current location"
          };
          handleLocationSelect(location);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleZoomIn = () => {
    setMapZoom(Math.min(mapZoom + 1, 20));
  };

  const handleZoomOut = () => {
    setMapZoom(Math.max(mapZoom - 1, 1));
  };

  const handleSaveLocation = (locationData) => {
    // Save location to localStorage or send to API
    const savedLocations = JSON.parse(localStorage.getItem('smartcrop-saved-locations') || '[]');
    savedLocations?.push({
      ...locationData,
      savedAt: new Date()?.toISOString()
    });
    localStorage.setItem('smartcrop-saved-locations', JSON.stringify(savedLocations));
    
    // Show success message (you could implement a toast notification here)
    console.log('Location saved successfully');
  };

  const renderSidebarContent = () => {
    switch (activePanel) {
      case 'location':
        return (
          <LocationDetails
            selectedLocation={selectedLocation}
            onSaveLocation={handleSaveLocation}
            currentLanguage={currentLanguage}
          />
        );
      case 'boundaries':
        return (
          <FarmBoundaryDrawer
            isDrawingMode={isDrawingMode}
            onDrawingToggle={handleDrawingToggle}
            drawnAreas={drawnAreas}
            onAreaComplete={handleAreaComplete}
            onAreaDelete={handleAreaDelete}
            currentLanguage={currentLanguage}
          />
        );
      case 'weather':
        return (
          <div className="bg-card border border-border rounded-lg shadow-soft p-4">
            <WeatherOverlay
              isVisible={true}
              selectedLocation={selectedLocation}
              currentLanguage={currentLanguage}
            />
          </div>
        );
      case 'resources':
        return (
          <NearbyResources
            selectedLocation={selectedLocation}
            currentLanguage={currentLanguage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 lg:px-6">
            <Breadcrumb />
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 lg:px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {t?.pageTitle}
                </h1>
                <p className="text-muted-foreground">
                  {t?.pageDescription}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSidebar(!showSidebar)}
                  iconName={showSidebar ? "PanelRightClose" : "PanelRightOpen"}
                  iconSize={16}
                  className="lg:hidden"
                >
                  {t?.toggleSidebar}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 h-[calc(100vh-200px)]">
          {/* Map Container */}
          <div className="flex-1 relative">
            {/* Search Bar */}
            <div className="absolute top-4 left-4 right-4 lg:right-auto lg:w-96 z-20">
              <LocationSearch
                onLocationSelect={handleLocationSelect}
                currentLanguage={currentLanguage}
              />
            </div>

            {/* Map Controls */}
            <MapControls
              currentView={currentView}
              onViewChange={handleViewChange}
              showWeatherLayer={showWeatherLayer}
              onWeatherToggle={handleWeatherToggle}
              showSatelliteView={currentView === 'satellite'}
              onSatelliteToggle={() => setCurrentView(currentView === 'satellite' ? 'map' : 'satellite')}
              onCurrentLocation={handleCurrentLocation}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              isDrawingMode={isDrawingMode}
              onDrawingToggle={handleDrawingToggle}
            />

            {/* Map Display */}
            <div className="w-full h-full bg-muted rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Farm Location Map"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${mapZoom}&output=embed`}
                className="border-0"
              />
            </div>

            {/* Map Instructions Overlay */}
            {!selectedLocation && (
              <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-auto lg:w-96 lg:left-1/2 lg:transform lg:-translate-x-1/2 bg-card border border-border rounded-lg shadow-elevated p-4 z-10">
                <div className="flex items-center space-x-3">
                  <Icon name="Info" size={20} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {t?.selectLocation}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t?.mapInstructions}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Weather Overlay */}
            <WeatherOverlay
              isVisible={showWeatherLayer}
              selectedLocation={selectedLocation}
              currentLanguage={currentLanguage}
            />
          </div>

          {/* Desktop Sidebar */}
          <div className={`hidden lg:flex lg:w-80 border-l border-border bg-card transition-all duration-300 ${showSidebar ? 'lg:w-80' : 'lg:w-0 lg:overflow-hidden'}`}>
            <div className="w-full flex flex-col">
              {/* Sidebar Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    Farm Details
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSidebar(false)}
                    iconName="X"
                    iconSize={16}
                  />
                </div>
                
                {/* Panel Tabs */}
                <div className="flex space-x-1">
                  {sidebarPanels?.map((panel) => (
                    <Button
                      key={panel?.id}
                      variant={activePanel === panel?.id ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActivePanel(panel?.id)}
                      iconName={panel?.icon}
                      iconSize={14}
                      className="flex-1 text-xs"
                    >
                      <span className="hidden xl:inline ml-1">{panel?.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                {renderSidebarContent()}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Sheet */}
        <div className={`lg:hidden fixed inset-x-0 bottom-0 bg-card border-t border-border transform transition-transform duration-300 z-50 ${showSidebar ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="max-h-[70vh] overflow-y-auto">
            {/* Mobile Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Farm Details
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSidebar(false)}
                  iconName="ChevronDown"
                  iconSize={16}
                />
              </div>
              
              {/* Mobile Panel Tabs */}
              <div className="grid grid-cols-4 gap-1">
                {sidebarPanels?.map((panel) => (
                  <Button
                    key={panel?.id}
                    variant={activePanel === panel?.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActivePanel(panel?.id)}
                    iconName={panel?.icon}
                    iconSize={14}
                    className="flex-col h-16 text-xs"
                  >
                    <span className="mt-1">{panel?.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Mobile Content */}
            <div className="p-4">
              {renderSidebarContent()}
            </div>
          </div>
        </div>

        {/* Mobile Backdrop */}
        {showSidebar && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowSidebar(false)}
          />
        )}
      </main>
    </div>
  );
};

export default FarmLocationMapping;