import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LocationSearch = ({ onLocationSelect, currentLanguage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const mockSuggestions = [
    {
      id: 1,
      name: "Guntur, Andhra Pradesh",
      type: "District",
      coordinates: { lat: 16.3067, lng: 80.4365 },
      address: "Guntur District, Andhra Pradesh, India"
    },
    {
      id: 2,
      name: "Warangal, Telangana",
      type: "District",
      coordinates: { lat: 17.9689, lng: 79.5941 },
      address: "Warangal District, Telangana, India"
    },
    {
      id: 3,
      name: "Bhubaneswar, Odisha",
      type: "City",
      coordinates: { lat: 20.2961, lng: 85.8245 },
      address: "Bhubaneswar, Odisha, India"
    },
    {
      id: 4,
      name: "Nashik, Maharashtra",
      type: "District",
      coordinates: { lat: 19.9975, lng: 73.7898 },
      address: "Nashik District, Maharashtra, India"
    },
    {
      id: 5,
      name: "Ludhiana, Punjab",
      type: "District",
      coordinates: { lat: 30.9010, lng: 75.8573 },
      address: "Ludhiana District, Punjab, India"
    }
  ];

  const translations = {
    en: {
      searchPlaceholder: "Search by village, district, or postal code",
      searching: "Searching...",
      noResults: "No locations found",
      currentLocation: "Use Current Location"
    },
    hi: {
      searchPlaceholder: "गांव, जिला या पिन कोड से खोजें",
      searching: "खोज रहे हैं...",
      noResults: "कोई स्थान नहीं मिला",
      currentLocation: "वर्तमान स्थान का उपयोग करें"
    },
    te: {
      searchPlaceholder: "గ్రామం, జిల్లా లేదా పిన్ కోడ్ ద్వారా వెతకండి",
      searching: "వెతుకుతున్నాము...",
      noResults: "ఏ స్థానాలు కనుగొనబడలేదు",
      currentLocation: "ప్రస్తుత స్థానాన్ని ఉపయోగించండి"
    },
    or: {
      searchPlaceholder: "ଗାଁ, ଜିଲ୍ଲା କିମ୍ବା ପିନ୍ କୋଡ୍ ଦ୍ୱାରା ଖୋଜନ୍ତୁ",
      searching: "ଖୋଜୁଛୁ...",
      noResults: "କୌଣସି ସ୍ଥାନ ମିଳିଲା ନାହିଁ",
      currentLocation: "ବର୍ତ୍ତମାନ ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  useEffect(() => {
    if (searchQuery?.length > 2) {
      setIsSearching(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = mockSuggestions?.filter(location =>
          location?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          location?.address?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleLocationSelect = (location) => {
    setSearchQuery(location?.name);
    setShowSuggestions(false);
    onLocationSelect(location);
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
          onLocationSelect(location);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder={t?.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pr-10"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isSearching ? (
              <Icon name="Loader2" size={16} className="animate-spin text-muted-foreground" />
            ) : (
              <Icon name="Search" size={16} className="text-muted-foreground" />
            )}
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleCurrentLocation}
          iconName="MapPin"
          iconSize={16}
          className="flex-shrink-0"
        >
          <span className="hidden sm:inline ml-1">{t?.currentLocation}</span>
        </Button>
      </div>
      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-elevated z-50 max-h-60 overflow-y-auto">
          {suggestions?.length > 0 ? (
            suggestions?.map((location) => (
              <button
                key={location?.id}
                onClick={() => handleLocationSelect(location)}
                className="w-full px-4 py-3 text-left hover:bg-muted transition-smooth border-b border-border last:border-b-0"
              >
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {location?.name}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {location?.address}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {location?.type}
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-center text-muted-foreground">
              {t?.noResults}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;