import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherForecast = ({ forecastData, location }) => {
  const getWeatherIcon = (condition) => {
    const iconMap = {
      sunny: 'Sun',
      cloudy: 'Cloud',
      rainy: 'CloudRain',
      stormy: 'CloudLightning',
      partlyCloudy: 'CloudSun',
      foggy: 'CloudFog'
    };
    return iconMap?.[condition] || 'Cloud';
  };

  const getWeatherColor = (condition) => {
    const colorMap = {
      sunny: 'text-warning',
      cloudy: 'text-muted-foreground',
      rainy: 'text-primary',
      stormy: 'text-error',
      partlyCloudy: 'text-accent',
      foggy: 'text-muted-foreground'
    };
    return colorMap?.[condition] || 'text-muted-foreground';
  };

  const getFarmingActivity = (weather) => {
    const activityMap = {
      sunny: 'Ideal for harvesting',
      cloudy: 'Good for planting',
      rainy: 'Natural irrigation',
      stormy: 'Avoid field work',
      partlyCloudy: 'Perfect for spraying',
      foggy: 'Delay morning activities'
    };
    return activityMap?.[weather?.condition] || 'Monitor conditions';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">7-Day Weather Forecast</h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
            <Icon name="MapPin" size={16} />
            <span>{location?.district}, {location?.state}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Last Updated</div>
          <div className="text-sm font-medium text-foreground">
            {new Date()?.toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        </div>
      </div>
      {/* Current Weather */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-background ${getWeatherColor(forecastData?.[0]?.condition)}`}>
              <Icon name={getWeatherIcon(forecastData?.[0]?.condition)} size={32} />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{forecastData?.[0]?.temperature}°C</div>
              <div className="text-sm text-muted-foreground capitalize">{forecastData?.[0]?.condition}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
              <Icon name="Droplets" size={16} />
              <span>{forecastData?.[0]?.humidity}% Humidity</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Wind" size={16} />
              <span>{forecastData?.[0]?.windSpeed} km/h</span>
            </div>
          </div>
        </div>
        
        {/* Farming Activity Suggestion */}
        <div className="mt-4 p-3 bg-background rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Tractor" size={18} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {getFarmingActivity(forecastData?.[0])}
            </span>
          </div>
        </div>
      </div>
      {/* 7-Day Forecast */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Weekly Outlook</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {forecastData?.map((day, index) => (
            <div key={index} className="bg-muted rounded-lg p-3 text-center">
              <div className="text-xs font-medium text-muted-foreground mb-2">
                {index === 0 ? 'Today' : 
                 index === 1 ? 'Tomorrow': new Date(Date.now() + index * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-IN', { weekday: 'short' })}
              </div>
              
              <div className={`mb-2 ${getWeatherColor(day?.condition)}`}>
                <Icon name={getWeatherIcon(day?.condition)} size={24} className="mx-auto" />
              </div>
              
              <div className="text-sm font-medium text-foreground mb-1">
                {day?.maxTemp}°/{day?.minTemp}°
              </div>
              
              {day?.rainfall > 0 && (
                <div className="flex items-center justify-center space-x-1 text-xs text-primary">
                  <Icon name="CloudRain" size={12} />
                  <span>{day?.rainfall}mm</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Weather Alerts */}
      {forecastData?.some(day => day?.alert) && (
        <div className="mt-6">
          <h3 className="font-medium text-foreground mb-3">Weather Alerts</h3>
          <div className="space-y-2">
            {forecastData?.filter(day => day?.alert)?.map((day, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-foreground">{day?.alert?.title}</div>
                  <div className="text-xs text-muted-foreground">{day?.alert?.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Farming Tips Based on Weather */}
      <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground mb-2">Weather-Based Farming Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Expected rainfall of {forecastData?.reduce((sum, day) => sum + day?.rainfall, 0)}mm this week - adjust irrigation accordingly</li>
              <li>• Average temperature {Math.round(forecastData?.reduce((sum, day) => sum + day?.temperature, 0) / 7)}°C - optimal for current crop stage</li>
              <li>• High humidity days: {forecastData?.filter(day => day?.humidity > 70)?.length} - monitor for pest activity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;