import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  ExternalLink, 
  TrendingUp, 
  AlertTriangle,
  BookOpen,
  Globe,
  Users,
  Zap,
  Shield,
  Brain
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    { id: 'all', name: 'All News', icon: <Globe className="w-4 h-4" /> },
    { id: 'tech', name: 'Tech Updates', icon: <Zap className="w-4 h-4" /> },
    { id: 'global', name: 'Global News', icon: <Globe className="w-4 h-4" /> },
    { id: 'research', name: 'Research Papers', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'security', name: 'Security Alerts', icon: <Shield className="w-4 h-4" /> }
  ];

  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'breaking', name: 'Breaking News' },
    { id: 'analysis', name: 'Analysis' },
    { id: 'tutorial', name: 'Tutorial' },
    { id: 'case-study', name: 'Case Study' }
  ];

  const newsArticles = [
    {
      id: 1,
      title: 'Major Deepfake Scam Caught by AI Detector – $2M Prevented',
      excerpt: 'Our platform successfully identified a sophisticated deepfake video used in a corporate fraud attempt, preventing a $2 million loss.',
      category: 'global',
      type: 'breaking',
      date: '2025-01-15',
      readTime: '3 min read',
      image: '/api/placeholder/400/250',
      featured: true,
      tags: ['Fraud Prevention', 'Corporate Security', 'AI Detection']
    },
    {
      id: 2,
      title: 'New Model Update v2.1: 10% Boost in Accuracy',
      excerpt: 'Latest update to our detection algorithms shows significant improvements in identifying subtle manipulation techniques.',
      category: 'tech',
      type: 'analysis',
      date: '2025-01-12',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
      featured: false,
      tags: ['Model Update', 'Accuracy', 'AI Research']
    },
    {
      id: 3,
      title: 'Exploring Legal Implications of Deepfake Content',
      excerpt: 'Comprehensive analysis of current legal frameworks and proposed regulations for AI-generated content.',
      category: 'research',
      type: 'analysis',
      date: '2025-01-10',
      readTime: '8 min read',
      image: '/api/placeholder/400/250',
      featured: false,
      tags: ['Legal Analysis', 'Regulation', 'AI Ethics']
    },
    {
      id: 4,
      title: 'How to Spot Deepfakes: A Complete Guide',
      excerpt: 'Learn the telltale signs of manipulated content and how to protect yourself from misinformation.',
      category: 'tech',
      type: 'tutorial',
      date: '2025-01-08',
      readTime: '6 min read',
      image: '/api/placeholder/400/250',
      featured: false,
      tags: ['Tutorial', 'Education', 'Detection Tips']
    },
    {
      id: 5,
      title: 'Deepfake Detection in Political Campaigns',
      excerpt: 'Case study examining the role of AI detection in maintaining electoral integrity during the 2024 elections.',
      category: 'global',
      type: 'case-study',
      date: '2025-01-05',
      readTime: '7 min read',
      image: '/api/placeholder/400/250',
      featured: false,
      tags: ['Politics', 'Elections', 'Case Study']
    },
    {
      id: 6,
      title: 'Security Alert: New Deepfake Generation Techniques',
      excerpt: 'Researchers identify emerging methods used to create more convincing deepfakes and our response strategies.',
      category: 'security',
      type: 'breaking',
      date: '2025-01-03',
      readTime: '4 min read',
      image: '/api/placeholder/400/250',
      featured: false,
      tags: ['Security Alert', 'New Techniques', 'Threat Analysis']
    }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesType = selectedType === 'all' || article.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      global: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      tech: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      research: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      security: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getTypeIcon = (type) => {
    const icons = {
      breaking: <AlertTriangle className="w-4 h-4" />,
      analysis: <Brain className="w-4 h-4" />,
      tutorial: <BookOpen className="w-4 h-4" />,
      'case-study': <Users className="w-4 h-4" />
    };
    return icons[type] || <BookOpen className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Latest Deepfake News & Research
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            Stay informed about the latest developments in deepfake detection, 
            AI research, and media authenticity.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search articles, tags, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                    }`}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2 mt-4">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedType === type.id
                      ? 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300'
                      : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                  }`}
                >
                  {getTypeIcon(type.id)}
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Featured Article */}
        {featuredArticle && selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(featuredArticle.category)}`}>
                      {categories.find(c => c.id === featuredArticle.category)?.name}
                    </span>
                    <div className="flex items-center space-x-2 text-secondary-500 dark:text-secondary-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(featuredArticle.date)}</span>
                    </div>
                    <span className="text-sm text-secondary-500 dark:text-secondary-400">
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredArticle.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button icon={<ExternalLink className="w-4 h-4" />}>
                    Read Full Article
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Articles Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {regularArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="overflow-hidden h-full">
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(article.category)}`}>
                          {categories.find(c => c.id === article.category)?.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2 text-secondary-500 dark:text-secondary-400">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{formatDate(article.date)}</span>
                        </div>
                        <span className="text-sm text-secondary-500 dark:text-secondary-400">
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 2 && (
                          <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 text-xs rounded-full">
                            +{article.tags.length - 2}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<ExternalLink className="w-4 h-4" />}
                        className="w-full"
                      >
                        Read More
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="text-center p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest deepfake detection news, 
              research updates, and security alerts delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button icon={<TrendingUp className="w-4 h-4" />}>
                Subscribe
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsPage;
