import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NearbyResources = ({ selectedLocation, currentLanguage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDetails, setShowDetails] = useState(null);

  const translations = {
    en: {
      nearbyResources: "Nearby Resources",
      all: "All",
      supplies: "Supplies",
      services: "Services",
      government: "Government",
      veterinary: "Veterinary",
      distance: "Distance",
      phone: "Phone",
      directions: "Get Directions",
      openNow: "Open Now",
      closed: "Closed",
      km: "km away",
      viewDetails: "View Details",
      hideDetails: "Hide Details"
    },
    hi: {
      nearbyResources: "आस-पास के संसाधन",
      all: "सभी",
      supplies: "आपूर्ति",
      services: "सेवाएं",
      government: "सरकारी",
      veterinary: "पशु चिकित्सा",
      distance: "दूरी",
      phone: "फोन",
      directions: "दिशा निर्देश",
      openNow: "अभी खुला",
      closed: "बंद",
      km: "किमी दूर",
      viewDetails: "विवरण देखें",
      hideDetails: "विवरण छुपाएं"
    },
    te: {
      nearbyResources: "సమీప వనరులు",
      all: "అన్నీ",
      supplies: "సరఫరాలు",
      services: "సేవలు",
      government: "ప్రభుత్వం",
      veterinary: "పశువైద్యం",
      distance: "దూరం",
      phone: "ఫోన్",
      directions: "దిశలు పొందండి",
      openNow: "ఇప్పుడు తెరిచి ఉంది",
      closed: "మూసివేయబడింది",
      km: "కిమీ దూరంలో",
      viewDetails: "వివరాలు చూడండి",
      hideDetails: "వివరాలు దాచండి"
    },
    or: {
      nearbyResources: "ନିକଟସ୍ଥ ସମ୍ବଳ",
      all: "ସବୁ",
      supplies: "ଯୋଗାଣ",
      services: "ସେବା",
      government: "ସରକାରୀ",
      veterinary: "ପଶୁ ଚିକିତ୍ସା",
      distance: "ଦୂରତା",
      phone: "ଫୋନ୍",
      directions: "ଦିଗ ନିର୍ଦ୍ଦେଶ ପାଆନ୍ତୁ",
      openNow: "ବର୍ତ୍ତମାନ ଖୋଲା",
      closed: "ବନ୍ଦ",
      km: "କିମି ଦୂରରେ",
      viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
      hideDetails: "ବିବରଣୀ ଲୁଚାନ୍ତୁ"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const mockResources = [
    {
      id: 1,
      name: "Krishi Kendra Agricultural Supplies",
      category: "supplies",
      type: "Agricultural Store",
      distance: 2.3,
      phone: "+91 98765 43210",
      address: "Main Market Road, Guntur",
      isOpen: true,
      rating: 4.5,
      services: ["Seeds", "Fertilizers", "Pesticides", "Tools"],
      coordinates: { lat: 16.3067, lng: 80.4365 }
    },
    {
      id: 2,
      name: "District Agriculture Office",
      category: "government",
      type: "Government Office",
      distance: 5.1,
      phone: "+91 98765 43211",
      address: "Collectorate Complex, Guntur",
      isOpen: true,
      rating: 4.0,
      services: ["Subsidies", "Crop Insurance", "Soil Testing", "Training"],
      coordinates: { lat: 16.3067, lng: 80.4365 }
    },
    {
      id: 3,
      name: "Green Valley Veterinary Clinic",
      category: "veterinary",
      type: "Veterinary Clinic",
      distance: 3.7,
      phone: "+91 98765 43212",
      address: "NH-16, Guntur",
      isOpen: false,
      rating: 4.8,
      services: ["Cattle Treatment", "Vaccination", "Emergency Care", "Consultation"],
      coordinates: { lat: 16.3067, lng: 80.4365 }
    },
    {
      id: 4,
      name: "Farm Equipment Rental Service",
      category: "services",
      type: "Equipment Rental",
      distance: 4.2,
      phone: "+91 98765 43213",
      address: "Industrial Area, Guntur",
      isOpen: true,
      rating: 4.3,
      services: ["Tractor Rental", "Harvester", "Irrigation Equipment", "Maintenance"],
      coordinates: { lat: 16.3067, lng: 80.4365 }
    },
    {
      id: 5,
      name: "Organic Fertilizer Depot",
      category: "supplies",
      type: "Organic Supplies",
      distance: 1.8,
      phone: "+91 98765 43214",
      address: "Village Road, Guntur",
      isOpen: true,
      rating: 4.6,
      services: ["Organic Fertilizers", "Bio-pesticides", "Compost", "Seeds"],
      coordinates: { lat: 16.3067, lng: 80.4365 }
    }
  ];

  const categories = [
    { id: 'all', name: t?.all, icon: 'MapPin' },
    { id: 'supplies', name: t?.supplies, icon: 'Package' },
    { id: 'services', name: t?.services, icon: 'Settings' },
    { id: 'government', name: t?.government, icon: 'Building' },
    { id: 'veterinary', name: t?.veterinary, icon: 'Heart' }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? mockResources 
    : mockResources?.filter(resource => resource?.category === selectedCategory);

  const handleGetDirections = (resource) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${resource?.coordinates?.lat},${resource?.coordinates?.lng}`;
    window.open(url, '_blank');
  };

  const toggleDetails = (resourceId) => {
    setShowDetails(showDetails === resourceId ? null : resourceId);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="MapPin" size={20} className="mr-2" />
        {t?.nearbyResources}
      </h3>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={selectedCategory === category?.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category?.id)}
            iconName={category?.icon}
            iconSize={14}
            className="text-xs"
          >
            {category?.name}
          </Button>
        ))}
      </div>
      {/* Resources List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredResources?.map((resource) => (
          <div key={resource?.id} className="border border-border rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm">
                  {resource?.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {resource?.type}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  resource?.isOpen 
                    ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                }`}>
                  {resource?.isOpen ? t?.openNow : t?.closed}
                </span>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                  <span className="text-xs text-muted-foreground">
                    {resource?.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={12} />
                <span>{resource?.distance} {t?.km}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Phone" size={12} />
                <span>{resource?.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleDetails(resource?.id)}
                iconName={showDetails === resource?.id ? "ChevronUp" : "ChevronDown"}
                iconSize={14}
                className="text-xs px-2"
              >
                {showDetails === resource?.id ? t?.hideDetails : t?.viewDetails}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGetDirections(resource)}
                iconName="Navigation"
                iconSize={14}
                className="text-xs"
              >
                {t?.directions}
              </Button>
            </div>

            {/* Expanded Details */}
            {showDetails === resource?.id && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-1">Address:</p>
                  <p className="text-xs text-foreground">{resource?.address}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {resource?.services?.map((service, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredResources?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="MapPin" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No resources found in this category</p>
        </div>
      )}
    </div>
  );
};

export default NearbyResources;