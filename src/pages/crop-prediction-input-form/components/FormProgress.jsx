import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgress = ({ currentStep, totalSteps, completedFields }) => {
  const steps = [
    { id: 1, name: 'Crop Selection', icon: 'Wheat', fields: ['cropType'] },
    { id: 2, name: 'Location', icon: 'MapPin', fields: ['state', 'district'] },
    { id: 3, name: 'Soil & Area', icon: 'Mountain', fields: ['soilType', 'area', 'unit'] },
    { id: 4, name: 'Advanced Options', icon: 'Settings', fields: ['irrigationMethod'] }
  ];

  const getStepStatus = (step) => {
    const requiredFields = step?.fields;
    const completedCount = requiredFields?.filter(field => completedFields?.[field])?.length;
    
    if (completedCount === requiredFields?.length) return 'completed';
    if (completedCount > 0) return 'in-progress';
    return 'pending';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'in-progress') return 'Clock';
    return step?.icon;
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStepBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10';
      case 'in-progress': return 'bg-warning/10';
      default: return 'bg-muted/30';
    }
  };

  const progressPercentage = (Object.keys(completedFields)?.filter(key => completedFields?.[key])?.length / 6) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Form Progress</h3>
        <span className="text-xs text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {/* Step Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps?.map((step) => {
          const status = getStepStatus(step);
          const iconName = getStepIcon(step, status);
          const colorClass = getStepColor(status);
          const bgClass = getStepBg(status);

          return (
            <div key={step?.id} className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bgClass}`}>
                <Icon name={iconName} size={16} className={colorClass} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate ${colorClass}`}>
                  {step?.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgress;