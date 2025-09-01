import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    {
      id: 'predict',
      label: 'New Predict',
      icon: 'Zap',
      path: '/crop-prediction-input-form',
      color: 'text-primary'
    },
    {
      id: 'results',
      label: 'Results',
      icon: 'BarChart3',
      path: '/prediction-results-dashboard',
      color: 'text-accent'
    },
    {
      id: 'history',
      label: 'History',
      icon: 'History',
      path: '/saved-predictions-history',
      color: 'text-success'
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: 'BookOpen',
      path: '/educational-resources-hub',
      color: 'text-warning'
    },
    {
      id: 'map',
      label: 'Map',
      icon: 'MapPin',
      path: '/farm-location-mapping',
      color: 'text-error'
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-elevated z-50 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems?.map((item) => (
          <Link
            key={item?.id}
            to={item?.path}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg touch-target transition-smooth ${
              isActiveRoute(item?.path)
                ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              className={isActiveRoute(item?.path) ? 'text-primary' : item?.color}
            />
            <span className={`text-xs font-medium ${
              isActiveRoute(item?.path) ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {item?.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;