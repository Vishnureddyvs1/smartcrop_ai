import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CropTypeSelector = ({ value, onChange, error, disabled }) => {
  const cropOptions = [
    { 
      value: 'wheat', 
      label: 'Wheat (गेहूं)', 
      description: 'Winter crop, requires cool weather'
    },
    { 
      value: 'rice', 
      label: 'Rice (चावल)', 
      description: 'Kharif crop, requires high water'
    },
    { 
      value: 'cotton', 
      label: 'Cotton (कपास)', 
      description: 'Cash crop, requires warm climate'
    },
    { 
      value: 'sugarcane', 
      label: 'Sugarcane (गन्ना)', 
      description: 'Long duration crop, high water requirement'
    },
    { 
      value: 'maize', 
      label: 'Maize (मक्का)', 
      description: 'Versatile crop, moderate water needs'
    },
    { 
      value: 'soybean', 
      label: 'Soybean (सोयाबीन)', 
      description: 'Protein-rich legume crop'
    },
    { 
      value: 'groundnut', 
      label: 'Groundnut (मूंगफली)', 
      description: 'Oil seed crop, drought tolerant'
    },
    { 
      value: 'pulses', 
      label: 'Pulses (दालें)', 
      description: 'Nitrogen-fixing legume crops'
    }
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Wheat" size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Crop Selection</h3>
          <p className="text-xs text-muted-foreground">Choose your primary crop type</p>
        </div>
      </div>
      
      <Select
        label="Crop Type"
        placeholder="Select crop type..."
        options={cropOptions}
        value={value}
        onChange={onChange}
        error={error}
        disabled={disabled}
        searchable
        required
        description="Select the main crop you want to grow this season"
      />
    </div>
  );
};

export default CropTypeSelector;