import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ predictions }) => {
  const calculateStats = () => {
    const totalPredictions = predictions?.length;
    const predictionsWithActual = predictions?.filter(p => p?.actualYield)?.length;
    
    const avgPredictedYield = predictions?.length > 0 ? 
      predictions?.reduce((sum, p) => sum + p?.predictedYield, 0) / predictions?.length : 0;
    
    const avgActualYield = predictionsWithActual > 0 ? 
      predictions?.filter(p => p?.actualYield)?.reduce((sum, p) => sum + p?.actualYield, 0) / predictionsWithActual : 0;
    
    const avgAccuracy = predictionsWithActual > 0 ? 
      predictions?.filter(p => p?.actualYield)?.reduce((sum, p) => {
        const accuracy = 100 - Math.abs((p?.actualYield - p?.predictedYield) / p?.predictedYield) * 100;
        return sum + Math.max(0, Math.min(100, accuracy));
      }, 0) / predictionsWithActual : 0;
    
    const totalArea = predictions?.reduce((sum, p) => sum + p?.area, 0);
    
    const cropDistribution = predictions?.reduce((acc, p) => {
      acc[p.cropType] = (acc?.[p?.cropType] || 0) + 1;
      return acc;
    }, {});
    
    const mostCommonCrop = Object.entries(cropDistribution)?.sort((a, b) => b?.[1] - a?.[1])?.[0];

    return {
      totalPredictions,
      predictionsWithActual,
      avgPredictedYield,
      avgActualYield,
      avgAccuracy,
      totalArea,
      mostCommonCrop: mostCommonCrop ? mostCommonCrop?.[0] : 'N/A',
      completionRate: totalPredictions > 0 ? (predictionsWithActual / totalPredictions) * 100 : 0
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: 'Total Predictions',
      value: stats?.totalPredictions,
      icon: 'BarChart3',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Avg Predicted Yield',
      value: `${stats?.avgPredictedYield?.toFixed(1)} t/ha`,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Avg Actual Yield',
      value: stats?.avgActualYield > 0 ? `${stats?.avgActualYield?.toFixed(1)} t/ha` : 'N/A',
      icon: 'Target',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Prediction Accuracy',
      value: stats?.avgAccuracy > 0 ? `${stats?.avgAccuracy?.toFixed(1)}%` : 'N/A',
      icon: 'CheckCircle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Total Area',
      value: `${stats?.totalArea} hectares`,
      icon: 'Maximize',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Most Common Crop',
      value: stats?.mostCommonCrop,
      icon: 'Wheat',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Completion Rate',
      value: `${stats?.completionRate?.toFixed(1)}%`,
      icon: 'Activity',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'With Actual Results',
      value: stats?.predictionsWithActual,
      icon: 'Database',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="PieChart" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Overview Statistics</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-smooth">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
            </div>
            
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {stat?.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Recent Activity</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {predictions?.length > 0 ? 
                `Last prediction made ${Math.ceil((new Date() - new Date(Math.max(...predictions.map(p => new Date(p.date))))) / (1000 * 60 * 60 * 24))} days ago` :
                'No predictions yet'
              }
            </p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Performance Trend</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {stats?.avgAccuracy > 80 ? 'Excellent prediction accuracy' :
               stats?.avgAccuracy > 60 ? 'Good prediction accuracy' :
               stats?.avgAccuracy > 0 ? 'Room for improvement': 'Add actual results to track accuracy'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;