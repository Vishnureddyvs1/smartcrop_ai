import React from 'react';
import Icon from '../../../components/AppIcon';

const PredictionCard = ({ prediction }) => {
  const confidenceColor = prediction?.confidence >= 80 ? 'text-success' : 
                         prediction?.confidence >= 60 ? 'text-warning' : 'text-error';
  
  const confidenceIcon = prediction?.confidence >= 80 ? 'TrendingUp' : 
                        prediction?.confidence >= 60 ? 'Minus' : 'TrendingDown';

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Crop Yield Prediction</h2>
        <div className="flex items-center space-x-2">
          <Icon name={confidenceIcon} size={20} className={confidenceColor} />
          <span className={`text-sm font-medium ${confidenceColor}`}>
            {prediction?.confidence}% Confidence
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Prediction */}
        <div className="md:col-span-2">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-primary mb-2">
              {prediction?.expectedYield} {prediction?.unit}
            </div>
            <p className="text-muted-foreground">Expected Yield per {prediction?.areaUnit}</p>
          </div>

          {/* Confidence Interval */}
          <div className="bg-muted rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Range</span>
              <span className="text-sm font-medium text-foreground">
                {prediction?.minYield} - {prediction?.maxYield} {prediction?.unit}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${prediction?.confidence}%` }}
              ></div>
            </div>
          </div>

          {/* Crop Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Icon name="Wheat" size={18} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Crop Type</p>
                <p className="font-medium text-foreground">{prediction?.cropType}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={18} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Season</p>
                <p className="font-medium text-foreground">{prediction?.season}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-3">Regional Comparison</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">District Average</span>
              <span className="font-medium text-foreground">{prediction?.districtAverage} {prediction?.unit}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">State Average</span>
              <span className="font-medium text-foreground">{prediction?.stateAverage} {prediction?.unit}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Your Prediction</span>
              <span className="font-bold text-primary">{prediction?.expectedYield} {prediction?.unit}</span>
            </div>
            <div className="pt-2 border-t border-border">
              <div className={`flex items-center space-x-1 ${prediction?.performanceIndicator > 0 ? 'text-success' : 'text-error'}`}>
                <Icon name={prediction?.performanceIndicator > 0 ? 'ArrowUp' : 'ArrowDown'} size={16} />
                <span className="text-sm font-medium">
                  {Math.abs(prediction?.performanceIndicator)}% {prediction?.performanceIndicator > 0 ? 'above' : 'below'} district average
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;