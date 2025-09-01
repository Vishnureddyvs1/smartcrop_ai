import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChartsSection = ({ historicalData, weatherData }) => {
  const [activeChart, setActiveChart] = useState('yield');

  const chartTabs = [
    { id: 'yield', label: 'Yield Trends', icon: 'BarChart3' },
    { id: 'weather', label: 'Weather Patterns', icon: 'Cloud' },
    { id: 'comparison', label: 'Crop Comparison', icon: 'PieChart' }
  ];

  const cropComparisonData = [
    { name: 'Rice', value: 35, color: '#2D5A27' },
    { name: 'Wheat', value: 28, color: '#4A7C59' },
    { name: 'Maize', value: 22, color: '#1E40AF' },
    { name: 'Others', value: 15, color: '#D97706' }
  ];

  const renderYieldChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={historicalData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis 
          dataKey="year" 
          stroke="#6B7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6B7280"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            fontSize: '12px'
          }}
        />
        <Bar 
          dataKey="yield" 
          fill="#2D5A27"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderWeatherChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={weatherData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis 
          dataKey="month" 
          stroke="#6B7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6B7280"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            fontSize: '12px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="temperature" 
          stroke="#DC2626" 
          strokeWidth={2}
          dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="rainfall" 
          stroke="#1E40AF" 
          strokeWidth={2}
          dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderComparisonChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={cropComparisonData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}%`}
          labelLine={false}
        >
          {cropComparisonData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry?.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            fontSize: '12px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'yield':
        return renderYieldChart();
      case 'weather':
        return renderWeatherChart();
      case 'comparison':
        return renderComparisonChart();
      default:
        return renderYieldChart();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">Analytics & Trends</h2>
        
        {/* Chart Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {chartTabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeChart === tab?.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveChart(tab?.id)}
              iconName={tab?.icon}
              iconPosition="left"
              iconSize={16}
              className="text-xs"
            >
              {tab?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Chart Container */}
      <div className="mb-4">
        {renderActiveChart()}
      </div>
      {/* Chart Description */}
      <div className="bg-muted rounded-lg p-4">
        {activeChart === 'yield' && (
          <div className="flex items-start space-x-3">
            <Icon name="TrendingUp" size={20} className="text-success mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Historical Yield Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Your predicted yield shows a 15% improvement over the 5-year average. 
                Weather conditions and soil quality are favorable for this season.
              </p>
            </div>
          </div>
        )}
        
        {activeChart === 'weather' && (
          <div className="flex items-start space-x-3">
            <Icon name="CloudRain" size={20} className="text-primary mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Weather Pattern Impact</h3>
              <p className="text-sm text-muted-foreground">
                Optimal rainfall distribution expected during critical growth phases. 
                Temperature patterns align well with crop requirements.
              </p>
            </div>
          </div>
        )}
        
        {activeChart === 'comparison' && (
          <div className="flex items-start space-x-3">
            <Icon name="BarChart" size={20} className="text-warning mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Regional Crop Distribution</h3>
              <p className="text-sm text-muted-foreground">
                Rice dominates regional cultivation at 35%. Your crop choice aligns with 
                local farming patterns and market demand.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartsSection;