import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Brain,
  Lock,
  Users,
  Award,
  Target,
  Zap,
  Eye,
  Cpu,
  Database,
  Globe,
  Heart,
  TrendingUp,
  CheckCircle,
  Linkedin,
  Github,
  Mail
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const AboutPage = () => {
  const team = [
    {
      name: ' Dipak Khandagale',
      role: 'AI/ML Developer',
      bio: 'Designs and implements the Deepfake Detection model, ensuring high accuracy and robust performance.',
      image: '/Dipak.jpg',
      social: {
        linkedin: 'linkedin.com/in/dipak-khandagale-180b74264',
        github: 'https://github.com/Dipak7781',
        email: 'khandagaledipak47@gmail.com'
      }
    },
    {
      name: 'Sayali More',
      role: 'Web Developer',
      bio: 'Designs the website, manages website architecture, integrates video processing, and ensures overall site functionality.',
      image: '/Madam.png',
      social: {
        linkedin: 'https://www.linkedin.com/in/your-linkedin',
        github: 'https://github.com/your-github',
        email: 'mailto:your-email@example.com'
      }
    },
    {
      name: 'Priya Marmat',
      role: 'UI/UX Developer',
      bio: 'Designs interactive and user-friendly interfaces and assists in testing the project to ensure usability and quality.',
      image: '/Priyaaaa.png',
      social: {
        linkedin: 'https://www.linkedin.com/in/your-linkedin',
        github: 'https://github.com/your-github',
        email: 'mailto:your-email@example.com'
      }
    },


  ];

  const milestones = [
    {
      year: 'Jan',
      title: 'Project Kickoff',
      description: 'Began our journey to explore deepfake detection and understand AI-based video analysis.',
      icon: <Target className="w-6 h-6" />
    },
    {
      year: 'Mar',
      title: 'Dataset & Model Development',
      description: 'Collected video datasets and developed initial CNN models for deepfake detection.',
      icon: <Database className="w-6 h-6" />
    },
    {
      year: 'May',
      title: 'Web Platform Prototype',
      description: 'Built the first prototype of the web platform integrating the detection model.',
      icon: <Eye className="w-6 h-6" />
    },
    {
      year: 'Jul',
      title: 'Model Optimization',
      description: 'Enhanced model accuracy with CNN-LSTM hybrid architecture and advanced preprocessing techniques.',
      icon: <Brain className="w-6 h-6" />
    },
    {
      year: 'Oct',
      title: 'Platform Launch',
      description: 'Released the functional deepfake detection platform with improved detection accuracy and user-friendly interface.',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const technologies = [
    {
      name: 'CNN + LSTM',
      description: 'Hybrid neural network architecture for spatial and temporal analysis',
      icon: <Brain className="w-8 h-8" />
    },
    {
      name: 'OpenCV',
      description: 'Computer vision library for image and video processing',
      icon: <Eye className="w-8 h-8" />
    },
    {
      name: 'TensorFlow',
      description: 'Machine learning framework for model training and inference',
      icon: <Cpu className="w-8 h-8" />
    },
    {
      name: 'Cloud Infrastructure',
      description: 'Scalable cloud platform for real-time processing',
      icon: <Database className="w-8 h-8" />
    }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Privacy First',
      description: 'We never store your files permanently. All uploads are automatically deleted after analysis.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Accuracy',
      description: 'Our models are continuously trained and updated to maintain the highest detection accuracy.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Transparency',
      description: 'We believe in explainable AI and provide detailed analysis reports for every detection.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Accessibility',
      description: 'Making advanced AI technology accessible to everyone, regardless of technical expertise.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              Fighting Misinformation with{' '}
              <span className="text-gradient">AI Technology</span>
            </h1>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-3xl mx-auto">
              We're on a mission to combat deepfakes and promote media transparency
              through cutting-edge artificial intelligence and computer vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" icon={<Shield className="w-5 h-5" />}>
                Try Our Platform
              </Button>
              <Button variant="outline" size="lg" icon={<Users className="w-5 h-5" />}>
                Meet the Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-6">
                In an era where AI-generated content is becoming increasingly sophisticated,
                we believe that technology should be used to protect truth and authenticity
                rather than undermine it.
              </p>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
                Our platform empowers individuals, journalists, and organizations to
                verify media authenticity and combat the spread of misinformation
                through advanced deepfake detection technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-secondary-700 dark:text-secondary-300">
                    Real-time detection with 94% accuracy
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-secondary-700 dark:text-secondary-300">
                    Privacy-first approach with automatic file deletion
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-secondary-700 dark:text-secondary-300">
                    Transparent AI with explainable results
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Card className="p-8">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                    How It Works
                  </h3>
                  <div className="space-y-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary-600 dark:text-primary-400">1</span>
                      </div>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        Upload your image or video to our secure platform
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary-600 dark:text-primary-400">2</span>
                      </div>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        Our AI analyzes facial features, lighting, and temporal patterns
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary-600 dark:text-primary-400">3</span>
                      </div>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        Get detailed results with confidence scores and explanations
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-secondary-50 dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              Built with Cutting-Edge Technology
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              Our platform combines state-of-the-art machine learning models with
              robust infrastructure to deliver accurate, fast, and reliable results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <div className="text-primary-600 dark:text-primary-400">
                      {tech.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
                    {tech.name}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                    {tech.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              These principles guide everything we do, from product development
              to user experience and AI ethics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center">
                    <div className="text-accent-600 dark:text-accent-400">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary-50 dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              A diverse group of AI researchers, engineers, and product experts
              working together to make the internet a more trustworthy place.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-full sm:w-80 lg:w-72"
              >
                <Card hover className="text-center h-full">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center" style={{ display: 'none' }}>
                      <span className="text-2xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-3">
                    {member.social?.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 transition"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.social?.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 transition"
                        aria-label={`${member.name} GitHub`}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {member.social?.email && (
                      <a
                        href={member.social.email}
                        className="p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-2 00 dark:hover:bg-primary-800 transition"
                        aria-label={`${member.name} Email`}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white dark:bg-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              From a research project to a global platform, here are the key milestones
              in our mission to combat deepfakes.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 dark:bg-primary-800"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="inline-block">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                          <div className="text-primary-600 dark:text-primary-400">
                            {milestone.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                            {milestone.title}
                          </h3>
                          <p className="text-sm text-secondary-600 dark:text-secondary-400">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                    {milestone.year}
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
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
              Join the Fight Against Deepfakes
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Be part of the solution. Use our platform to verify media authenticity
              and help create a more trustworthy digital world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                icon={<Shield className="w-5 h-5" />}
              >
                Start Detecting
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                icon={<Users className="w-5 h-5" />}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
