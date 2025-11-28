import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
  FileText,
  Shield,
  Zap,
  Lock,
  Eye,
  Brain,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'accuracy', name: 'Accuracy & Results' },
    { id: 'privacy', name: 'Privacy & Security' },
    { id: 'technical', name: 'Technical Issues' },
    { id: 'billing', name: 'Billing & Plans' }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How accurate is the deepfake detection?',
      answer: 'Our AI model achieves 80% accuracy in detecting deepfakes across various types of content. The accuracy can vary depending on the quality of the input media and the sophistication of the manipulation techniques used.',
      category: 'accuracy',
      tags: ['accuracy', 'detection', 'AI model']
    },
    {
      id: 2,
      question: 'What file formats are supported?',
      answer: 'We support most common image formats (JPG, PNG, GIF, BMP, WebP) and video formats (MP4, MOV, AVI, MKV, WebM, FLV). Maximum file size is 100MB per file.',
      category: 'getting-started',
      tags: ['file formats', 'supported formats', 'upload']
    },
    {
      id: 3,
      question: 'How long does analysis take?',
      answer: 'Most analyses complete within 3-5 seconds for images and 10-30 seconds for videos, depending on the file size and complexity. You\'ll see a progress indicator during processing.',
      category: 'getting-started',
      tags: ['processing time', 'analysis speed', 'performance']
    },
    {
      id: 4,
      question: 'Is my data secure and private?',
      answer: 'Yes, we take privacy seriously. All uploaded files are automatically deleted after analysis, and we never store or share your content. Our platform uses end-to-end encryption for all data transmission.',
      category: 'privacy',
      tags: ['privacy', 'security', 'data protection']
    },
    {
      id: 5,
      question: 'What does the confidence score mean?',
      answer: 'The confidence score indicates how certain our AI is about the detection result. Scores above 80% are considered highly confident, 60-80% moderately confident, and below 60% uncertain. We recommend treating low-confidence results with caution.',
      category: 'accuracy',
      tags: ['confidence score', 'results interpretation', 'accuracy']
    },
    {
      id: 6,
      question: 'Can I analyze multiple files at once?',
      answer: 'Yes, you can upload up to 5 files simultaneously for batch analysis. Each file will be processed independently and you\'ll receive separate results for each one.',
      category: 'getting-started',
      tags: ['batch upload', 'multiple files', 'bulk analysis']
    },
    {
      id: 7,
      question: 'What if I disagree with the analysis result?',
      answer: 'You can report false positives or negatives using the "Report Issue" button on the results page. This helps us improve our models. We also provide detailed explanations for each detection to help you understand the reasoning.',
      category: 'accuracy',
      tags: ['false positive', 'reporting', 'feedback']
    },
    {
      id: 8,
      question: 'Do you offer API access?',
      answer: 'Yes, we provide REST API access for developers and enterprises. The API allows you to integrate deepfake detection into your own applications. Contact us for API documentation and pricing.',
      category: 'technical',
      tags: ['API', 'integration', 'developers']
    },
    {
      id: 9,
      question: 'How does the heatmap visualization work?',
      answer: 'The heatmap shows areas where our AI detected potential manipulation. Red areas indicate suspicious regions with higher confidence scores. You can adjust the opacity to see the original image underneath.',
      category: 'technical',
      tags: ['heatmap', 'visualization', 'analysis']
    },
    {
      id: 10,
      question: 'What happens if the analysis fails?',
      answer: 'If analysis fails, you\'ll receive an error message with details about the issue. Common causes include unsupported file formats, corrupted files, or server issues. You can try uploading again or contact support if the problem persists.',
      category: 'technical',
      tags: ['error handling', 'troubleshooting', 'support']
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const steps = [
    {
      step: 1,
      title: 'Upload Your Media',
      description: 'Drag and drop your image or video file, or click to browse. You can also capture from webcam or paste a URL.',
      icon: <FileText className="w-6 h-6" />
    },
    {
      step: 2,
      title: 'AI Analysis',
      description: 'Our advanced neural networks analyze facial features, lighting patterns, and temporal consistency.',
      icon: <Brain className="w-6 h-6" />
    },
    {
      step: 3,
      title: 'Review Results',
      description: 'Get detailed results with confidence scores, heatmaps, and explanations of the AI\'s decision.',
      icon: <Eye className="w-6 h-6" />
    }
  ];

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
            Help & Support Center
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            Find answers to common questions, learn how to use our platform,
            and get the support you need.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card hover className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
              Search FAQs
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              Find quick answers to common questions
            </p>
            <Button variant="outline" size="sm">
              Browse FAQs
            </Button>
          </Card>

          <Card hover className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-accent-600 dark:text-accent-400" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
              Live Chat
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              Get instant help from our support team
            </p>
            <Button variant="outline" size="sm">
              Start Chat
            </Button>
          </Card>

          <Card hover className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
              Email Support
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              Send us a detailed message
            </p>
            <Button variant="outline" size="sm">
              Contact Us
            </Button>
          </Card>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
                    placeholder="Search help articles and FAQs..."
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
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <AnimatePresence>
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card>
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-6"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white pr-4">
                          {faq.question}
                        </h3>
                        {expandedFAQ === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                    <AnimatePresence>
                      {expandedFAQ === faq.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6"
                        >
                          <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                              {faq.answer}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6 text-center">
              Still Need Help?
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-8 text-center">
              Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
            </p>

            <form className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="What can we help you with?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Please describe your issue or question in detail..."
                />
              </div>

              <div className="text-center">
                <Button size="lg" icon={<Mail className="w-5 h-5" />}>
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;
