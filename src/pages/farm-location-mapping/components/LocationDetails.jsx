import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LocationDetails = ({ selectedLocation, onSaveLocation, currentLanguage }) => {
  const translations = {
    en: {
      locationDetails: "Location Details",
      coordinates: "Coordinates",
      latitude: "Latitude",
      longitude: "Longitude",
      address: "Address",
      district: "District",
      state: "State",
      pincode: "PIN Code",
      soilType: "Soil Type",
      elevation: "Elevation",
      climateZone: "Climate Zone",
      saveLocation: "Save Location",
      useForPrediction: "Use for Prediction",
      meters: "meters",
      notAvailable: "Not Available"
    },
    hi: {
      locationDetails: "स्थान विवरण",
      coordinates: "निर्देशांक",
      latitude: "अक्षांश",
      longitude: "देशांतर",
      address: "पता",
      district: "जिला",
      state: "राज्य",
      pincode: "पिन कोड",
      soilType: "मिट्टी का प्रकार",
      elevation: "ऊंचाई",
      climateZone: "जलवायु क्षेत्र",
      saveLocation: "स्थान सहेजें",
      useForPrediction: "भविष्यवाणी के लिए उपयोग करें",
      meters: "मीटर",
      notAvailable: "उपलब्ध नहीं"
    },
    te: {
      locationDetails: "స్థాన వివరాలు",
      coordinates: "కోఆర్డినేట్లు",
      latitude: "అక్షాంశం",
      longitude: "రేఖాంశం",
      address: "చిరునామా",
      district: "జిల్లా",
      state: "రాష్ట్రం",
      pincode: "పిన్ కోడ్",
      soilType: "మట్టి రకం",
      elevation: "ఎత్తు",
      climateZone: "వాతావరణ మండలం",
      saveLocation: "స్థానాన్ని సేవ్ చేయండి",
      useForPrediction: "అంచనా కోసం ఉపయోగించండి",
      meters: "మీటర్లు",
      notAvailable: "అందుబాటులో లేదు"
    },
    or: {
      locationDetails: "ସ୍ଥାନ ବିବରଣୀ",
      coordinates: "ସଂଯୋଜନା",
      latitude: "ଅକ୍ଷାଂଶ",
      longitude: "ଦ୍ରାଘିମା",
      address: "ଠିକଣା",
      district: "ଜିଲ୍ଲା",
      state: "ରାଜ୍ୟ",
      pincode: "ପିନ୍ କୋଡ୍",
      soilType: "ମାଟି ପ୍ରକାର",
      elevation: "ଉଚ୍ଚତା",
      climateZone: "ଜଳବାୟୁ ଅଞ୍ଚଳ",
      saveLocation: "ସ୍ଥାନ ସଞ୍ଚୟ କରନ୍ତୁ",
      useForPrediction: "ପୂର୍ବାନୁମାନ ପାଇଁ ବ୍ୟବହାର କରନ୍ତୁ",
      meters: "ମିଟର",
      notAvailable: "ଉପଲବ୍ଧ ନାହିଁ"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  if (!selectedLocation) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-soft p-4">
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="MapPin" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Select a location on the map to view details</p>
        </div>
      </div>
    );
  }

  // Mock additional location data
  const locationData = {
    ...selectedLocation,
    district: "Guntur",
    state: "Andhra Pradesh",
    pincode: "522001",
    soilType: "Alluvial Soil",
    elevation: 32,
    climateZone: "Tropical Semi-Arid"
  };

  const handleSaveLocation = () => {
    onSaveLocation(locationData);
  };

  const handleUseForPrediction = () => {
    // Navigate to prediction form with location data
    const locationParams = new URLSearchParams({
      lat: locationData.coordinates.lat,
      lng: locationData.coordinates.lng,
      district: locationData.district,
      state: locationData.state
    });
    window.location.href = `/crop-prediction-input-form?${locationParams?.toString()}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Info" size={20} className="mr-2" />
        {t?.locationDetails}
      </h3>
      <div className="space-y-4">
        {/* Basic Information */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-2">
            {locationData?.name}
          </h4>
          <p className="text-sm text-muted-foreground">
            {locationData?.address}
          </p>
        </div>

        {/* Coordinates */}
        <div className="bg-muted rounded-lg p-3">
          <h5 className="text-sm font-medium text-foreground mb-2 flex items-center">
            <Icon name="Navigation" size={16} className="mr-2" />
            {t?.coordinates}
          </h5>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">{t?.latitude}:</span>
              <div className="font-mono font-medium">
                {locationData?.coordinates?.lat?.toFixed(6)}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">{t?.longitude}:</span>
              <div className="font-mono font-medium">
                {locationData?.coordinates?.lng?.toFixed(6)}
              </div>
            </div>
          </div>
        </div>

        {/* Administrative Details */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">{t?.district}:</span>
            <span className="text-sm font-medium text-foreground">
              {locationData?.district}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">{t?.state}:</span>
            <span className="text-sm font-medium text-foreground">
              {locationData?.state}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">{t?.pincode}:</span>
            <span className="text-sm font-medium text-foreground">
              {locationData?.pincode}
            </span>
          </div>
        </div>

        {/* Agricultural Information */}
        <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
          <h5 className="text-sm font-medium text-foreground mb-2 flex items-center">
            <Icon name="Sprout" size={16} className="mr-2 text-primary" />
            Agricultural Information
          </h5>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t?.soilType}:</span>
              <span className="text-sm font-medium text-foreground">
                {locationData?.soilType}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t?.elevation}:</span>
              <span className="text-sm font-medium text-foreground">
                {locationData?.elevation} {t?.meters}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t?.climateZone}:</span>
              <span className="text-sm font-medium text-foreground">
                {locationData?.climateZone}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 pt-4">
          <Button
            variant="default"
            onClick={handleUseForPrediction}
            iconName="Zap"
            iconSize={16}
            className="w-full"
          >
            {t?.useForPrediction}
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveLocation}
            iconName="Bookmark"
            iconSize={16}
            className="w-full"
          >
            {t?.saveLocation}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;