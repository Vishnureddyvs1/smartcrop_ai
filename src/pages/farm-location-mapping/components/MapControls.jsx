import React from 'react';
import Button from '../../../components/ui/Button';


const MapControls = ({ 
  currentView, 
  onViewChange, 
  showWeatherLayer, 
  onWeatherToggle,
  showSatelliteView,
  onSatelliteToggle,
  onCurrentLocation,
  onZoomIn,
  onZoomOut,
  isDrawingMode,
  onDrawingToggle
}) => {
  const viewOptions = [
    { id: 'map', label: 'Map', icon: 'Map' },
    { id: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { id: 'hybrid', label: 'Hybrid', icon: 'Layers' }
  ];

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
      {/* View Toggle */}
      <div className="bg-card border border-border rounded-lg shadow-soft p-2">
        <div className="flex space-x-1">
          {viewOptions?.map((option) => (
            <Button
              key={option?.id}
              variant={currentView === option?.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange(option?.id)}
              iconName={option?.icon}
              iconSize={16}
              className="px-2"
            >
              <span className="hidden sm:inline ml-1">{option?.label}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* Layer Controls */}
      <div className="bg-card border border-border rounded-lg shadow-soft p-2">
        <div className="flex flex-col space-y-1">
          <Button
            variant={showWeatherLayer ? 'default' : 'ghost'}
            size="sm"
            onClick={onWeatherToggle}
            iconName="CloudRain"
            iconSize={16}
            className="justify-start"
          >
            <span className="hidden sm:inline ml-1">Weather</span>
          </Button>
          <Button
            variant={isDrawingMode ? 'default' : 'ghost'}
            size="sm"
            onClick={onDrawingToggle}
            iconName="Edit3"
            iconSize={16}
            className="justify-start"
          >
            <span className="hidden sm:inline ml-1">Draw</span>
          </Button>
        </div>
      </div>
      {/* Zoom Controls */}
      <div className="bg-card border border-border rounded-lg shadow-soft p-2">
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomIn}
            iconName="Plus"
            iconSize={16}
            className="px-2"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomOut}
            iconName="Minus"
            iconSize={16}
            className="px-2"
          />
        </div>
      </div>
      {/* Location Button */}
      <div className="bg-card border border-border rounded-lg shadow-soft p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCurrentLocation}
          iconName="MapPin"
          iconSize={16}
          className="px-2"
        />
      </div>
    </div>
  );
};

export default MapControls;