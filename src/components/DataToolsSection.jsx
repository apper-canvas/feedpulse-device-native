import React from 'react';
import { motion } from 'framer-motion'; 
import { toast } from 'react-toastify';
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
const XIcon = getIcon('x');

function DataToolsSection() {
  const [showImportModal, setShowImportModal] = React.useState(false);
  const [showExportModal, setShowExportModal] = React.useState(false);
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
              <ol className="list-decimal list-inside space-y-2 text-surface-700 dark:text-surface-300 mb-4">
                <li>Click the Import button below</li>
                <li>Select your data source or file format</li>
                <li>Map fields to ensure data is imported correctly</li>
                <li>Review the data and confirm the import</li>
                <li>Your feedback items appear instantly in your dashboard</li>
              </ol>
              
              <button
                onClick={() => setShowImportModal(true)}
                className="btn btn-primary flex items-center space-x-2 mb-4"
                aria-label="Import feedback data"
              >
                <UploadIcon className="w-4 h-4" />
                <span>Import Feedback</span>
              </button>
              
              <ol className="list-decimal list-inside space-y-2 text-surface-700 dark:text-surface-300">
                
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
              
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowExportModal(true)}
                  className="btn btn-primary flex items-center space-x-2"
                  aria-label="Export data to file"
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Import Modal */}
        {showExportModal && <ExportModal onClose={() => setShowExportModal(false)} />}
        
        {/* Export Modal */}
        {showImportModal && <ImportModal onClose={() => setShowImportModal(false)} />}
      </motion.div>
    </section> 
  );
}

function ImportModal({ onClose }) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [selectedSource, setSelectedSource] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [mappedFields, setMappedFields] = React.useState({
    clientName: '',
    content: '',
    source: '',
    category: '',
    sentiment: '',
    priority: '',
  });
  
  const handleFieldMapping = (feedbackField, sourceField) => {
    setMappedFields({
      ...mappedFields,
      [feedbackField]: sourceField
    });
  };
  
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleImport();
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleImport = () => {
    setIsLoading(true);
    
    // Simulate import process
    setTimeout(() => {
      setIsLoading(false);
      
      // Show toast notification
      toast.success(`Successfully imported feedback from ${fileName || selectedSource}`);
      onClose();
    }, 1500);
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  
  const importSources = [
    { id: 'csv', name: 'CSV File', icon: <FileSpreadsheetIcon className="w-5 h-5 text-green-500" /> },
    { id: 'email', name: 'Email Threads', icon: <MailIcon className="w-5 h-5 text-blue-500" /> },
    { id: 'json', name: 'JSON Data', icon: <FileIcon className="w-5 h-5 text-amber-500" /> },
  ];
  
  const availableFields = [
    { id: 'company', name: 'Company' },
    { id: 'customer', name: 'Customer Name' },
    { id: 'feedback', name: 'Feedback Text' },
    { id: 'channel', name: 'Channel' },
    { id: 'type', name: 'Feedback Type' },
    { id: 'rating', name: 'Sentiment Rating' },
    { id: 'urgency', name: 'Urgency' },
  ];
  
  // Step content based on current step
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Select Import Source</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {importSources.map(source => (
                <button
                  key={source.id}
                  onClick={() => setSelectedSource(source.id)}
                  className={`p-4 rounded-lg border relative flex flex-col items-center justify-center h-32
                    hover:border-primary hover:bg-surface-50 dark:hover:bg-surface-700/50 
                    hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/50 
                    cursor-pointer transition-all duration-200 transform hover:-translate-y-1 ${
                    selectedSource === source.id 
                      ? 'border-primary-light ring-2 ring-primary/20 bg-primary/5 dark:bg-primary/10 shadow-md' 
                      : 'border-surface-200 dark:border-surface-700'
                  }`}
                  aria-pressed={selectedSource === source.id}
                >
                  <div className="mb-3 transform transition-transform duration-200 group-hover:scale-110">{source.icon}</div>
                  <span className="font-medium text-center">{source.name}</span>
                  {selectedSource === source.id && (
                    <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 bg-primary rounded-full shadow-sm">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {selectedSource && (
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
                  Select your {selectedSource === 'email' ? 'email export file' : selectedSource.toUpperCase()} file:
                </label>
                <div className="flex items-center space-x-3">
                  <label className="btn btn-secondary cursor-pointer flex items-center space-x-2 hover:bg-surface-300 dark:hover:bg-surface-600 
                    focus-within:ring-2 focus-within:ring-primary/30 transition-all duration-200 px-4 py-2">
                    <span>Choose File</span>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                  {fileName ? (
                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-surface-100 dark:bg-surface-700 rounded-md">
                      <FileIcon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                        {fileName}
                      </span>
                      <button 
                        onClick={() => setFileName('')}
                        className="p-0.5 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600"
                        aria-label="Remove file" title="Remove file">
                        <XIcon className="w-3.5 h-3.5 text-surface-500" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-surface-500 dark:text-surface-400">No file selected</span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
        
      case 2:
        return (
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Map Fields</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Map the fields from your {selectedSource.toUpperCase()} file to FeedPulse fields:
            </p>
            
            <div className="space-y-4">
              {Object.keys(mappedFields).map(field => (
                <div key={field} className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <label className="sm:w-1/3 block text-sm font-medium mb-2 sm:mb-0 capitalize text-surface-700 dark:text-surface-300">
                    {field.replace(/([A-Z])/g, ' $1')}:
                  </label>
                  <select 
                    className="sm:w-2/3 input-field"
                    value={mappedFields[field]}
                    onChange={(e) => handleFieldMapping(field, e.target.value)}
                  >
                    <option value="">-- Select field --</option>
                    {availableFields.map(option => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Confirm Import</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              You're about to import feedback from: <span className="font-medium">{fileName || selectedSource}</span>
            </p>
            
            <div className="p-4 bg-surface-100 dark:bg-surface-700 rounded-lg mb-4">
              <h4 className="font-medium mb-2">Field Mapping Summary:</h4>
              <ul className="space-y-1 text-sm">
                {Object.entries(mappedFields).map(([feedbackField, sourceField]) => (
                  <li key={feedbackField} className="flex justify-between">
                    <span className="capitalize">{feedbackField.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-medium">
                      {sourceField ? availableFields.find(f => f.id === sourceField)?.name : '(Not mapped)'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg text-amber-800 dark:text-amber-300">
              <p>This will add new feedback items to your dashboard. This action cannot be undone.</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Modal header */}
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Import Feedback</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Modal body */}
        <div className="p-4">
          {/* Steps indicator */}
          <div className="flex items-center justify-center mb-6">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${currentStep === step ? 'bg-primary text-white' : currentStep > step ? 'bg-green-500 text-white' : 'bg-surface-200 dark:bg-surface-700'}`}>
                  {currentStep > step ? <CheckIcon className="w-5 h-5" /> : step}
                </div>
                {step < 3 && <div className={`w-10 h-1 ${currentStep > step ? 'bg-green-500' : 'bg-surface-300 dark:bg-surface-600'}`}></div>}
              </div>
            ))}
          </div>
          
          {renderStepContent()}
        </div>
        
        {/* Modal footer */}
        <div className="p-4 border-t border-surface-200 dark:border-surface-700 flex justify-between">
          <button onClick={currentStep === 1 ? onClose : handlePrevStep} className="btn btn-secondary">
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>
          <button 
            onClick={handleNextStep}
            disabled={isLoading || (currentStep === 1 && (!selectedSource || !fileName))}
            className={`btn ${isLoading || (currentStep === 1 && (!selectedSource || !fileName)) ? 'bg-primary/50 cursor-not-allowed' : 'btn-primary'}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : currentStep === 3 ? 'Import Data' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
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

function ExportModal({ onClose }) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [selectedFormat, setSelectedFormat] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [exportOptions, setExportOptions] = React.useState({
    dateRange: 'all',
    includeMetadata: true,
    filterBy: '',
    fileName: 'feedback-export'
  });
  
  const handleOptionChange = (key, value) => {
    setExportOptions({
      ...exportOptions,
      [key]: value
    });
  };
  
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleExport();
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleExport = () => {
    setIsLoading(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      
      // Show success notification
      toast.success(`Successfully exported data as ${selectedFormat.toUpperCase()}`);
      onClose();
    }, 1500);
  };
  
  const exportFormats = [
    { id: 'csv', name: 'CSV Spreadsheet', icon: <FileSpreadsheetIcon className="w-5 h-5 text-green-500" /> },
    { id: 'pdf', name: 'PDF Report', icon: <FilePdfIcon className="w-5 h-5 text-red-500" /> },
    { id: 'json', name: 'JSON Data', icon: <FileIcon className="w-5 h-5 text-amber-500" /> },
  ];
  
  // Render content based on current step
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Select Export Format</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {exportFormats.map(format => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`p-4 rounded-lg border relative flex flex-col items-center justify-center h-32
                    hover:border-primary hover:bg-surface-50 dark:hover:bg-surface-700/50 
                    hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/50 
                    cursor-pointer transition-all duration-200 transform hover:-translate-y-1 ${
                    selectedFormat === format.id 
                      ? 'border-primary-light ring-2 ring-primary/20 bg-primary/5 dark:bg-primary/10 shadow-md' 
                      : 'border-surface-200 dark:border-surface-700'
                  }`}
                  aria-pressed={selectedFormat === format.id}
                >
                  <div className="mb-3 transform transition-transform duration-200 group-hover:scale-110">{format.icon}</div>
                  <span className="font-medium text-center">{format.name}</span>
                  {selectedFormat === format.id && (
                    <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 bg-primary rounded-full shadow-sm">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Configure Export Options</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Customize your {selectedFormat.toUpperCase()} export:
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <label className="sm:w-1/3 block text-sm font-medium mb-2 sm:mb-0 text-surface-700 dark:text-surface-300">
                  Date Range:
                </label>
                <select 
                  className="sm:w-2/3 input-field"
                  value={exportOptions.dateRange}
                  onChange={(e) => handleOptionChange('dateRange', e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="year">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <label className="sm:w-1/3 block text-sm font-medium mb-2 sm:mb-0 text-surface-700 dark:text-surface-300">
                  Include Metadata:
                </label>
                <div className="sm:w-2/3 flex items-center">
                  <input 
                    type="checkbox" 
                    id="includeMetadata"
                    checked={exportOptions.includeMetadata}
                    onChange={(e) => handleOptionChange('includeMetadata', e.target.checked)}
                    className="h-4 w-4 rounded border-surface-300 text-primary focus:ring-primary/50"
                  />
                  <label htmlFor="includeMetadata" className="ml-2 text-sm text-surface-700 dark:text-surface-300">
                    Include timestamps, user info, and system metadata
                  </label>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <label className="sm:w-1/3 block text-sm font-medium mb-2 sm:mb-0 text-surface-700 dark:text-surface-300">
                  Filter By:
                </label>
                <input 
                  type="text"
                  className="sm:w-2/3 input-field"
                  placeholder="Enter keywords to filter"
                  value={exportOptions.filterBy}
                  onChange={(e) => handleOptionChange('filterBy', e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <label className="sm:w-1/3 block text-sm font-medium mb-2 sm:mb-0 text-surface-700 dark:text-surface-300">
                  File Name:
                </label>
                <input 
                  type="text"
                  className="sm:w-2/3 input-field"
                  value={exportOptions.fileName}
                  onChange={(e) => handleOptionChange('fileName', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Confirm Export</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              You're about to export your feedback data as: <span className="font-medium">{selectedFormat.toUpperCase()}</span>
            </p>
            
            <div className="p-4 bg-surface-100 dark:bg-surface-700 rounded-lg mb-4">
              <h4 className="font-medium mb-2">Export Configuration:</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between"><span>Format:</span> <span className="font-medium">{selectedFormat.toUpperCase()}</span></li>
                <li className="flex justify-between"><span>Date Range:</span> <span className="font-medium">{exportOptions.dateRange === 'all' ? 'All Time' : exportOptions.dateRange}</span></li>
                <li className="flex justify-between"><span>Include Metadata:</span> <span className="font-medium">{exportOptions.includeMetadata ? 'Yes' : 'No'}</span></li>
                {exportOptions.filterBy && <li className="flex justify-between"><span>Filter:</span> <span className="font-medium">"{exportOptions.filterBy}"</span></li>}
                <li className="flex justify-between"><span>File Name:</span> <span className="font-medium">{exportOptions.fileName}.{selectedFormat}</span></li>
                <li className="flex justify-between"><span>Estimated Records:</span> <span className="font-medium">142</span></li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg text-blue-800 dark:text-blue-300">
              <p>Your export will be prepared and downloaded to your device.</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Modal header */}
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Export Data</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Modal body */}
        <div className="p-4">
          {/* Steps indicator */}
          <div className="flex items-center justify-center mb-6">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${currentStep === step ? 'bg-primary text-white' : currentStep > step ? 'bg-green-500 text-white' : 'bg-surface-200 dark:bg-surface-700'}`}>
                  {currentStep > step ? <CheckIcon className="w-5 h-5" /> : step}
                </div>
                {step < 3 && <div className={`w-10 h-1 ${currentStep > step ? 'bg-green-500' : 'bg-surface-300 dark:bg-surface-600'}`}></div>}
              </div>
            ))}
          </div>
          
          {renderStepContent()}
        </div>
        
        {/* Modal footer */}
        <div className="p-4 border-t border-surface-200 dark:border-surface-700 flex justify-between">
          <button onClick={currentStep === 1 ? onClose : handlePrevStep} className="btn btn-secondary">
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>
          <button 
            onClick={handleNextStep}
            disabled={isLoading || (currentStep === 1 && !selectedFormat)}
            className={`btn ${isLoading || (currentStep === 1 && !selectedFormat) ? 'bg-primary/50 cursor-not-allowed' : 'btn-primary'}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : currentStep === 3 ? 'Export Data' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataToolsSection;