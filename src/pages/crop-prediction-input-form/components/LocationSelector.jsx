import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LocationSelector = ({ state, district, onStateChange, onDistrictChange, stateError, districtError, disabled }) => {
  const [districts, setDistricts] = useState([]);

  const stateOptions = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' }
  ];

  const districtData = {
    'andhra-pradesh': [
      { value: 'visakhapatnam', label: 'Visakhapatnam' },
      { value: 'vijayawada', label: 'Vijayawada' },
      { value: 'guntur', label: 'Guntur' },
      { value: 'tirupati', label: 'Tirupati' },
      { value: 'kurnool', label: 'Kurnool' }
    ],
    'telangana': [
      { value: 'hyderabad', label: 'Hyderabad' },
      { value: 'warangal', label: 'Warangal' },
      { value: 'nizamabad', label: 'Nizamabad' },
      { value: 'karimnagar', label: 'Karimnagar' },
      { value: 'khammam', label: 'Khammam' }
    ],
    'odisha': [
      { value: 'bhubaneswar', label: 'Bhubaneswar' },
      { value: 'cuttack', label: 'Cuttack' },
      { value: 'berhampur', label: 'Berhampur' },
      { value: 'sambalpur', label: 'Sambalpur' },
      { value: 'rourkela', label: 'Rourkela' }
    ],
    'uttar-pradesh': [
      { value: 'lucknow', label: 'Lucknow' },
      { value: 'kanpur', label: 'Kanpur' },
      { value: 'agra', label: 'Agra' },
      { value: 'varanasi', label: 'Varanasi' },
      { value: 'meerut', label: 'Meerut' }
    ],
    'maharashtra': [
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'pune', label: 'Pune' },
      { value: 'nagpur', label: 'Nagpur' },
      { value: 'nashik', label: 'Nashik' },
      { value: 'aurangabad', label: 'Aurangabad' }
    ]
  };

  useEffect(() => {
    if (state && districtData?.[state]) {
      setDistricts(districtData?.[state]);
    } else {
      setDistricts([]);
      onDistrictChange('');
    }
  }, [state, onDistrictChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="MapPin" size={18} className="text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">Farm Location</h3>
          <p className="text-xs text-muted-foreground">Select your farming location for weather data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="State"
          placeholder="Select state..."
          options={stateOptions}
          value={state}
          onChange={onStateChange}
          error={stateError}
          disabled={disabled}
          searchable
          required
          description="Choose your state"
        />

        <Select
          label="District"
          placeholder="Select district..."
          options={districts}
          value={district}
          onChange={onDistrictChange}
          error={districtError}
          disabled={disabled || !state}
          searchable
          required
          description="Choose your district"
        />
      </div>
    </div>
  );
};

export default LocationSelector;