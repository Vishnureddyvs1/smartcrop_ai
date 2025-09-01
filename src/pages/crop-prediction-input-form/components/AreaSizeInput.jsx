import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AreaSizeInput = ({ area, unit, onAreaChange, onUnitChange, areaError, disabled }) => {
  const unitOptions = [
    { value: 'acres', label: 'Acres (एकड़)' },
    { value: 'hectares', label: 'Hectares (हेक्टेयर)' },
    { value: 'bigha', label: 'Bigha (बीघा)' },
    { value: 'katha', label: 'Katha (कठा)' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Square" size={18} className="text-success" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Farm Area</h3>
          <p className="text-xs text-muted-foreground">Enter your cultivation area size</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Area Size"
          type="number"
          placeholder="Enter area"
          value={area}
          onChange={(e) => onAreaChange(e?.target?.value)}
          error={areaError}
          disabled={disabled}
          required
          min="0.1"
          step="0.1"
          description="Enter the size of your farming area"
        />

        <Select
          label="Unit"
          placeholder="Select unit..."
          options={unitOptions}
          value={unit}
          onChange={onUnitChange}
          disabled={disabled}
          required
          description="Choose measurement unit"
        />
      </div>
    </div>
  );
};

export default AreaSizeInput;