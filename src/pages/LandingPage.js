import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  Zap,
  Lock,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  TrendingUp,
  Eye,
  Brain,
  Cpu
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const LandingPage = () => {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { icon: Users, value: '1K+', label: 'Analyses Completed' },
    { icon: Award, value: '80%', label: 'Model Accuracy' },
    { icon: Lock, value: '100%', label: 'Privacy Guaranteed' },
    { icon: TrendingUp, value: '24/7', label: 'Real-time Detection' },
  ];

  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Detection',
      description: 'Powered by state-of-the-art neural networks trained on millions of real and synthetic media samples.',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get analysis results in seconds with our optimized detection pipeline and cloud infrastructure.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your files are processed securely and automatically deleted after analysis. No data retention.',
    },
    {
      icon: Eye,
      title: 'Visual Analysis',
      description: 'See exactly where manipulations occur with detailed heatmaps and frame-by-frame analysis.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 dark:text-white mb-6">
                Detect Deepfakes{' '}
                <span className="text-gradient">Instantly</span>{' '}
                with AI Precision
              </h1>
              <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8 leading-relaxed">
                Upload an image or video and get instant results powered by advanced neural networks.
                Combat misinformation and promote media transparency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/upload">
                  <Button size="lg" icon={<Search className="w-5 h-5" />}>
                    Analyze Now
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <Card className="p-8 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                      <Cpu className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                      AI Analysis in Progress
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                      Analyzing facial features, lighting, and temporal consistency...
                    </p>
                    <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2 mb-4">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                      />
                    </div>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">
                      Estimated time: 3-5 seconds
                    </p>
                  </div>
                </Card>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <CheckCircle className="w-5 h-5 text-white" />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Shield className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-500 ${currentStat === index
                    ? 'bg-primary-100 dark:bg-primary-900 scale-110'
                    : 'bg-secondary-100 dark:bg-secondary-700'
                  }`}>
                  <stat.icon className={`w-8 h-8 transition-colors duration-500 ${currentStat === index
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-secondary-600 dark:text-secondary-400'
                    }`} />
                </div>
                <motion.div
                  key={currentStat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-secondary-600 dark:text-secondary-400">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary-50 dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              Built with cutting-edge technology and designed for maximum accuracy,
              security, and user experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Detect Deepfakes?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust our platform for accurate,
              fast, and secure deepfake detection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/upload">
                <Button
                  size="lg"
                  variant="secondary"
                  icon={<Search className="w-5 h-5" />}
                >
                  Start Analysis
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
