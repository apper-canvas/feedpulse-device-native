import React from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

// Icons
const UploadIcon = getIcon('upload');
const DownloadIcon = getIcon('download');
const FileIcon = getIcon('file-text');
const MailIcon = getIcon('mail');
const CheckIcon = getIcon('check-circle');
const FileSpreadsheetIcon = getIcon('file-spreadsheet');
const FilePdfIcon = getIcon('file-text');
const LayersIcon = getIcon('layers');

function DataToolsSection() {
  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-6 lg:p-8"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Powerful Import & Export Tools
          </h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
            Seamlessly transfer data in and out of FeedPulse with our robust import and export tools. 
            Consolidate feedback from multiple sources and generate comprehensive reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Import Tools */}
          <div>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-primary-light/20 dark:bg-primary-dark/30 mr-3">
                <UploadIcon className="w-6 h-6 text-primary-dark dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-semibold">Import Tools</h3>
            </div>
            
            <p className="mb-4 text-surface-700 dark:text-surface-300">
              Bring all your feedback into one place by importing from various channels and formats.
            </p>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Supported Import Sources:</h4>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <FileSpreadsheetIcon className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>CSV/Excel files</strong> - Import structured feedback data in just a few clicks</span>
                </li>
                <li className="flex items-start">
                  <MailIcon className="w-5 h-5 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Email threads</strong> - Convert email conversations directly into feedback items</span>
                </li>
                <li className="flex items-start">
                  <FileIcon className="w-5 h-5 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span><strong>JSON/XML data</strong> - Transfer feedback from other systems with full metadata</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">How It Works:</h4>
              <ol className="list-decimal list-inside space-y-2 text-surface-700 dark:text-surface-300">
                <li>Click the "Import" button from the feedback dashboard</li>
                <li>Select your data source or file format</li>
                <li>Map fields to ensure data is imported correctly</li>
                <li>Review the data and confirm the import</li>
                <li>Your feedback items appear instantly in your dashboard</li>
              </ol>
            </div>
            
            <div className="rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700">
              <img 
                src="https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Import process demonstration" 
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
          
          {/* Export Tools */}
          <div>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-secondary-light/20 dark:bg-secondary-dark/30 mr-3">
                <DownloadIcon className="w-6 h-6 text-secondary-dark dark:text-secondary-light" />
              </div>
              <h3 className="text-xl font-semibold">Export Tools</h3>
            </div>
            
            <p className="mb-4 text-surface-700 dark:text-surface-300">
              Generate comprehensive reports and share feedback data with stakeholders in their preferred formats.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <ExportOption icon={<FileSpreadsheetIcon />} title="Spreadsheet" description="Export to Excel or CSV for data analysis and manipulation" color="green" />
              <ExportOption icon={<FilePdfIcon />} title="PDF Report" description="Professional reports with visualizations and key metrics" color="red" />
              <ExportOption icon={<LayersIcon />} title="Data Feeds" description="Automated data feeds for integration with other systems" color="purple" />
              <ExportOption icon={<FileIcon />} title="JSON/XML" description="Structured data for technical applications and integrations" color="blue" />
            </div>
            
            <div className="rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Export options and reporting" 
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ExportOption({ icon, title, description, color }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
    green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300",
    red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
  };
  
  return (
    <div className="p-4 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${colorClasses[color]}`}>
        {React.isValidElement(icon) ? React.cloneElement(icon, { className: "w-5 h-5" }) : icon}
      </div>
      <h5 className="font-medium mb-1">{title}</h5>
      <p className="text-sm text-surface-600 dark:text-surface-400">{description}</p>
    </div>
  );
}

export default DataToolsSection;