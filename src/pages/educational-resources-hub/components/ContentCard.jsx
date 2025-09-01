import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContentCard = ({ content, onBookmark, isBookmarked }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'bg-success/10 text-success';
      case 'intermediate':
        return 'bg-warning/10 text-warning';
      case 'advanced':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'video':
        return 'Play';
      case 'infographic':
        return 'Image';
      case 'guide':
        return 'BookOpen';
      case 'checklist':
        return 'CheckSquare';
      default:
        return 'FileText';
    }
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-smooth">
      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
          src={content?.image}
          alt={content?.title}
          className="w-full h-full object-cover transition-smooth hover:scale-105"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Content Format Badge */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium">
            <Icon name={getFormatIcon(content?.format)} size={12} />
            <span className="capitalize">{content?.format}</span>
          </div>
        </div>

        {/* Bookmark Button */}
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmark(content?.id)}
            className="bg-background/90 backdrop-blur-sm hover:bg-background"
          >
            <Icon 
              name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
              size={16}
              className={isBookmarked ? "text-primary" : "text-muted-foreground"}
            />
          </Button>
        </div>

        {/* Video Duration for Video Content */}
        {content?.format === 'video' && content?.duration && (
          <div className="absolute bottom-3 right-3">
            <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
              {content?.duration}
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Category & Reading Time */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
            {content?.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="Clock" size={12} />
            <span>{content?.readingTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 leading-tight">
          {content?.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {content?.description}
        </p>

        {/* Tags */}
        {content?.tags && content?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {content?.tags?.slice(0, 3)?.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {content?.tags?.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{content?.tags?.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between mb-4">
          {/* Difficulty Level */}
          <div className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(content?.difficulty)}`}>
            {content?.difficulty}
          </div>

          {/* Language Availability */}
          <div className="flex items-center gap-1">
            {content?.languages?.map((lang, index) => (
              <span key={index} className="text-xs text-muted-foreground">
                {lang === 'en' ? '🇺🇸' : lang === 'hi' ? '🇮🇳' : lang === 'te' ? '🇮🇳' : '🇮🇳'}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {content?.externalUrl ? (
            <Button
              variant="default"
              size="sm"
              onClick={() => handleExternalLink(content?.externalUrl)}
              iconName="ExternalLink"
              iconPosition="right"
              iconSize={14}
              className="flex-1"
            >
              View Resource
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              Read More
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            iconName="Share2"
            className="px-3"
          >
          </Button>
        </div>

        {/* Progress Bar for Multi-part Content */}
        {content?.progress !== undefined && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-medium text-foreground">{content?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full transition-smooth"
                style={{ width: `${content?.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;