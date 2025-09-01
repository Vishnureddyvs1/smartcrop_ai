import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, onFilterChange, filters }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const topicOptions = [
    { value: 'all', label: 'All Topics' },
    { value: 'ai-agriculture', label: 'AI in Agriculture' },
    { value: 'sustainable-farming', label: 'Sustainable Farming' },
    { value: 'government-schemes', label: 'Government Schemes' },
    { value: 'crop-management', label: 'Crop Management' },
    { value: 'soil-health', label: 'Soil Health' },
    { value: 'water-management', label: 'Water Management' },
    { value: 'pest-control', label: 'Pest Control' }
  ];

  const cropTypeOptions = [
    { value: 'all', label: 'All Crops' },
    { value: 'rice', label: 'Rice' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'cotton', label: 'Cotton' },
    { value: 'sugarcane', label: 'Sugarcane' },
    { value: 'maize', label: 'Maize' },
    { value: 'pulses', label: 'Pulses' },
    { value: 'vegetables', label: 'Vegetables' }
  ];

  const contentFormatOptions = [
    { value: 'all', label: 'All Formats' },
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'infographic', label: 'Infographics' },
    { value: 'guide', label: 'Step-by-step Guides' },
    { value: 'checklist', label: 'Checklists' }
  ];

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-soft">
      {/* Search Input */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search educational content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            onKeyPress={handleKeyPress}
            className="w-full"
          />
        </div>
        <Button
          variant="default"
          onClick={handleSearch}
          iconName="Search"
          className="px-4"
        >
          Search
        </Button>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Topic"
          options={topicOptions}
          value={filters?.topic}
          onChange={(value) => onFilterChange('topic', value)}
          placeholder="Select topic"
        />
        
        <Select
          label="Crop Type"
          options={cropTypeOptions}
          value={filters?.cropType}
          onChange={(value) => onFilterChange('cropType', value)}
          placeholder="Select crop"
        />
        
        <Select
          label="Content Format"
          options={contentFormatOptions}
          value={filters?.contentFormat}
          onChange={(value) => onFilterChange('contentFormat', value)}
          placeholder="Select format"
        />
      </div>
      {/* Active Filters Display */}
      {(filters?.topic !== 'all' || filters?.cropType !== 'all' || filters?.contentFormat !== 'all') && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters?.topic !== 'all' && (
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
              <span>{topicOptions?.find(opt => opt?.value === filters?.topic)?.label}</span>
              <button
                onClick={() => onFilterChange('topic', 'all')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          {filters?.cropType !== 'all' && (
            <div className="flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-1 rounded-md text-xs">
              <span>{cropTypeOptions?.find(opt => opt?.value === filters?.cropType)?.label}</span>
              <button
                onClick={() => onFilterChange('cropType', 'all')}
                className="hover:bg-secondary/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          {filters?.contentFormat !== 'all' && (
            <div className="flex items-center gap-1 bg-accent/10 text-accent px-2 py-1 rounded-md text-xs">
              <span>{contentFormatOptions?.find(opt => opt?.value === filters?.contentFormat)?.label}</span>
              <button
                onClick={() => onFilterChange('contentFormat', 'all')}
                className="hover:bg-accent/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;