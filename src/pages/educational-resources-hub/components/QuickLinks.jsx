import React from 'react';

import Icon from '../../../components/AppIcon';

const QuickLinks = () => {
  const quickLinks = [
    {
      id: 1,
      title: "Crop Prediction Tool",
      description: "Get AI-powered yield predictions",
      icon: "Zap",
      path: "/crop-prediction-input-form",
      color: "bg-primary text-primary-foreground"
    },
    {
      id: 2,
      title: "View Results",
      description: "Check your prediction results",
      icon: "BarChart3",
      path: "/prediction-results-dashboard",
      color: "bg-secondary text-secondary-foreground"
    },
    {
      id: 3,
      title: "Prediction History",
      description: "Review past predictions",
      icon: "History",
      path: "/saved-predictions-history",
      color: "bg-accent text-accent-foreground"
    },
    {
      id: 4,
      title: "Farm Mapping",
      description: "Map your farm location",
      icon: "MapPin",
      path: "/farm-location-mapping",
      color: "bg-success text-success-foreground"
    }
  ];

  const externalResources = [
    {
      id: 1,
      title: "Ministry of Agriculture",
      description: "Official government portal",
      icon: "ExternalLink",
      url: "https://agricoop.nic.in/",
      color: "bg-orange-500 text-white"
    },
    {
      id: 2,
      title: "ICAR Research",
      description: "Agricultural research council",
      icon: "ExternalLink",
      url: "https://icar.org.in/",
      color: "bg-blue-500 text-white"
    },
    {
      id: 3,
      title: "Kisan Portal",
      description: "Farmer information system",
      icon: "ExternalLink",
      url: "https://mkisan.gov.in/",
      color: "bg-green-500 text-white"
    },
    {
      id: 4,
      title: "Weather Updates",
      description: "Agricultural weather forecasts",
      icon: "ExternalLink",
      url: "https://mausam.imd.gov.in/",
      color: "bg-purple-500 text-white"
    }
  ];

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-soft">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Access</h2>
      {/* Internal Links */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">SmartCrop Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickLinks?.map((link) => (
            <a
              key={link?.id}
              href={link?.path}
              className="group block"
            >
              <div className="bg-muted hover:bg-muted/80 border border-border rounded-lg p-4 transition-smooth">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${link?.color}`}>
                    <Icon name={link?.icon} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {link?.title}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {link?.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* External Resources */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">External Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {externalResources?.map((resource) => (
            <button
              key={resource?.id}
              onClick={() => handleExternalLink(resource?.url)}
              className="group block text-left"
            >
              <div className="bg-muted hover:bg-muted/80 border border-border rounded-lg p-4 transition-smooth">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${resource?.color}`}>
                    <Icon name={resource?.icon} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {resource?.title}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {resource?.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;