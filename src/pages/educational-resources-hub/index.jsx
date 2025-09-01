import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchBar from './components/SearchBar';
import FeaturedContent from './components/FeaturedContent';
import CategorySection from './components/CategorySection';
import QuickLinks from './components/QuickLinks';
import NavigationSidebar from './components/NavigationSidebar';
import Icon from '../../components/AppIcon';

const EducationalResourcesHub = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    topic: 'all',
    cropType: 'all',
    contentFormat: 'all'
  });
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('smartcrop-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data for educational content
  const featuredContent = {
    id: 'featured-1',
    title: "AI-Powered Crop Yield Prediction: A Farmer\'s Complete Guide",
    description: `Learn how artificial intelligence is revolutionizing agriculture by providing accurate crop yield predictions. This comprehensive guide covers everything from understanding AI models to implementing predictions in your farming decisions.`,
    category: "AI in Agriculture",
    readingTime: "15 min read",
    difficulty: "beginner",
    languages: ["en", "hi", "te", "or"],
    views: "2.5K",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop",
    keyPoints: [
      "Understand how AI analyzes soil, weather, and crop data",
      "Learn to interpret prediction confidence intervals",
      "Discover practical applications for farm planning",
      "Access government schemes supporting AI adoption"
    ],
    externalUrl: "https://agricoop.nic.in/en/divisiontype/agriculture-technology"
  };

  const categories = [
    { id: 'all', name: 'All Resources', icon: 'Grid3X3', count: 45 },
    { id: 'ai-agriculture', name: 'AI in Agriculture', icon: 'Zap', count: 12 },
    { id: 'sustainable-farming', name: 'Sustainable Farming', icon: 'Leaf', count: 15 },
    { id: 'government-schemes', name: 'Government Schemes', icon: 'Building2', count: 8 },
    { id: 'crop-management', name: 'Crop Management', icon: 'Sprout', count: 10 }
  ];

  const aiAgricultureContent = [
    {
      id: 'ai-1',
      title: "Understanding Machine Learning in Crop Prediction",
      description: `Discover how machine learning algorithms analyze historical data, weather patterns, and soil conditions to predict crop yields with remarkable accuracy.`,
      category: "AI in Agriculture",
      format: "article",
      readingTime: "8 min read",
      difficulty: "intermediate",
      languages: ["en", "hi"],
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?w=400&h=250&fit=crop",
      tags: ["Machine Learning", "Data Analysis", "Yield Prediction"],
      progress: 65
    },
    {
      id: 'ai-2',
      title: "Smart Sensors for Modern Farming",
      description: `Learn about IoT sensors that monitor soil moisture, temperature, and nutrient levels to provide real-time data for AI-powered farming decisions.`,
      category: "AI in Agriculture",
      format: "video",
      readingTime: "12 min watch",
      duration: "12:34",
      difficulty: "beginner",
      languages: ["en", "hi", "te"],
      image: "https://images.pixabay.com/photo/2020/05/18/16/17/social-media-5187243_1280.jpg?w=400&h=250&fit=crop",
      tags: ["IoT", "Sensors", "Smart Farming"]
    },
    {
      id: 'ai-3',
      title: "Drone Technology in Agriculture",
      description: `Explore how drones equipped with cameras and sensors are revolutionizing crop monitoring, pest detection, and precision agriculture practices.`,
      category: "AI in Agriculture",
      format: "infographic",
      readingTime: "5 min read",
      difficulty: "beginner",
      languages: ["en", "hi", "te", "or"],
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=250&fit=crop",
      tags: ["Drones", "Precision Agriculture", "Monitoring"],
      externalUrl: "https://icar.org.in/"
    }
  ];

  const sustainableFarmingContent = [
    {
      id: 'sf-1',
      title: "Organic Farming Techniques for Better Yields",
      description: `Master organic farming methods that improve soil health, reduce chemical dependency, and increase long-term productivity while protecting the environment.`,
      category: "Sustainable Farming",
      format: "guide",
      readingTime: "20 min read",
      difficulty: "intermediate",
      languages: ["en", "hi", "te"],
      image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?w=400&h=250&fit=crop",
      tags: ["Organic Farming", "Soil Health", "Sustainability"],
      progress: 30
    },
    {
      id: 'sf-2',
      title: "Water Conservation in Agriculture",
      description: `Learn efficient irrigation techniques, rainwater harvesting, and water management strategies to optimize water usage and reduce farming costs.`,
      category: "Sustainable Farming",
      format: "article",
      readingTime: "10 min read",
      difficulty: "beginner",
      languages: ["en", "hi", "or"],
      image: "https://images.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg?w=400&h=250&fit=crop",
      tags: ["Water Conservation", "Irrigation", "Cost Reduction"]
    },
    {
      id: 'sf-3',
      title: "Integrated Pest Management Strategies",
      description: `Implement eco-friendly pest control methods that reduce chemical pesticide use while maintaining crop protection and yield quality.`,
      category: "Sustainable Farming",
      format: "checklist",
      readingTime: "6 min read",
      difficulty: "intermediate",
      languages: ["en", "hi", "te", "or"],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
      tags: ["Pest Management", "Eco-friendly", "Crop Protection"]
    }
  ];

  const governmentSchemesContent = [
    {
      id: 'gs-1',
      title: "PM-KISAN Scheme: Direct Income Support",
      description: `Complete guide to PM-KISAN scheme providing ₹6,000 annual income support to farmers. Learn eligibility criteria, application process, and benefits.`,
      category: "Government Schemes",
      format: "article",
      readingTime: "7 min read",
      difficulty: "beginner",
      languages: ["en", "hi", "te", "or"],
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=400&h=250&fit=crop",
      tags: ["PM-KISAN", "Income Support", "Government Benefits"],
      externalUrl: "https://pmkisan.gov.in/"
    },
    {
      id: 'gs-2',
      title: "Crop Insurance Schemes and Claims",
      description: `Understand various crop insurance schemes, premium calculation, claim procedures, and how to protect your crops against natural calamities.`,
      category: "Government Schemes",
      format: "guide",
      readingTime: "15 min read",
      difficulty: "intermediate",
      languages: ["en", "hi"],
      image: "https://images.pixabay.com/photo/2016/11/09/12/16/agriculture-1811935_1280.jpg?w=400&h=250&fit=crop",
      tags: ["Crop Insurance", "Risk Management", "Claims Process"]
    },
    {
      id: 'gs-3',
      title: "Soil Health Card Scheme Benefits",
      description: `Learn how to obtain and use soil health cards to improve soil fertility, optimize fertilizer usage, and increase crop productivity.`,
      category: "Government Schemes",
      format: "video",
      readingTime: "9 min watch",
      duration: "09:15",
      difficulty: "beginner",
      languages: ["en", "hi", "te", "or"],
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
      tags: ["Soil Health", "Fertilizer Optimization", "Productivity"]
    }
  ];

  // Filter content based on search and filters
  const filterContent = (content) => {
    return content?.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));

      const matchesTopic = filters?.topic === 'all' || item?.category?.toLowerCase()?.replace(/\s+/g,'-') === filters?.topic;

      const matchesFormat = filters?.contentFormat === 'all' || 
        item?.format === filters?.contentFormat;

      return matchesSearch && matchesTopic && matchesFormat;
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleBookmark = (contentId) => {
    setBookmarkedItems(prev => 
      prev?.includes(contentId) 
        ? prev?.filter(id => id !== contentId)
        : [...prev, contentId]
    );
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === 'all') {
      setFilters(prev => ({ ...prev, topic: 'all' }));
    } else {
      setFilters(prev => ({ ...prev, topic: categoryId }));
    }
  };

  const filteredAiContent = filterContent(aiAgricultureContent);
  const filteredSustainableContent = filterContent(sustainableFarmingContent);
  const filteredGovernmentContent = filterContent(governmentSchemesContent);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Educational Resources Hub</h1>
              <p className="text-muted-foreground">
                Learn about AI agriculture, sustainable farming, and government schemes
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <NavigationSidebar
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            <SearchBar
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              filters={filters}
            />

            {/* Quick Links */}
            <QuickLinks />

            {/* Featured Content */}
            <FeaturedContent featuredContent={featuredContent} />

            {/* Content Sections */}
            {(activeCategory === 'all' || activeCategory === 'ai-agriculture') && (
              <CategorySection
                title="AI in Agriculture"
                description="Understand how artificial intelligence is transforming modern farming"
                icon="Zap"
                contents={filteredAiContent}
                onBookmark={handleBookmark}
                bookmarkedItems={bookmarkedItems}
                onViewAll={() => handleCategoryChange('ai-agriculture')}
              />
            )}

            {(activeCategory === 'all' || activeCategory === 'sustainable-farming') && (
              <CategorySection
                title="Sustainable Farming Tips"
                description="Practical guidance for eco-friendly and profitable farming"
                icon="Leaf"
                contents={filteredSustainableContent}
                onBookmark={handleBookmark}
                bookmarkedItems={bookmarkedItems}
                onViewAll={() => handleCategoryChange('sustainable-farming')}
              />
            )}

            {(activeCategory === 'all' || activeCategory === 'government-schemes') && (
              <CategorySection
                title="Government Schemes"
                description="Explore agricultural schemes and financial support programs"
                icon="Building2"
                contents={filteredGovernmentContent}
                onBookmark={handleBookmark}
                bookmarkedItems={bookmarkedItems}
                onViewAll={() => handleCategoryChange('government-schemes')}
              />
            )}

            {/* No Results Message */}
            {searchQuery && 
             filteredAiContent?.length === 0 && 
             filteredSustainableContent?.length === 0 && 
             filteredGovernmentContent?.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find relevant content.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({ topic: 'all', cropType: 'all', contentFormat: 'all' });
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EducationalResourcesHub;