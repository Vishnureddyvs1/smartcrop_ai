import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PredictionDetailModal = ({ prediction, isOpen, onClose, onUpdateActualYield }) => {
  const [actualYield, setActualYield] = useState(prediction?.actualYield?.toString() || '');
  const [notes, setNotes] = useState(prediction?.notes || '');
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !prediction) return null;

  const handleSave = () => {
    onUpdateActualYield(prediction?.id, {
      actualYield: parseFloat(actualYield) || null,
      notes: notes?.trim()
    });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 85) return 'text-success';
    if (accuracy >= 70) return 'text-warning';
    return 'text-error';
  };

  const calculateAccuracy = () => {
    if (!prediction?.actualYield || !prediction?.predictedYield) return null;
    const accuracy = 100 - Math.abs((prediction?.actualYield - prediction?.predictedYield) / prediction?.predictedYield) * 100;
    return Math.max(0, Math.min(100, accuracy));
  };

  const accuracy = calculateAccuracy();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Wheat" size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {prediction?.cropType} Prediction Details
              </h2>
              <p className="text-sm text-muted-foreground">
                {formatDate(prediction?.date)} • {prediction?.location}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="flex-shrink-0"
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              {/* Prediction Summary */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Prediction Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Crop Type:</span>
                    <span className="font-medium text-foreground">{prediction?.cropType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Season:</span>
                    <span className="font-medium text-foreground">{prediction?.season}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Area:</span>
                    <span className="font-medium text-foreground">{prediction?.area} hectares</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Predicted Yield:</span>
                    <span className="font-medium text-foreground">
                      {prediction?.predictedYield?.toFixed(1)} tonnes/hectare
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium text-foreground">{prediction?.confidence}%</span>
                  </div>
                </div>
              </div>

              {/* Soil Conditions */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Soil Conditions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Soil Type:</span>
                    <span className="font-medium text-foreground">{prediction?.soilType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">pH Level:</span>
                    <span className="font-medium text-foreground">{prediction?.soilPh}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Moisture:</span>
                    <span className="font-medium text-foreground">{prediction?.soilMoisture}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Organic Matter:</span>
                    <span className="font-medium text-foreground">{prediction?.organicMatter}%</span>
                  </div>
                </div>
              </div>

              {/* Weather Data */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Weather Conditions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Temperature:</span>
                    <span className="font-medium text-foreground">{prediction?.avgTemperature}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rainfall:</span>
                    <span className="font-medium text-foreground">{prediction?.rainfall}mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Humidity:</span>
                    <span className="font-medium text-foreground">{prediction?.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunshine Hours:</span>
                    <span className="font-medium text-foreground">{prediction?.sunshineHours}hrs/day</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Results & Recommendations */}
            <div className="space-y-6">
              {/* Actual Results */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Actual Results</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    iconName={isEditing ? "X" : "Edit"}
                    iconPosition="left"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      type="number"
                      label="Actual Yield (tonnes/hectare)"
                      value={actualYield}
                      onChange={(e) => setActualYield(e?.target?.value)}
                      placeholder="Enter actual yield"
                      step="0.1"
                    />
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Notes
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e?.target?.value)}
                        placeholder="Add notes about the actual harvest..."
                        className="w-full h-24 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                      />
                    </div>
                    
                    <Button
                      variant="default"
                      onClick={handleSave}
                      iconName="Save"
                      iconPosition="left"
                      fullWidth
                    >
                      Save Results
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Actual Yield:</span>
                      <span className="font-medium text-foreground">
                        {prediction?.actualYield ? 
                          `${prediction?.actualYield?.toFixed(1)} tonnes/hectare` : 
                          'Not recorded'
                        }
                      </span>
                    </div>
                    
                    {accuracy && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Accuracy:</span>
                        <span className={`font-medium ${getAccuracyColor(accuracy)}`}>
                          {accuracy?.toFixed(1)}%
                        </span>
                      </div>
                    )}
                    
                    {prediction?.notes && (
                      <div>
                        <span className="text-muted-foreground block mb-1">Notes:</span>
                        <p className="text-sm text-foreground bg-background p-2 rounded border">
                          {prediction?.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Recommendations */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {prediction?.recommendations?.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Parameters */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Input Parameters</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fertilizer Used:</span>
                    <span className="text-foreground">{prediction?.fertilizerType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Irrigation Method:</span>
                    <span className="text-foreground">{prediction?.irrigationMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seed Variety:</span>
                    <span className="text-foreground">{prediction?.seedVariety}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Previous Crop:</span>
                    <span className="text-foreground">{prediction?.previousCrop}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          
          <Button
            variant="default"
            iconName="Share2"
            iconPosition="left"
          >
            Share Report
          </Button>
          
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
          >
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PredictionDetailModal;