import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' }
  ];

  const navigationItems = [
    {
      name: 'Predict',
      path: '/crop-prediction-input-form',
      icon: 'Zap',
      description: 'AI crop prediction'
    },
    {
      name: 'Results',
      path: '/prediction-results-dashboard',
      icon: 'BarChart3',
      description: 'View predictions'
    },
    {
      name: 'History',
      path: '/saved-predictions-history',
      icon: 'History',
      description: 'Past predictions'
    },
    {
      name: 'Learn',
      path: '/educational-resources-hub',
      icon: 'BookOpen',
      description: 'Educational resources'
    },
    {
      name: 'Map',
      path: '/farm-location-mapping',
      icon: 'MapPin',
      description: 'Farm mapping'
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('smartcrop-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('smartcrop-language', languageCode);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const currentLanguageData = languages?.find(lang => lang?.code === currentLanguage);

  return (
    <>
      <header className="sticky top-0 z-100 bg-background border-b border-border shadow-soft">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Sprout" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-foreground">SmartCrop AI</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth touch-target ${
                  isActiveRoute(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Language Selector - Desktop */}
            <div className="hidden md:block relative">
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e?.target?.value)}
                className="appearance-none bg-muted border border-border rounded-lg px-3 py-2 pr-8 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
              >
                {languages?.map((lang) => (
                  <option key={lang?.code} value={lang?.code}>
                    {lang?.flag} {lang?.name}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-muted-foreground"
              />
            </div>

            {/* Language Selector - Mobile */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="px-2"
              >
                <span className="text-lg">{currentLanguageData?.flag}</span>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden touch-target"
              aria-label="Toggle navigation menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-200 lg:hidden"
            onClick={closeMobileMenu}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-300 lg:hidden shadow-elevated">
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Sprout" size={20} color="white" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">SmartCrop AI</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                  className="touch-target"
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 p-4 space-y-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-smooth touch-target ${
                      isActiveRoute(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <div>
                      <div>{item?.name}</div>
                      <div className="text-xs opacity-70">{item?.description}</div>
                    </div>
                  </Link>
                ))}
              </nav>

              {/* Language Selection */}
              <div className="p-4 border-t border-border">
                <h3 className="text-sm font-medium text-foreground mb-3">Language</h3>
                <div className="grid grid-cols-2 gap-2">
                  {languages?.map((lang) => (
                    <button
                      key={lang?.code}
                      onClick={() => handleLanguageChange(lang?.code)}
                      className={`flex items-center space-x-2 p-2 rounded-lg text-sm font-medium transition-smooth touch-target ${
                        currentLanguage === lang?.code
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <span className="text-base">{lang?.flag}</span>
                      <span className="text-xs">{lang?.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;