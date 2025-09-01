import React from 'react';
import Icon from '../../../components/AppIcon';

const NavigationSidebar = ({ activeCategory, onCategoryChange, categories }) => {
  return (
    <div className="hidden lg:block w-64 bg-card border border-border rounded-lg p-4 shadow-soft sticky top-24 h-fit">
      <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
      <nav className="space-y-1">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth text-left ${
              activeCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={category?.icon} size={18} />
            <div className="flex-1 min-w-0">
              <div className="truncate">{category?.name}</div>
              <div className={`text-xs ${
                activeCategory === category?.id 
                  ? 'text-primary-foreground/70' 
                  : 'text-muted-foreground'
              }`}>
                {category?.count} resources
              </div>
            </div>
          </button>
        ))}
      </nav>
      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Learning Progress</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Articles Read</span>
            <span className="font-medium text-foreground">12/25</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '48%' }}></div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Videos Watched</span>
            <span className="font-medium text-foreground">8/15</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-secondary h-2 rounded-full" style={{ width: '53%' }}></div>
          </div>
        </div>
      </div>
      {/* Bookmarks */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Bookmarks</h4>
          <span className="text-xs text-muted-foreground">5 saved</span>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth">
          <Icon name="Bookmark" size={16} />
          <span>View All Bookmarks</span>
        </button>
      </div>
    </div>
  );
};

export default NavigationSidebar;