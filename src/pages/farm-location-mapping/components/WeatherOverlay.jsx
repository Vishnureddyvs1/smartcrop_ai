import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const WeatherOverlay = ({ isVisible, selectedLocation, currentLanguage }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      weatherOverlay: "Weather Information",
      currentWeather: "Current Weather",
      forecast: "5-Day Forecast",
      temperature: "Temperature",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      precipitation: "Precipitation",
      pressure: "Pressure",
      visibility: "Visibility",
      uvIndex: "UV Index",
      sunrise: "Sunrise",
      sunset: "Sunset",
      feelsLike: "Feels like",
      high: "High",
      low: "Low",
      kmh: "km/h",
      mm: "mm",
      hPa: "hPa",
      km: "km"
    },
    hi: {
      weatherOverlay: "मौसम की जानकारी",
      currentWeather: "वर्तमान मौसम",
      forecast: "5-दिन का पूर्वानुमान",
      temperature: "तापमान",
      humidity: "आर्द्रता",
      windSpeed: "हवा की गति",
      precipitation: "वर्षा",
      pressure: "दबाव",
      visibility: "दृश्यता",
      uvIndex: "यूवी सूचकांक",
      sunrise: "सूर्योदय",
      sunset: "सूर्यास्त",
      feelsLike: "महसूस होता है",
      high: "अधिकतम",
      low: "न्यूनतम",
      kmh: "किमी/घंटा",
      mm: "मिमी",
      hPa: "hPa",
      km: "किमी"
    },
    te: {
      weatherOverlay: "వాతావరణ సమాచారం",
      currentWeather: "ప్రస్తుత వాతావరణం",
      forecast: "5-రోజుల అంచనా",
      temperature: "ఉష్ణోగ్రత",
      humidity: "తేమ",
      windSpeed: "గాలి వేగం",
      precipitation: "వర్షపాతం",
      pressure: "ఒత్తిడి",
      visibility: "దృశ్యత",
      uvIndex: "UV సూచిక",
      sunrise: "సూర్యోదయం",
      sunset: "సూర్యాస్తమయం",
      feelsLike: "అనుభవం",
      high: "గరిష్ఠం",
      low: "కనిష్ఠం",
      kmh: "కిమీ/గంట",
      mm: "మిమీ",
      hPa: "hPa",
      km: "కిమీ"
    },
    or: {
      weatherOverlay: "ପାଣିପାଗ ସୂଚନା",
      currentWeather: "ବର୍ତ୍ତମାନ ପାଣିପାଗ",
      forecast: "5-ଦିନର ପୂର୍ବାନୁମାନ",
      temperature: "ତାପମାତ୍ରା",
      humidity: "ଆର୍ଦ୍ରତା",
      windSpeed: "ପବନ ବେଗ",
      precipitation: "ବର୍ଷା",
      pressure: "ଚାପ",
      visibility: "ଦୃଶ୍ୟମାନତା",
      uvIndex: "UV ସୂଚକାଙ୍କ",
      sunrise: "ସୂର୍ଯ୍ୟୋଦୟ",
      sunset: "ସୂର୍ଯ୍ୟାସ୍ତ",
      feelsLike: "ଅନୁଭବ",
      high: "ସର୍ବୋଚ୍ଚ",
      low: "ସର୍ବନିମ୍ନ",
      kmh: "କିମି/ଘଣ୍ଟା",
      mm: "ମିମି",
      hPa: "hPa",
      km: "କିମି"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  // Mock weather data
  const mockWeatherData = {
    current: {
      temperature: 28,
      feelsLike: 32,
      condition: "Partly Cloudy",
      icon: "PartlyCloudy",
      humidity: 65,
      windSpeed: 12,
      precipitation: 2.5,
      pressure: 1013,
      visibility: 10,
      uvIndex: 6,
      sunrise: "06:15",
      sunset: "18:45"
    },
    forecast: [
      {
        date: "2025-09-02",
        day: "Tomorrow",
        high: 30,
        low: 22,
        condition: "Sunny",
        icon: "Sun",
        precipitation: 0
      },
      {
        date: "2025-09-03",
        day: "Wednesday",
        high: 29,
        low: 21,
        condition: "Cloudy",
        icon: "Cloud",
        precipitation: 15
      },
      {
        date: "2025-09-04",
        day: "Thursday",
        high: 26,
        low: 19,
        condition: "Rainy",
        icon: "CloudRain",
        precipitation: 85
      },
      {
        date: "2025-09-05",
        day: "Friday",
        high: 27,
        low: 20,
        condition: "Partly Cloudy",
        icon: "PartlyCloudy",
        precipitation: 25
      },
      {
        date: "2025-09-06",
        day: "Saturday",
        high: 31,
        low: 23,
        condition: "Sunny",
        icon: "Sun",
        precipitation: 5
      }
    ]
  };

  useEffect(() => {
    if (isVisible && selectedLocation) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setWeatherData(mockWeatherData?.current);
        setForecastData(mockWeatherData?.forecast);
        setLoading(false);
      }, 1000);
    }
  }, [isVisible, selectedLocation]);

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:w-80 bg-card border border-border rounded-lg shadow-elevated z-10 max-h-96 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="CloudRain" size={20} className="mr-2" />
            {t?.weatherOverlay}
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Icon name="Loader2" size={24} className="animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Current Weather */}
            {weatherData && (
              <div className="bg-muted rounded-lg p-4">
                <h4 className="text-md font-medium text-foreground mb-3">
                  {t?.currentWeather}
                </h4>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Icon name={weatherData?.icon} size={32} className="text-primary" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {weatherData?.temperature}°C
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t?.feelsLike} {weatherData?.feelsLike}°C
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground text-right">
                    {weatherData?.condition}
                  </div>
                </div>

                {/* Weather Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Droplets" size={16} className="text-blue-500" />
                    <span className="text-muted-foreground">{t?.humidity}:</span>
                    <span className="font-medium">{weatherData?.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Wind" size={16} className="text-gray-500" />
                    <span className="text-muted-foreground">{t?.windSpeed}:</span>
                    <span className="font-medium">{weatherData?.windSpeed} {t?.kmh}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="CloudRain" size={16} className="text-blue-600" />
                    <span className="text-muted-foreground">{t?.precipitation}:</span>
                    <span className="font-medium">{weatherData?.precipitation} {t?.mm}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Gauge" size={16} className="text-orange-500" />
                    <span className="text-muted-foreground">{t?.pressure}:</span>
                    <span className="font-medium">{weatherData?.pressure} {t?.hPa}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Eye" size={16} className="text-green-500" />
                    <span className="text-muted-foreground">{t?.visibility}:</span>
                    <span className="font-medium">{weatherData?.visibility} {t?.km}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Sun" size={16} className="text-yellow-500" />
                    <span className="text-muted-foreground">{t?.uvIndex}:</span>
                    <span className="font-medium">{weatherData?.uvIndex}</span>
                  </div>
                </div>

                {/* Sun Times */}
                <div className="flex justify-between mt-4 pt-3 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Sunrise" size={16} className="text-orange-400" />
                    <span className="text-muted-foreground">{t?.sunrise}:</span>
                    <span className="font-medium">{weatherData?.sunrise}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Sunset" size={16} className="text-orange-600" />
                    <span className="text-muted-foreground">{t?.sunset}:</span>
                    <span className="font-medium">{weatherData?.sunset}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5-Day Forecast */}
            {forecastData?.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-foreground mb-3">
                  {t?.forecast}
                </h4>
                <div className="space-y-2">
                  {forecastData?.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={day?.icon} size={20} className="text-primary" />
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {day?.day}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {day?.condition}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">
                          {day?.high}° / {day?.low}°
                        </div>
                        <div className="text-xs text-blue-600">
                          {day?.precipitation}% {t?.precipitation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherOverlay;