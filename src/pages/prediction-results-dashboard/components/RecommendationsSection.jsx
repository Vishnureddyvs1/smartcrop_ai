import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsSection = ({ recommendations }) => {
  const [expandedSection, setExpandedSection] = useState('irrigation');

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const getRecommendationIcon = (type) => {
    const iconMap = {
      irrigation: 'Droplets',
      fertilization: 'Leaf',
      pestControl: 'Shield',
      harvesting: 'Scissors'
    };
    return iconMap?.[type] || 'Info';
  };

  const getRecommendationColor = (priority) => {
    const colorMap = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-success'
    };
    return colorMap?.[priority] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Personalized Recommendations</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Sparkles" size={16} />
          <span>AI-Generated</span>
        </div>
      </div>
      <div className="space-y-4">
        {recommendations?.map((recommendation) => (
          <div key={recommendation?.id} className="border border-border rounded-lg overflow-hidden">
            {/* Header */}
            <button
              onClick={() => toggleSection(recommendation?.id)}
              className="w-full flex items-center justify-between p-4 bg-muted hover:bg-muted/80 transition-smooth touch-target"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-background ${getRecommendationColor(recommendation?.priority)}`}>
                  <Icon name={getRecommendationIcon(recommendation?.type)} size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-foreground">{recommendation?.title}</h3>
                  <p className="text-sm text-muted-foreground">{recommendation?.summary}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  recommendation?.priority === 'high' ? 'bg-error/10 text-error' :
                  recommendation?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                }`}>
                  {recommendation?.priority}
                </span>
                <Icon 
                  name={expandedSection === recommendation?.id ? 'ChevronUp' : 'ChevronDown'} 
                  size={20} 
                  className="text-muted-foreground"
                />
              </div>
            </button>

            {/* Expanded Content */}
            {expandedSection === recommendation?.id && (
              <div className="p-4 border-t border-border">
                <div className="space-y-4">
                  {/* Description */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Recommendation Details</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {recommendation?.description}
                    </p>
                  </div>

                  {/* Timeline */}
                  {recommendation?.timeline && (
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Implementation Timeline</h4>
                      <div className="space-y-3">
                        {recommendation?.timeline?.map((step, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-foreground">{step?.action}</p>
                                <span className="text-xs text-muted-foreground">{step?.timing}</span>
                              </div>
                              {step?.details && (
                                <p className="text-xs text-muted-foreground mt-1">{step?.details}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {recommendation?.benefits && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Expected Benefits</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {recommendation?.benefits?.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Icon name="CheckCircle" size={16} className="text-success" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
                      Add to Calendar
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Share2" iconPosition="left">
                      Share with Advisor
                    </Button>
                    {recommendation?.learnMoreUrl && (
                      <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="left">
                        Learn More
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-bold text-error">
            {recommendations?.filter(r => r?.priority === 'high')?.length}
          </div>
          <div className="text-xs text-muted-foreground">High Priority</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-bold text-warning">
            {recommendations?.filter(r => r?.priority === 'medium')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Medium Priority</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-bold text-success">
            {recommendations?.filter(r => r?.priority === 'low')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Low Priority</div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsSection;