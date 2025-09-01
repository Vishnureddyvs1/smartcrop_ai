import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FarmBoundaryDrawer = ({ 
  isDrawingMode, 
  onDrawingToggle, 
  drawnAreas, 
  onAreaComplete,
  onAreaDelete,
  currentLanguage 
}) => {
  const [selectedTool, setSelectedTool] = useState('polygon');
  const [isDrawing, setIsDrawing] = useState(false);

  const translations = {
    en: {
      drawingTools: "Drawing Tools",
      polygon: "Polygon",
      rectangle: "Rectangle",
      circle: "Circle",
      startDrawing: "Start Drawing",
      stopDrawing: "Stop Drawing",
      clearAll: "Clear All",
      farmAreas: "Farm Areas",
      totalArea: "Total Area",
      acres: "acres",
      hectares: "hectares",
      area: "Area"
    },
    hi: {
      drawingTools: "ड्राइंग टूल्स",
      polygon: "बहुभुज",
      rectangle: "आयत",
      circle: "वृत्त",
      startDrawing: "ड्राइंग शुरू करें",
      stopDrawing: "ड्राइंग बंद करें",
      clearAll: "सभी साफ़ करें",
      farmAreas: "खेत के क्षेत्र",
      totalArea: "कुल क्षेत्रफल",
      acres: "एकड़",
      hectares: "हेक्टेयर",
      area: "क्षेत्रफल"
    },
    te: {
      drawingTools: "డ్రాయింగ్ టూల్స్",
      polygon: "బహుభుజి",
      rectangle: "దీర్ఘచతురస్రం",
      circle: "వృత్తం",
      startDrawing: "డ్రాయింగ్ ప్రారంభించండి",
      stopDrawing: "డ్రాయింగ్ ఆపండి",
      clearAll: "అన్నీ క్లియర్ చేయండి",
      farmAreas: "వ్యవసాయ ప్రాంతాలు",
      totalArea: "మొత్తం వైశాల్యం",
      acres: "ఎకరాలు",
      hectares: "హెక్టార్లు",
      area: "వైశాల్యం"
    },
    or: {
      drawingTools: "ଚିତ୍ରାଙ୍କନ ଉପକରଣ",
      polygon: "ବହୁଭୁଜ",
      rectangle: "ଆୟତକ୍ଷେତ୍ର",
      circle: "ବୃତ୍ତ",
      startDrawing: "ଚିତ୍ରାଙ୍କନ ଆରମ୍ଭ କରନ୍ତୁ",
      stopDrawing: "ଚିତ୍ରାଙ୍କନ ବନ୍ଦ କରନ୍ତୁ",
      clearAll: "ସବୁ ସଫା କରନ୍ତୁ",
      farmAreas: "ଚାଷ କ୍ଷେତ୍ର",
      totalArea: "ମୋଟ କ୍ଷେତ୍ରଫଳ",
      acres: "ଏକର",
      hectares: "ହେକ୍ଟର",
      area: "କ୍ଷେତ୍ରଫଳ"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const drawingTools = [
    { id: 'polygon', name: t?.polygon, icon: 'Pentagon' },
    { id: 'rectangle', name: t?.rectangle, icon: 'Square' },
    { id: 'circle', name: t?.circle, icon: 'Circle' }
  ];

  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId);
  };

  const handleStartDrawing = () => {
    setIsDrawing(true);
    onDrawingToggle(true);
  };

  const handleStopDrawing = () => {
    setIsDrawing(false);
    onDrawingToggle(false);
  };

  const handleClearAll = () => {
    drawnAreas?.forEach(area => onAreaDelete(area?.id));
  };

  const calculateTotalArea = () => {
    return drawnAreas?.reduce((total, area) => total + area?.area, 0);
  };

  const formatArea = (area) => {
    const acres = (area * 0.000247105)?.toFixed(2);
    const hectares = (area * 0.0001)?.toFixed(2);
    return `${acres} ${t?.acres} (${hectares} ${t?.hectares})`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Edit3" size={20} className="mr-2" />
        {t?.drawingTools}
      </h3>
      {/* Drawing Tools */}
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {drawingTools?.map((tool) => (
            <Button
              key={tool?.id}
              variant={selectedTool === tool?.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToolSelect(tool?.id)}
              iconName={tool?.icon}
              iconSize={16}
              className="flex-col h-16 text-xs"
            >
              <span className="mt-1">{tool?.name}</span>
            </Button>
          ))}
        </div>

        {/* Drawing Controls */}
        <div className="flex space-x-2">
          {!isDrawing ? (
            <Button
              variant="default"
              onClick={handleStartDrawing}
              iconName="Play"
              iconSize={16}
              className="flex-1"
            >
              {t?.startDrawing}
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={handleStopDrawing}
              iconName="Square"
              iconSize={16}
              className="flex-1"
            >
              {t?.stopDrawing}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleClearAll}
            iconName="Trash2"
            iconSize={16}
            disabled={drawnAreas?.length === 0}
          >
            {t?.clearAll}
          </Button>
        </div>
      </div>
      {/* Farm Areas List */}
      {drawnAreas?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-medium text-foreground mb-3 flex items-center">
            <Icon name="Map" size={18} className="mr-2" />
            {t?.farmAreas}
          </h4>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {drawnAreas?.map((area, index) => (
              <div
                key={area?.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {t?.area} {index + 1}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatArea(area?.area)}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAreaDelete(area?.id)}
                  iconName="Trash2"
                  iconSize={14}
                  className="text-destructive hover:text-destructive"
                />
              </div>
            ))}
          </div>

          {/* Total Area */}
          <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {t?.totalArea}:
              </span>
              <span className="text-sm font-semibold text-primary">
                {formatArea(calculateTotalArea())}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmBoundaryDrawer;