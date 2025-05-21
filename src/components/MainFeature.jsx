import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import { format } from 'date-fns';

// Icons
const PlusIcon = getIcon('plus');
const MessageSquareIcon = getIcon('message-square');
const EditIcon = getIcon('edit-2');
const XIcon = getIcon('x');
const ThumbsUpIcon = getIcon('thumbs-up');
const ThumbsDownIcon = getIcon('thumbs-down');
const AlertCircleIcon = getIcon('alert-circle');
const CheckIcon = getIcon('check-circle');
const ClockIcon = getIcon('clock');
const ArrowUpCircleIcon = getIcon('arrow-up-circle');
const InboxIcon = getIcon('inbox');
const FilterIcon = getIcon('filter');
const RefreshCwIcon = getIcon('refresh-cw');

function MainFeature({ feedbacks, onAddFeedback, onUpdateStatus, onEditFeedback }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentEditFeedback, setCurrentEditFeedback] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    clientName: '',
    content: '',
    source: 'Email',
    category: 'General',
    sentiment: 'neutral',
    priority: 'medium',
    status: 'new'
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.clientName.trim() || !formData.content.trim()) {
      toast.error("Client name and feedback content are required!");
      return;
    }
    
    onAddFeedback(formData);
    
    // Reset form
    setFormData({
      clientName: '',
      content: '',
      source: 'Email',
      category: 'General',
      sentiment: 'neutral',
      priority: 'medium',
      status: 'new'
    });
    
    setShowAddForm(false);
  };

  const handleEditClick = (feedback) => {
    setCurrentEditFeedback(feedback);
    setFormData({
      clientName: feedback.clientName,
      content: feedback.content,
      source: feedback.source,
      category: feedback.category,
      sentiment: feedback.sentiment,
      priority: feedback.priority,
      status: feedback.status
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.clientName.trim() || !formData.content.trim()) {
      toast.error("Client name and feedback content are required!");
      return;
    }
    
    onEditFeedback(currentEditFeedback.id, formData);
    
    // Close modal
    setCurrentEditFeedback(null);
  };
  
  // Filter feedbacks by status and search term
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesStatus = selectedStatus === 'all' || feedback.status === selectedStatus;
    const matchesSearch = 
      feedback.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-surface-800 shadow-card border border-surface-200 dark:border-surface-700">
      {/* Header */}
      <div className="bg-surface-100 dark:bg-surface-700 p-4 border-b border-surface-200 dark:border-surface-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <InboxIcon className="w-5 h-5 text-primary-dark dark:text-primary-light" />
          <h2 className="text-xl font-semibold">Feedback Inbox</h2>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Add Feedback
        </motion.button>
      </div>
      
      {/* Filters */}
      <div className="p-4 border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-full md:w-auto flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pr-10 w-full"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-1 text-surface-600 dark:text-surface-400">
              <FilterIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Status:</span>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field py-1.5 pl-3 pr-8"
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            
            <button 
              onClick={() => {
                setSelectedStatus('all');
                setSearchTerm('');
              }}
              className="p-1.5 rounded-md hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-500 dark:text-surface-400"
              title="Reset filters"
            >
              <RefreshCwIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Feedback List */}
      <div className="divide-y divide-surface-200 dark:divide-surface-700 max-h-[500px] overflow-y-auto scrollbar-hide">
        <AnimatePresence>
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((feedback) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors duration-150"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{feedback.clientName}</h3>
                      <span className="text-sm text-surface-500 dark:text-surface-400">
                        via {feedback.source}
                      </span>
                    </div>
                    
                    <p className="text-surface-700 dark:text-surface-300 mb-3">
                      {feedback.content}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <div className="badge-primary">
                        {feedback.category}
                      </div>
                      
                      <SentimentBadge sentiment={feedback.sentiment} />
                      
                      <PriorityBadge priority={feedback.priority} />
                      
                      <span className="text-surface-500 dark:text-surface-400 flex items-center gap-1">
                        <ClockIcon className="w-3.5 h-3.5" />
                        {format(new Date(feedback.createdAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col items-center md:items-end gap-2">
                    <StatusBadge status={feedback.status} />

                    <div className="flex items-center gap-1 mt-2">
                      <button
                        onClick={() => handleEditClick(feedback)}
                        className="inline-flex items-center gap-1 text-xs font-medium py-1 px-2 rounded-md 
                                 bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600
                                 text-surface-700 dark:text-surface-300 transition-colors duration-150"
                        title="Edit feedback"
                      >
                        <EditIcon className="w-4 h-4" />
                        <span className="hidden md:inline">Edit</span>
                      </button>
                      
                      <StatusActionButton
                        currentStatus={feedback.status}
                        targetStatus="in-progress"
                        onClick={() => onUpdateStatus(feedback.id, "in-progress")}
                      />
                      
                      <StatusActionButton 
                        currentStatus={feedback.status}
                        targetStatus="resolved"
                        onClick={() => onUpdateStatus(feedback.id, "resolved")}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <div className="flex justify-center mb-3">
                <MessageSquareIcon className="w-10 h-10 text-surface-400 dark:text-surface-600" />
              </div>
              <h3 className="text-lg font-medium text-surface-700 dark:text-surface-300 mb-1">
                No feedback found
              </h3>
              <p className="text-surface-500 dark:text-surface-400">
                {searchTerm || selectedStatus !== 'all' 
                  ? "Try adjusting your filters" 
                  : "Add your first feedback to get started"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Add Feedback Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Add New Feedback</h3>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Enter client or company name"
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Feedback Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Enter feedback details..."
                    className="input-field min-h-[100px]"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Source
                    </label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="Email">Email</option>
                      <option value="Support Ticket">Support Ticket</option>
                      <option value="Feedback Form">Feedback Form</option>
                      <option value="Phone Call">Phone Call</option>
                      <option value="Social Media">Social Media</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="General">General</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="Bug">Bug</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Performance">Performance</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Sentiment
                    </label>
                    <select
                      name="sentiment"
                      value={formData.sentiment}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="positive">Positive</option>
                      <option value="neutral">Neutral</option>
                      <option value="negative">Negative</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end gap-3 border-t border-surface-200 dark:border-surface-700">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Add Feedback
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Feedback Modal */}
      <AnimatePresence>
        {currentEditFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={() => setCurrentEditFeedback(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Edit Feedback</h3>
                <button 
                  onClick={() => setCurrentEditFeedback(null)}
                  className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Enter client or company name"
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Feedback Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Enter feedback details..."
                    className="input-field min-h-[100px]"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Source
                    </label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="Email">Email</option>
                      <option value="Support Ticket">Support Ticket</option>
                      <option value="Feedback Form">Feedback Form</option>
                      <option value="Phone Call">Phone Call</option>
                      <option value="Social Media">Social Media</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="General">General</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="Bug">Bug</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Performance">Performance</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Sentiment
                    </label>
                    <select
                      name="sentiment"
                      value={formData.sentiment}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="positive">Positive</option>
                      <option value="neutral">Neutral</option>
                      <option value="negative">Negative</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end gap-3 border-t border-surface-200 dark:border-surface-700">
                  <button
                    type="button"
                    onClick={() => setCurrentEditFeedback(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Update Feedback
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sentiment Badge Component
function SentimentBadge({ sentiment }) {
  let badgeClass = '';
  let icon = null;
  
  switch (sentiment) {
    case 'positive':
      badgeClass = 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300';
      icon = <ThumbsUpIcon className="w-3.5 h-3.5" />;
      break;
    case 'negative':
      badgeClass = 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300';
      icon = <ThumbsDownIcon className="w-3.5 h-3.5" />;
      break;
    default:
      badgeClass = 'bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-300';
      icon = null;
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
    </span>
  );
}

// Priority Badge Component
function PriorityBadge({ priority }) {
  let badgeClass = '';
  
  switch (priority) {
    case 'urgent':
      badgeClass = 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300';
      break;
    case 'high':
      badgeClass = 'bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300';
      break;
    case 'medium':
      badgeClass = 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300';
      break;
    case 'low':
      badgeClass = 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300';
      break;
    default:
      badgeClass = 'bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-300';
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}

// Status Badge Component
function StatusBadge({ status }) {
  let badgeClass = '';
  let icon = null;
  
  switch (status) {
    case 'new':
      badgeClass = 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300';
      icon = <AlertCircleIcon className="w-3.5 h-3.5" />;
      break;
    case 'in-progress':
      badgeClass = 'bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300';
      icon = <ClockIcon className="w-3.5 h-3.5" />;
      break;
    case 'resolved':
      badgeClass = 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300';
      icon = <CheckIcon className="w-3.5 h-3.5" />;
      break;
    default:
      badgeClass = 'bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-300';
  }
  
  // Format the status text
  const statusText = status.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {statusText}
    </span>
  );
}

// Status Action Button Component
function StatusActionButton({ currentStatus, targetStatus, onClick }) {
  // Don't show buttons for actions that don't make sense
  // e.g., don't show "Mark as In Progress" if already in progress
  if (currentStatus === targetStatus) return null;
  
  // Don't show "Mark as In Progress" if already resolved
  if (currentStatus === 'resolved' && targetStatus === 'in-progress') return null;
  
  let buttonText = '';
  let icon = null;
  
  switch (targetStatus) {
    case 'in-progress':
      buttonText = 'In Progress';
      icon = <ClockIcon className="w-4 h-4" />;
      break;
    case 'resolved':
      buttonText = 'Resolved';
      icon = <CheckIcon className="w-4 h-4" />;
      break;
    default:
      return null;
  }
  
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-medium py-1 px-2 rounded-md 
               bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600
               text-surface-700 dark:text-surface-300 transition-colors duration-150"
      title={`Mark as ${buttonText}`}
    >
      {icon}
      <span className="hidden md:inline">{buttonText}</span>
    </button>
  );
}

export default MainFeature;