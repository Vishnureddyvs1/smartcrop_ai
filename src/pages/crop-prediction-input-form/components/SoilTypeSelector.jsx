import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SoilTypeSelector = ({ value, onChange, error, disabled }) => {
  const soilOptions = [
    { 
      value: 'alluvial', 
      label: 'Alluvial Soil (जलोढ़ मिट्टी)', 
      description: 'Rich in nutrients, good for most crops'
    },
    { 
      value: 'black', 
      label: 'Black Soil (काली मिट्टी)', 
      description: 'High water retention, ideal for cotton'
    },
    { 
      value: 'red', 
      label: 'Red Soil (लाल मिट्टी)', 
      description: 'Well-drained, suitable for groundnut'
    },
    { 
      value: 'laterite', 
      label: 'Laterite Soil (लैटेराइट मिट्टी)', 
      description: 'Iron-rich, good drainage'
    },
    { 
      value: 'sandy', 
      label: 'Sandy Soil (बलुई मिट्टी)', 
      description: 'Quick drainage, needs frequent irrigation'
    },
    { 
      value: 'clayey', 
      label: 'Clayey Soil (चिकनी मिट्टी)', 
      description: 'High water retention, slow drainage'
    },
    { 
      value: 'loamy', 
      label: 'Loamy Soil (दोमट मिट्टी)', 
      description: 'Balanced texture, ideal for most crops'
    }
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Mountain" size={18} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Soil Information</h3>
          <p className="text-xs text-muted-foreground">Identify your farm's soil type</p>
        </div>
      </div>
      
      <Select
        label="Soil Type"
        placeholder="Select soil type..."
        options={soilOptions}
        value={value}
        onChange={onChange}
        error={error}
        disabled={disabled}
        searchable
        required
        description="Choose the predominant soil type in your farm"
      />
    </div>
  );
};

export default SoilTypeSelector;