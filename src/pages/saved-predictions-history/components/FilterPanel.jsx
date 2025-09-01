import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isExpanded, 
  onToggleExpanded 
}) => {
  const cropOptions = [
    { value: '', label: 'All Crops' },
    { value: 'Rice', label: 'Rice' },
    { value: 'Wheat', label: 'Wheat' },
    { value: 'Maize', label: 'Maize' },
    { value: 'Cotton', label: 'Cotton' },
    { value: 'Sugarcane', label: 'Sugarcane' },
    { value: 'Soybean', label: 'Soybean' },
    { value: 'Groundnut', label: 'Groundnut' },
    { value: 'Pulses', label: 'Pulses' }
  ];

  const seasonOptions = [
    { value: '', label: 'All Seasons' },
    { value: 'Kharif', label: 'Kharif (Monsoon)' },
    { value: 'Rabi', label: 'Rabi (Winter)' },
    { value: 'Zaid', label: 'Zaid (Summer)' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'Hyderabad, Telangana', label: 'Hyderabad, Telangana' },
    { value: 'Bangalore, Karnataka', label: 'Bangalore, Karnataka' },
    { value: 'Chennai, Tamil Nadu', label: 'Chennai, Tamil Nadu' },
    { value: 'Pune, Maharashtra', label: 'Pune, Maharashtra' },
    { value: 'Bhubaneswar, Odisha', label: 'Bhubaneswar, Odisha' },
    { value: 'Jaipur, Rajasthan', label: 'Jaipur, Rajasthan' }
  ];

  const accuracyOptions = [
    { value: '', label: 'All Accuracy Levels' },
    { value: 'high', label: 'High (85%+)' },
    { value: 'medium', label: 'Medium (70-84%)' },
    { value: 'low', label: 'Low (<70%)' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              Active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpanded}
            className="lg:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4 space-y-4">
          {/* Search */}
          <div>
            <Input
              type="search"
              placeholder="Search predictions..."
              value={filters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Crop Type */}
            <Select
              label="Crop Type"
              options={cropOptions}
              value={filters?.cropType || ''}
              onChange={(value) => handleFilterChange('cropType', value)}
              placeholder="Select crop"
            />

            {/* Season */}
            <Select
              label="Season"
              options={seasonOptions}
              value={filters?.season || ''}
              onChange={(value) => handleFilterChange('season', value)}
              placeholder="Select season"
            />

            {/* Location */}
            <Select
              label="Location"
              options={locationOptions}
              value={filters?.location || ''}
              onChange={(value) => handleFilterChange('location', value)}
              placeholder="Select location"
              searchable
            />

            {/* Accuracy */}
            <Select
              label="Accuracy Level"
              options={accuracyOptions}
              value={filters?.accuracy || ''}
              onChange={(value) => handleFilterChange('accuracy', value)}
              placeholder="Select accuracy"
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="From Date"
              value={filters?.fromDate || ''}
              onChange={(e) => handleFilterChange('fromDate', e?.target?.value)}
            />
            
            <Input
              type="date"
              label="To Date"
              value={filters?.toDate || ''}
              onChange={(e) => handleFilterChange('toDate', e?.target?.value)}
            />
          </div>

          {/* Quick Filters */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Quick Filters
            </label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filters?.period === 'last30' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('period', filters?.period === 'last30' ? '' : 'last30')}
              >
                Last 30 Days
              </Button>
              
              <Button
                variant={filters?.period === 'last90' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('period', filters?.period === 'last90' ? '' : 'last90')}
              >
                Last 3 Months
              </Button>
              
              <Button
                variant={filters?.period === 'thisYear' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('period', filters?.period === 'thisYear' ? '' : 'thisYear')}
              >
                This Year
              </Button>
              
              <Button
                variant={filters?.hasActualYield ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('hasActualYield', !filters?.hasActualYield)}
              >
                With Actual Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;