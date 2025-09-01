import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherDisplay = ({ weatherData, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Cloud" size={18} className="text-warning animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">Weather Information</h3>
            <p className="text-xs text-muted-foreground">Loading current weather data...</p>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card border border-error/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="AlertCircle" size={18} className="text-error" />
          <h3 className="text-sm font-medium text-error">Weather Data Unavailable</h3>
        </div>
        <p className="text-xs text-muted-foreground">Unable to fetch weather data. Predictions will use historical averages.</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={18} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Select location to view current weather conditions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="Sun" size={18} className="text-warning" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Current Weather</h3>
          <p className="text-xs text-muted-foreground">{weatherData?.location}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Thermometer" size={16} className="text-error mr-1" />
            <span className="text-lg font-semibold text-foreground">{weatherData?.temperature}°C</span>
          </div>
          <p className="text-xs text-muted-foreground">Temperature</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Droplets" size={16} className="text-accent mr-1" />
            <span className="text-lg font-semibold text-foreground">{weatherData?.humidity}%</span>
          </div>
          <p className="text-xs text-muted-foreground">Humidity</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="Wind" size={16} className="text-secondary mr-1" />
            <span className="text-lg font-semibold text-foreground">{weatherData?.windSpeed} km/h</span>
          </div>
          <p className="text-xs text-muted-foreground">Wind Speed</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="CloudRain" size={16} className="text-primary mr-1" />
            <span className="text-lg font-semibold text-foreground">{weatherData?.rainfall}mm</span>
          </div>
          <p className="text-xs text-muted-foreground">Rainfall</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground flex items-center">
          <Icon name="Clock" size={14} className="mr-1" />
          Last updated: {weatherData?.lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplay;