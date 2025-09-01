import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparisonModal = ({ predictions, isOpen, onClose, selectedPredictions }) => {
  const [comparisonType, setComparisonType] = useState('yield');
  const [selectedItems, setSelectedItems] = useState(selectedPredictions || []);

  if (!isOpen) return null;

  const availablePredictions = predictions?.filter(p => !selectedItems?.find(s => s?.id === p?.id));

  const comparisonOptions = [
    { value: 'yield', label: 'Yield Comparison' },
    { value: 'accuracy', label: 'Accuracy Analysis' },
    { value: 'timeline', label: 'Timeline View' },
    { value: 'parameters', label: 'Parameter Analysis' }
  ];

  const addPrediction = (prediction) => {
    if (selectedItems?.length < 4) {
      setSelectedItems([...selectedItems, prediction]);
    }
  };

  const removePrediction = (predictionId) => {
    setSelectedItems(selectedItems?.filter(p => p?.id !== predictionId));
  };

  const getChartData = () => {
    switch (comparisonType) {
      case 'yield':
        return selectedItems?.map(p => ({
          name: `${p?.cropType} (${new Date(p.date)?.getMonth() + 1}/${new Date(p.date)?.getFullYear()})`,
          predicted: p?.predictedYield,
          actual: p?.actualYield || 0,
          crop: p?.cropType
        }));
      
      case 'accuracy':
        return selectedItems?.filter(p => p?.actualYield)?.map(p => {
          const accuracy = 100 - Math.abs((p?.actualYield - p?.predictedYield) / p?.predictedYield) * 100;
          return {
            name: `${p?.cropType} (${new Date(p.date)?.getMonth() + 1}/${new Date(p.date)?.getFullYear()})`,
            accuracy: Math.max(0, Math.min(100, accuracy)),
            confidence: p?.confidence
          };
        });
      
      case 'timeline':
        return selectedItems?.sort((a, b) => new Date(a.date) - new Date(b.date))?.map(p => ({
          date: new Date(p.date)?.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
          yield: p?.predictedYield,
          actual: p?.actualYield || null
        }));
      
      default:
        return [];
    }
  };

  const renderChart = () => {
    const data = getChartData();
    
    switch (comparisonType) {
      case 'yield':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis label={{ value: 'Yield (tonnes/hectare)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="predicted" fill="var(--color-primary)" name="Predicted Yield" />
              <Bar dataKey="actual" fill="var(--color-success)" name="Actual Yield" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'accuracy':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="accuracy" fill="var(--color-accent)" name="Prediction Accuracy" />
              <Bar dataKey="confidence" fill="var(--color-secondary)" name="Model Confidence" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'timeline':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'Yield (tonnes/hectare)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="yield" stroke="var(--color-primary)" name="Predicted" strokeWidth={2} />
              <Line type="monotone" dataKey="actual" stroke="var(--color-success)" name="Actual" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div className="h-300 flex items-center justify-center text-muted-foreground">Select a comparison type</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg shadow-elevated max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="BarChart3" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Prediction Comparison
            </h2>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Selection */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Selected Predictions ({selectedItems?.length}/4)
                </h3>
                
                <div className="space-y-2">
                  {selectedItems?.map((prediction) => (
                    <div key={prediction?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {prediction?.cropType}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(prediction.date)?.toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePrediction(prediction?.id)}
                        className="flex-shrink-0"
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {selectedItems?.length < 4 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Add More Predictions
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availablePredictions?.slice(0, 10)?.map((prediction) => (
                      <button
                        key={prediction?.id}
                        onClick={() => addPrediction(prediction)}
                        className="w-full flex items-center justify-between p-2 text-left hover:bg-muted/50 rounded-lg transition-smooth"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">
                            {prediction?.cropType}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(prediction.date)?.toLocaleDateString('en-IN')}
                          </p>
                        </div>
                        <Icon name="Plus" size={16} className="text-muted-foreground flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Comparison Type */}
              <div>
                <Select
                  label="Comparison Type"
                  options={comparisonOptions}
                  value={comparisonType}
                  onChange={setComparisonType}
                />
              </div>
            </div>

            {/* Right Panel - Chart */}
            <div className="lg:col-span-2">
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {comparisonOptions?.find(opt => opt?.value === comparisonType)?.label}
                </h3>
                
                {selectedItems?.length >= 2 ? (
                  renderChart()
                ) : (
                  <div className="h-300 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Icon name="BarChart3" size={48} className="mx-auto mb-2 opacity-50" />
                      <p>Select at least 2 predictions to compare</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Comparison Summary */}
              {selectedItems?.length >= 2 && (
                <div className="mt-4 bg-muted/30 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Highest Predicted Yield:</span>
                      <p className="font-medium text-foreground">
                        {Math.max(...selectedItems?.map(p => p?.predictedYield))?.toFixed(1)} tonnes/hectare
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Average Confidence:</span>
                      <p className="font-medium text-foreground">
                        {(selectedItems?.reduce((sum, p) => sum + p?.confidence, 0) / selectedItems?.length)?.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Most Common Crop:</span>
                      <p className="font-medium text-foreground">
                        {selectedItems?.reduce((acc, p) => {
                          acc[p.cropType] = (acc?.[p?.cropType] || 0) + 1;
                          return acc;
                        }, {})}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date Range:</span>
                      <p className="font-medium text-foreground">
                        {selectedItems?.length > 1 ? 
                          `${Math.ceil((new Date(Math.max(...selectedItems.map(p => new Date(p.date)))) - 
                                      new Date(Math.min(...selectedItems.map(p => new Date(p.date))))) / 
                                      (1000 * 60 * 60 * 24))} days` : 
                          'Single prediction'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            disabled={selectedItems?.length < 2}
          >
            Export Comparison
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;