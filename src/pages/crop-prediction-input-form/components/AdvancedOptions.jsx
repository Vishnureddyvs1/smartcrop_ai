import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AdvancedOptions = ({ 
  irrigationMethod, 
  onIrrigationChange,
  fertilizerUsage,
  onFertilizerChange,
  pestControl,
  onPestControlChange,
  previousYieldData,
  onPreviousYieldChange,
  organicFarming,
  onOrganicFarmingChange,
  disabled 
}) => {
  const irrigationOptions = [
    { value: 'drip', label: 'Drip Irrigation (ड्रिप सिंचाई)', description: 'Water-efficient method' },
    { value: 'sprinkler', label: 'Sprinkler (स्प्रिंकलर)', description: 'Uniform water distribution' },
    { value: 'flood', label: 'Flood Irrigation (बाढ़ सिंचाई)', description: 'Traditional flooding method' },
    { value: 'furrow', label: 'Furrow Irrigation (कूंड सिंचाई)', description: 'Row-based irrigation' },
    { value: 'rainfed', label: 'Rain-fed (वर्षा आधारित)', description: 'Depends on natural rainfall' }
  ];

  const fertilizerOptions = [
    { value: 'high', label: 'High Usage (अधिक उपयोग)', description: 'Regular fertilizer application' },
    { value: 'moderate', label: 'Moderate Usage (मध्यम उपयोग)', description: 'Balanced fertilizer use' },
    { value: 'low', label: 'Low Usage (कम उपयोग)', description: 'Minimal fertilizer application' },
    { value: 'organic', label: 'Organic Only (केवल जैविक)', description: 'Only organic fertilizers' },
    { value: 'none', label: 'No Fertilizer (बिना खाद)', description: 'Natural farming approach' }
  ];

  const pestControlOptions = [
    { value: 'chemical', label: 'Chemical Pesticides (रासायनिक कीटनाशक)', description: 'Conventional pest control' },
    { value: 'biological', label: 'Biological Control (जैविक नियंत्रण)', description: 'Natural pest management' },
    { value: 'integrated', label: 'Integrated Pest Management (एकीकृत कीट प्रबंधन)', description: 'Combined approach' },
    { value: 'organic', label: 'Organic Methods (जैविक तरीके)', description: 'Natural pest control only' },
    { value: 'none', label: 'No Pest Control (कोई कीट नियंत्रण नहीं)', description: 'Natural approach' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={18} className="text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Advanced Farming Options</h3>
          <p className="text-xs text-muted-foreground">Optional details for more accurate predictions</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Irrigation Method"
          placeholder="Select irrigation method..."
          options={irrigationOptions}
          value={irrigationMethod}
          onChange={onIrrigationChange}
          disabled={disabled}
          searchable
          description="Choose your primary irrigation method"
        />

        <Select
          label="Fertilizer Usage"
          placeholder="Select fertilizer usage..."
          options={fertilizerOptions}
          value={fertilizerUsage}
          onChange={onFertilizerChange}
          disabled={disabled}
          searchable
          description="Indicate your fertilizer usage pattern"
        />

        <Select
          label="Pest Control Method"
          placeholder="Select pest control method..."
          options={pestControlOptions}
          value={pestControl}
          onChange={onPestControlChange}
          disabled={disabled}
          searchable
          description="Choose your pest management approach"
        />

        <Input
          label="Previous Year Yield (Optional)"
          type="number"
          placeholder="Enter last year's yield"
          value={previousYieldData}
          onChange={(e) => onPreviousYieldChange(e?.target?.value)}
          disabled={disabled}
          min="0"
          step="0.1"
          description="Last year's yield in quintals per unit area"
        />
      </div>
      <div className="pt-4 border-t border-border">
        <Checkbox
          label="Organic Farming Certification"
          description="Check if your farm is certified for organic farming practices"
          checked={organicFarming}
          onChange={(e) => onOrganicFarmingChange(e?.target?.checked)}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default AdvancedOptions;