import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtons = ({ predictionData, onSave, onShare, onViewMap }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [shareMethod, setShareMethod] = useState(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(predictionData);
      // Show success feedback
      setTimeout(() => setIsSaving(false), 1000);
    } catch (error) {
      setIsSaving(false);
      console.error('Save failed:', error);
    }
  };

  const handleShare = async (method) => {
    setIsSharing(true);
    setShareMethod(method);
    try {
      await onShare(predictionData, method);
      setTimeout(() => {
        setIsSharing(false);
        setShareMethod(null);
      }, 1000);
    } catch (error) {
      setIsSharing(false);
      setShareMethod(null);
      console.error('Share failed:', error);
    }
  };

  const shareOptions = [
    {
      id: 'sms',
      label: 'SMS Updates',
      icon: 'MessageSquare',
      description: 'Get prediction updates via SMS',
      color: 'text-primary'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: 'MessageCircle',
      description: 'Share with agricultural advisor',
      color: 'text-success'
    },
    {
      id: 'email',
      label: 'Email Report',
      icon: 'Mail',
      description: 'Send detailed report to email',
      color: 'text-accent'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Save Prediction */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Save" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Save Prediction</h3>
              <p className="text-xs text-muted-foreground">Store for future reference</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            loading={isSaving}
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
          >
            {isSaving ? 'Saving...' : 'Save to History'}
          </Button>
        </div>

        {/* View on Map */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Icon name="MapPin" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Farm Location</h3>
              <p className="text-xs text-muted-foreground">View on interactive map</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={onViewMap}
            iconName="Map"
            iconPosition="left"
          >
            View on Map
          </Button>
        </div>

        {/* New Prediction */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Icon name="Plus" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">New Prediction</h3>
              <p className="text-xs text-muted-foreground">Start fresh analysis</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Plus"
            iconPosition="left"
          >
            New Prediction
          </Button>
        </div>
      </div>
      {/* Share Options */}
      <div className="border-t border-border pt-6">
        <h3 className="font-medium text-foreground mb-4">Share & Notifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {shareOptions?.map((option) => (
            <div key={option?.id} className="border border-border rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={option?.icon} size={18} className={option?.color} />
                <span className="text-sm font-medium text-foreground">{option?.label}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{option?.description}</p>
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                loading={isSharing && shareMethod === option?.id}
                onClick={() => handleShare(option?.id)}
                iconName={option?.icon}
                iconPosition="left"
                className="text-xs"
              >
                {isSharing && shareMethod === option?.id ? 'Sharing...' : 'Share'}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Additional Actions */}
      <div className="border-t border-border pt-6 mt-6">
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
            Export PDF
          </Button>
          <Button variant="ghost" size="sm" iconName="Calendar" iconPosition="left">
            Add to Calendar
          </Button>
          <Button variant="ghost" size="sm" iconName="Bell" iconPosition="left">
            Set Reminders
          </Button>
          <Button variant="ghost" size="sm" iconName="HelpCircle" iconPosition="left">
            Get Help
          </Button>
        </div>
      </div>
      {/* Offline Indicator */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-xs text-muted-foreground">
            Prediction saved locally - Available offline
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;