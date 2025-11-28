import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'How it Works', href: '/about' },
      { name: 'API Documentation', href: '/help' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Security', href: '/security' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },

      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    Resources: [
      { name: 'Help Center', href: '/help' },
      { name: 'Blog', href: '/blog' },
      { name: 'Research Papers', href: '/research' },
      { name: 'Community', href: '/community' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@deepfakedetect.com' },
  ];

  return (
    <footer className="bg-secondary-50 dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gradient">
                DeepfakeDetect
              </span>
            </Link>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6 max-w-md">
              AI-powered deepfake detection platform that helps combat misinformation
              and promotes media transparency through advanced neural networks.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-white dark:bg-secondary-800 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-500 dark:text-secondary-400 text-sm">
              © {currentYear} DeepfakeDetect. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-secondary-500 dark:text-secondary-400">
                Built with ❤️ for media authenticity
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-secondary-500 dark:text-secondary-400">
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
