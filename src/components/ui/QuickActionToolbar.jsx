import React, { useState } from 'react';
import Button from './Button';


const QuickActionToolbar = ({ 
  actions = [], 
  orientation = 'horizontal',
  className = '',
  showLabels = true,
  size = 'default'
}) => {
  const [activeAction, setActiveAction] = useState(null);

  const defaultActions = [
    {
      id: 'save',
      label: 'Save Prediction',
      icon: 'Save',
      variant: 'default',
      tooltip: 'Save current prediction for future reference',
      onClick: () => console.log('Save prediction')
    },
    {
      id: 'share',
      label: 'Share',
      icon: 'Share2',
      variant: 'outline',
      tooltip: 'Share prediction via SMS or WhatsApp',
      onClick: () => console.log('Share prediction')
    },
    {
      id: 'export',
      label: 'Export',
      icon: 'Download',
      variant: 'outline',
      tooltip: 'Export prediction data as PDF',
      onClick: () => console.log('Export prediction')
    },
    {
      id: 'help',
      label: 'Help',
      icon: 'HelpCircle',
      variant: 'ghost',
      tooltip: 'Get help understanding predictions',
      onClick: () => console.log('Show help')
    }
  ];

  const toolbarActions = actions?.length > 0 ? actions : defaultActions;

  const handleActionClick = (action) => {
    setActiveAction(action?.id);
    if (action?.onClick) {
      action?.onClick();
    }
    // Reset active state after animation
    setTimeout(() => setActiveAction(null), 200);
  };

  const containerClasses = `
    flex gap-2 p-2 bg-card border border-border rounded-lg shadow-soft
    ${orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}
    ${className}
  `;

  return (
    <div className={containerClasses}>
      {toolbarActions?.map((action) => (
        <div key={action?.id} className="relative group">
          <Button
            variant={action?.variant || 'outline'}
            size={size}
            onClick={() => handleActionClick(action)}
            className={`
              touch-target transition-smooth
              ${orientation === 'vertical' ? 'w-full justify-start' : ''}
              ${activeAction === action?.id ? 'scale-95' : ''}
              ${!showLabels && orientation === 'horizontal' ? 'px-3' : ''}
            `}
            iconName={action?.icon}
            iconPosition="left"
            iconSize={18}
            disabled={action?.disabled}
          >
            {showLabels ? action?.label : ''}
          </Button>
          
          {/* Tooltip */}
          {action?.tooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-elevated opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap z-200">
              {action?.tooltip}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuickActionToolbar;