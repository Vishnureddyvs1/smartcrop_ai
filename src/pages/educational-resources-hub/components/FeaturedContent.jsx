import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedContent = ({ featuredContent }) => {
  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-border rounded-lg overflow-hidden mb-8 shadow-soft">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative h-64 lg:h-auto">
          <Image
            src={featuredContent?.image}
            alt={featuredContent?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
          
          {/* Featured Badge */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              <Icon name="Star" size={14} />
              <span>Featured</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          {/* Category */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
              {featuredContent?.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>{featuredContent?.readingTime}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 leading-tight">
            {featuredContent?.title}
          </h2>

          {/* Description */}
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {featuredContent?.description}
          </p>

          {/* Key Points */}
          {featuredContent?.keyPoints && (
            <ul className="space-y-2 mb-6">
              {featuredContent?.keyPoints?.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="BarChart3" size={14} />
              <span className="capitalize">{featuredContent?.difficulty}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Globe" size={14} />
              <span>{featuredContent?.languages?.length} languages</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Users" size={14} />
              <span>{featuredContent?.views} views</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {featuredContent?.externalUrl ? (
              <Button
                variant="default"
                onClick={() => handleExternalLink(featuredContent?.externalUrl)}
                iconName="ExternalLink"
                iconPosition="right"
                className="flex-1 sm:flex-none"
              >
                Access Resource
              </Button>
            ) : (
              <Button
                variant="default"
                iconName="Play"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Start Learning
              </Button>
            )}
            
            <Button
              variant="outline"
              iconName="Bookmark"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Save for Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;