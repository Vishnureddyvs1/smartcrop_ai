import React from 'react';
import Icon from '../../../components/AppIcon';
import ContentCard from './ContentCard';

const CategorySection = ({ 
  title, 
  description, 
  icon, 
  contents, 
  onBookmark, 
  bookmarkedItems,
  viewAll = false,
  onViewAll 
}) => {
  const displayContents = viewAll ? contents : contents?.slice(0, 3);

  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        {contents?.length > 3 && !viewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-smooth"
          >
            <span>View All</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        )}
      </div>
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayContents?.map((content) => (
          <ContentCard
            key={content?.id}
            content={content}
            onBookmark={onBookmark}
            isBookmarked={bookmarkedItems?.includes(content?.id)}
          />
        ))}
      </div>
      {/* Show More Button for Mobile */}
      {contents?.length > 3 && !viewAll && (
        <div className="mt-4 text-center md:hidden">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-smooth"
          >
            <span>Show More {title}</span>
            <Icon name="ChevronDown" size={16} />
          </button>
        </div>
      )}
      {/* Empty State */}
      {displayContents?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No content found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters to find relevant content.</p>
        </div>
      )}
    </section>
  );
};

export default CategorySection;