import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const routeMap = {
    '/': 'Home',
    '/crop-prediction-input-form': 'Crop Prediction',
    '/prediction-results-dashboard': 'Prediction Results',
    '/educational-resources-hub': 'Educational Resources',
    '/saved-predictions-history': 'Prediction History',
    '/farm-location-mapping': 'Farm Mapping'
  };

  const pathSegments = location?.pathname?.split('/')?.filter(segment => segment !== '');
  
  // Don't show breadcrumb on home page
  if (location?.pathname === '/') {
    return null;
  }

  const breadcrumbItems = [
    { name: 'Home', path: '/' }
  ];

  let currentPath = '';
  pathSegments?.forEach(segment => {
    currentPath += `/${segment}`;
    const routeName = routeMap?.[currentPath];
    if (routeName) {
      breadcrumbItems?.push({
        name: routeName,
        path: currentPath
      });
    }
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground py-3" aria-label="Breadcrumb">
      {breadcrumbItems?.map((item, index) => (
        <React.Fragment key={item?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          )}
          {index === breadcrumbItems?.length - 1 ? (
            <span className="text-foreground font-medium" aria-current="page">
              {item?.name}
            </span>
          ) : (
            <Link
              to={item?.path}
              className="hover:text-foreground transition-smooth"
            >
              {item?.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;