import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictionCard = ({ prediction, onView, onShare, onSetReminder, onCompare, isSelected, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 85) return 'text-success';
    if (accuracy >= 70) return 'text-warning';
    return 'text-error';
  };

  const getAccuracyIcon = (accuracy) => {
    if (accuracy >= 85) return 'TrendingUp';
    if (accuracy >= 70) return 'Minus';
    return 'TrendingDown';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatYield = (yield_value) => {
    return `${yield_value?.toFixed(1)} tonnes/hectare`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft transition-smooth hover:shadow-elevated ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      {/* Card Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* Selection Checkbox */}
            <button
              onClick={() => onSelect(prediction?.id)}
              className="mt-1 w-5 h-5 border-2 border-border rounded flex items-center justify-center hover:border-primary transition-smooth"
            >
              {isSelected && <Icon name="Check" size={14} className="text-primary" />}
            </button>

            {/* Crop Icon */}
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Wheat" size={24} className="text-primary" />
            </div>

            {/* Prediction Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {prediction?.cropType}
                </h3>
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  {prediction?.season}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{formatDate(prediction?.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{prediction?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Maximize" size={14} />
                  <span>{prediction?.area} hectares</span>
                </div>
              </div>

              {/* Yield Information */}
              <div className="flex items-center space-x-6">
                <div>
                  <span className="text-xs text-muted-foreground">Predicted Yield</span>
                  <p className="text-sm font-medium text-foreground">
                    {formatYield(prediction?.predictedYield)}
                  </p>
                </div>
                
                {prediction?.actualYield && (
                  <div>
                    <span className="text-xs text-muted-foreground">Actual Yield</span>
                    <p className="text-sm font-medium text-foreground">
                      {formatYield(prediction?.actualYield)}
                    </p>
                  </div>
                )}

                {prediction?.accuracy && (
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={getAccuracyIcon(prediction?.accuracy)} 
                      size={16} 
                      className={getAccuracyColor(prediction?.accuracy)}
                    />
                    <span className={`text-sm font-medium ${getAccuracyColor(prediction?.accuracy)}`}>
                      {prediction?.accuracy}% accurate
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Expand Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Soil Conditions</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Type: {prediction?.soilType}</p>
                <p>pH: {prediction?.soilPh}</p>
                <p>Moisture: {prediction?.soilMoisture}%</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Weather Data</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Avg Temperature: {prediction?.avgTemperature}°C</p>
                <p>Rainfall: {prediction?.rainfall}mm</p>
                <p>Humidity: {prediction?.humidity}%</p>
              </div>
            </div>
          </div>

          {prediction?.recommendations && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Key Recommendations</h4>
              <div className="flex flex-wrap gap-2">
                {prediction?.recommendations?.slice(0, 3)?.map((rec, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {prediction?.notes && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Notes</h4>
              <p className="text-sm text-muted-foreground">{prediction?.notes}</p>
            </div>
          )}
        </div>
      )}
      {/* Action Buttons */}
      <div className="p-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(prediction)}
            iconName="Eye"
            iconPosition="left"
          >
            View Details
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShare(prediction)}
            iconName="Share2"
            iconPosition="left"
          >
            Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSetReminder(prediction)}
            iconName="Bell"
            iconPosition="left"
          >
            Set Reminder
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCompare(prediction)}
            iconName="BarChart3"
            iconPosition="left"
          >
            Compare
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;