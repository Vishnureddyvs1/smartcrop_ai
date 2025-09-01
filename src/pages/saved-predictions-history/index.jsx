import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PredictionCard from './components/PredictionCard';
import FilterPanel from './components/FilterPanel';
import PredictionDetailModal from './components/PredictionDetailModal';
import ComparisonModal from './components/ComparisonModal';
import StatsOverview from './components/StatsOverview';

const SavedPredictionsHistory = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [predictions, setPredictions] = useState([]);
  const [filteredPredictions, setFilteredPredictions] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    cropType: '',
    season: '',
    location: '',
    accuracy: '',
    fromDate: '',
    toDate: '',
    period: '',
    hasActualYield: false
  });
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [selectedPredictions, setSelectedPredictions] = useState([]);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Mock data for saved predictions
  const mockPredictions = [
    {
      id: 1,
      cropType: 'Rice',
      season: 'Kharif',
      location: 'Hyderabad, Telangana',
      area: 2.5,
      date: '2024-07-15',
      predictedYield: 4.2,
      actualYield: 4.0,
      confidence: 87,
      accuracy: 95.2,
      soilType: 'Clay Loam',
      soilPh: 6.8,
      soilMoisture: 65,
      organicMatter: 3.2,
      avgTemperature: 28,
      rainfall: 1200,
      humidity: 78,
      sunshineHours: 6.5,
      fertilizerType: 'NPK 10:26:26',
      irrigationMethod: 'Drip Irrigation',
      seedVariety: 'BPT 5204',
      previousCrop: 'Wheat',
      recommendations: [
        'Apply organic fertilizer 2 weeks before sowing',
        'Maintain soil moisture at 60-70%',
        'Monitor for brown plant hopper'
      ],
      notes: 'Good harvest despite late monsoon. Followed all recommendations.'
    },
    {
      id: 2,
      cropType: 'Wheat',
      season: 'Rabi',
      location: 'Pune, Maharashtra',
      area: 3.0,
      date: '2024-06-20',
      predictedYield: 3.8,
      actualYield: 3.5,
      confidence: 82,
      accuracy: 92.1,
      soilType: 'Sandy Loam',
      soilPh: 7.2,
      soilMoisture: 55,
      organicMatter: 2.8,
      avgTemperature: 25,
      rainfall: 800,
      humidity: 65,
      sunshineHours: 7.2,
      fertilizerType: 'Urea + DAP',
      irrigationMethod: 'Sprinkler',
      seedVariety: 'HD 2967',
      previousCrop: 'Cotton',
      recommendations: [
        'Apply nitrogen in split doses',
        'Ensure proper drainage',
        'Watch for rust disease'
      ],
      notes: 'Slightly lower yield due to unexpected hailstorm in March.'
    },
    {
      id: 3,
      cropType: 'Maize',
      season: 'Kharif',
      location: 'Bangalore, Karnataka',
      area: 1.8,
      date: '2024-08-10',
      predictedYield: 5.5,
      actualYield: null,
      confidence: 89,
      accuracy: null,
      soilType: 'Red Soil',
      soilPh: 6.5,
      soilMoisture: 70,
      organicMatter: 3.5,
      avgTemperature: 26,
      rainfall: 900,
      humidity: 72,
      sunshineHours: 6.8,
      fertilizerType: 'NPK 20:20:0',
      irrigationMethod: 'Flood Irrigation',
      seedVariety: 'NK 6240',
      previousCrop: 'Groundnut',
      recommendations: [
        'Apply zinc sulfate for better growth',
        'Maintain weed-free conditions',
        'Monitor for fall armyworm'
      ],
      notes: ''
    },
    {
      id: 4,
      cropType: 'Cotton',
      season: 'Kharif',
      location: 'Chennai, Tamil Nadu',
      area: 4.2,
      date: '2024-05-30',
      predictedYield: 2.8,
      actualYield: 2.9,
      confidence: 85,
      accuracy: 96.4,
      soilType: 'Black Cotton Soil',
      soilPh: 7.8,
      soilMoisture: 60,
      organicMatter: 2.5,
      avgTemperature: 30,
      rainfall: 1100,
      humidity: 80,
      sunshineHours: 7.5,
      fertilizerType: 'Complex Fertilizer',
      irrigationMethod: 'Drip Irrigation',
      seedVariety: 'Bt Cotton',
      previousCrop: 'Sorghum',
      recommendations: [
        'Regular monitoring for bollworm',
        'Maintain proper plant spacing',
        'Apply potash during flowering'
      ],
      notes: 'Excellent yield with proper pest management.'
    },
    {
      id: 5,
      cropType: 'Sugarcane',
      season: 'Annual',
      location: 'Bhubaneswar, Odisha',
      area: 2.0,
      date: '2024-04-15',
      predictedYield: 65.0,
      actualYield: 62.5,
      confidence: 91,
      accuracy: 96.2,
      soilType: 'Alluvial Soil',
      soilPh: 6.9,
      soilMoisture: 75,
      organicMatter: 4.0,
      avgTemperature: 29,
      rainfall: 1300,
      humidity: 82,
      sunshineHours: 6.0,
      fertilizerType: 'FYM + NPK',
      irrigationMethod: 'Furrow Irrigation',
      seedVariety: 'Co 86032',
      previousCrop: 'Rice',
      recommendations: [
        'Apply organic matter regularly',
        'Ensure adequate water supply',
        'Monitor for red rot disease'
      ],
      notes: 'Good cane quality with high sugar content.'
    },
    {
      id: 6,
      cropType: 'Soybean',
      season: 'Kharif',
      location: 'Jaipur, Rajasthan',
      area: 3.5,
      date: '2024-07-25',
      predictedYield: 2.2,
      actualYield: null,
      confidence: 78,
      accuracy: null,
      soilType: 'Sandy Soil',
      soilPh: 7.0,
      soilMoisture: 50,
      organicMatter: 2.0,
      avgTemperature: 32,
      rainfall: 650,
      humidity: 60,
      sunshineHours: 8.0,
      fertilizerType: 'DAP + MOP',
      irrigationMethod: 'Rainfed',
      seedVariety: 'JS 335',
      previousCrop: 'Mustard',
      recommendations: [
        'Inoculate seeds with rhizobium',
        'Apply phosphorus fertilizer',
        'Monitor soil moisture levels'
      ],
      notes: ''
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('smartcrop-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Initialize predictions
    setPredictions(mockPredictions);
    setFilteredPredictions(mockPredictions);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, predictions, sortBy, sortOrder]);

  const applyFilters = () => {
    let filtered = [...predictions];

    // Search filter
    if (filters?.search) {
      filtered = filtered?.filter(p => 
        p?.cropType?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        p?.location?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        p?.season?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Crop type filter
    if (filters?.cropType) {
      filtered = filtered?.filter(p => p?.cropType === filters?.cropType);
    }

    // Season filter
    if (filters?.season) {
      filtered = filtered?.filter(p => p?.season === filters?.season);
    }

    // Location filter
    if (filters?.location) {
      filtered = filtered?.filter(p => p?.location === filters?.location);
    }

    // Accuracy filter
    if (filters?.accuracy) {
      filtered = filtered?.filter(p => {
        if (!p?.accuracy) return false;
        switch (filters?.accuracy) {
          case 'high': return p?.accuracy >= 85;
          case 'medium': return p?.accuracy >= 70 && p?.accuracy < 85;
          case 'low': return p?.accuracy < 70;
          default: return true;
        }
      });
    }

    // Date range filters
    if (filters?.fromDate) {
      filtered = filtered?.filter(p => new Date(p.date) >= new Date(filters.fromDate));
    }
    if (filters?.toDate) {
      filtered = filtered?.filter(p => new Date(p.date) <= new Date(filters.toDate));
    }

    // Period filter
    if (filters?.period) {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (filters?.period) {
        case 'last30':
          cutoffDate?.setDate(now?.getDate() - 30);
          break;
        case 'last90':
          cutoffDate?.setDate(now?.getDate() - 90);
          break;
        case 'thisYear':
          cutoffDate?.setMonth(0, 1);
          break;
      }
      
      if (filters?.period !== '') {
        filtered = filtered?.filter(p => new Date(p.date) >= cutoffDate);
      }
    }

    // Has actual yield filter
    if (filters?.hasActualYield) {
      filtered = filtered?.filter(p => p?.actualYield !== null);
    }

    // Sorting
    filtered?.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'cropType':
          aValue = a?.cropType;
          bValue = b?.cropType;
          break;
        case 'predictedYield':
          aValue = a?.predictedYield;
          bValue = b?.predictedYield;
          break;
        case 'accuracy':
          aValue = a?.accuracy || 0;
          bValue = b?.accuracy || 0;
          break;
        default:
          aValue = a?.date;
          bValue = b?.date;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredPredictions(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      cropType: '',
      season: '',
      location: '',
      accuracy: '',
      fromDate: '',
      toDate: '',
      period: '',
      hasActualYield: false
    });
  };

  const handleSelectPrediction = (predictionId) => {
    setSelectedPredictions(prev => 
      prev?.includes(predictionId) 
        ? prev?.filter(id => id !== predictionId)
        : [...prev, predictionId]
    );
  };

  const handleSelectAll = () => {
    const currentPagePredictions = getCurrentPagePredictions()?.map(p => p?.id);
    const allSelected = currentPagePredictions?.every(id => selectedPredictions?.includes(id));
    
    if (allSelected) {
      setSelectedPredictions(prev => prev?.filter(id => !currentPagePredictions?.includes(id)));
    } else {
      setSelectedPredictions(prev => [...new Set([...prev, ...currentPagePredictions])]);
    }
  };

  const handleViewPrediction = (prediction) => {
    setSelectedPrediction(prediction);
    setIsDetailModalOpen(true);
  };

  const handleSharePrediction = (prediction) => {
    // Mock share functionality
    const shareText = `SmartCrop AI Prediction:\n${prediction?.cropType} - ${prediction?.predictedYield?.toFixed(1)} tonnes/hectare\nLocation: ${prediction?.location}\nDate: ${new Date(prediction.date)?.toLocaleDateString('en-IN')}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Crop Prediction',
        text: shareText,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(shareText);
      alert('Prediction details copied to clipboard!');
    }
  };

  const handleSetReminder = (prediction) => {
    // Mock reminder functionality
    alert(`Reminder set for ${prediction?.cropType} harvest monitoring!`);
  };

  const handleComparePredictions = (prediction) => {
    if (prediction) {
      setSelectedPredictions([prediction?.id]);
    }
    setIsComparisonModalOpen(true);
  };

  const handleUpdateActualYield = (predictionId, data) => {
    setPredictions(prev => prev?.map(p => 
      p?.id === predictionId 
        ? { ...p, actualYield: data?.actualYield, notes: data?.notes }
        : p
    ));
  };

  const getCurrentPagePredictions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPredictions?.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredPredictions?.length / itemsPerPage);

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'cropType', label: 'Crop Type' },
    { value: 'predictedYield', label: 'Predicted Yield' },
    { value: 'accuracy', label: 'Accuracy' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Saved Predictions History
            </h1>
            <p className="text-muted-foreground">
              Track and compare your crop predictions over multiple seasons
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link to="/crop-prediction-input-form">
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
              >
                New Prediction
              </Button>
            </Link>
            
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
            >
              Export All
            </Button>
          </div>
        </div>

        {/* Statistics Overview */}
        <StatsOverview predictions={predictions} />

        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          isExpanded={isFilterExpanded}
          onToggleExpanded={() => setIsFilterExpanded(!isFilterExpanded)}
        />

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={getCurrentPagePredictions()?.length > 0 && getCurrentPagePredictions()?.every(p => selectedPredictions?.includes(p?.id))}
                onChange={handleSelectAll}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">
                {selectedPredictions?.length} selected
              </span>
            </div>
            
            {selectedPredictions?.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleComparePredictions()}
                  iconName="BarChart3"
                  iconPosition="left"
                  disabled={selectedPredictions?.length < 2}
                >
                  Compare
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Selected
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e?.target?.value)}
                className="text-sm border border-border rounded px-2 py-1 bg-background text-foreground"
              >
                {sortOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={16} />
              </Button>
            </div>

            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant={viewMode === 'cards' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('cards')}
                iconName="Grid3X3"
              />
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                iconName="List"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredPredictions?.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No predictions found
            </h3>
            <p className="text-muted-foreground mb-6">
              {Object.values(filters)?.some(v => v !== '' && v !== false) 
                ? 'Try adjusting your filters to see more results.' :'Start by creating your first crop prediction.'
              }
            </p>
            <Link to="/crop-prediction-input-form">
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
              >
                Create First Prediction
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Predictions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getCurrentPagePredictions()?.map((prediction) => (
                <PredictionCard
                  key={prediction?.id}
                  prediction={prediction}
                  onView={handleViewPrediction}
                  onShare={handleSharePrediction}
                  onSetReminder={handleSetReminder}
                  onCompare={handleComparePredictions}
                  isSelected={selectedPredictions?.includes(prediction?.id)}
                  onSelect={handleSelectPrediction}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  iconName="ChevronLeft"
                />
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)?.map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  iconName="ChevronRight"
                />
              </div>
            )}
          </>
        )}

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/crop-prediction-input-form">
              <Button
                variant="outline"
                fullWidth
                iconName="Plus"
                iconPosition="left"
              >
                New Prediction
              </Button>
            </Link>
            
            <Button
              variant="outline"
              fullWidth
              iconName="BarChart3"
              iconPosition="left"
              onClick={() => setIsComparisonModalOpen(true)}
            >
              Compare All
            </Button>
            
            <Button
              variant="outline"
              fullWidth
              iconName="Download"
              iconPosition="left"
            >
              Export Report
            </Button>
            
            <Link to="/educational-resources-hub">
              <Button
                variant="outline"
                fullWidth
                iconName="BookOpen"
                iconPosition="left"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </main>
      {/* Modals */}
      <PredictionDetailModal
        prediction={selectedPrediction}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onUpdateActualYield={handleUpdateActualYield}
      />
      <ComparisonModal
        predictions={predictions}
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        selectedPredictions={selectedPredictions?.map(id => predictions?.find(p => p?.id === id))?.filter(Boolean)}
      />
    </div>
  );
};

export default SavedPredictionsHistory;