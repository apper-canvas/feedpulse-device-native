import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Icons
const MessageSquareIcon = getIcon('message-square');
const BarChart2Icon = getIcon('bar-chart-2');
const UsersIcon = getIcon('users');
const CheckIcon = getIcon('check-circle');

// Example feedback data for initial demo
const initialFeedbacks = [
  {
    id: 1,
    clientName: "Acme Corp",
    content: "The new dashboard design is much more intuitive. Great improvement!",
    source: "Email",
    category: "UI/UX",
    sentiment: "positive",
    priority: "medium",
    status: "new",
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: 2,
    clientName: "TechStart Inc",
    content: "We're experiencing bugs in the export feature. Nothing is downloading when clicked.",
    source: "Support Ticket",
    category: "Bug",
    sentiment: "negative",
    priority: "high",
    status: "in-progress",
    createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    id: 3,
    clientName: "Global Services LLC",
    content: "Would love to see a calendar integration in the next update.",
    source: "Feedback Form",
    category: "Feature Request",
    sentiment: "neutral",
    priority: "low",
    status: "new",
    createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
  }
];

function Home() {
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('feedbacks');
    return saved ? JSON.parse(saved) : initialFeedbacks;
  });
  
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    inProgress: 0,
    resolved: 0
  });
  
  useEffect(() => {
    // Save feedbacks to localStorage when they change
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    
    // Update stats
    setStats({
      total: feedbacks.length,
      new: feedbacks.filter(f => f.status === 'new').length,
      inProgress: feedbacks.filter(f => f.status === 'in-progress').length,
      resolved: feedbacks.filter(f => f.status === 'resolved').length
    });
  }, [feedbacks]);
  
  const addFeedback = (newFeedback) => {
    const feedbackWithId = {
      ...newFeedback,
      id: feedbacks.length > 0 ? Math.max(...feedbacks.map(f => f.id)) + 1 : 1,
      createdAt: new Date().toISOString()
    };
    
    setFeedbacks([feedbackWithId, ...feedbacks]);
    toast.success("New feedback added successfully!");
  };
  
  const updateFeedbackStatus = (id, newStatus) => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === id ? { ...feedback, status: newStatus } : feedback
    ));
    toast.info(`Feedback status updated to ${newStatus}`);
  };
  
  const editFeedback = (id, updatedFeedback) => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === id ? { ...feedback, ...updatedFeedback } : feedback
    ));
    toast.success("Feedback updated successfully!");
  };
  
  
  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      {/* Header */}
      <header className="mb-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 md:mb-0"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-dark to-primary-light dark:from-primary-light dark:to-secondary-light bg-clip-text text-transparent">
                FeedPulse
              </h1>
              <p className="text-lg text-surface-600 dark:text-surface-400 mt-2">
                Manage client feedback effectively
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard 
                  title="Total" 
                  value={stats.total} 
                  icon={<MessageSquareIcon className="w-5 h-5 text-primary-dark dark:text-primary-light" />}
                />
                <StatCard 
                  title="New" 
                  value={stats.new} 
                  icon={<BarChart2Icon className="w-5 h-5 text-blue-500" />}
                />
                <StatCard 
                  title="In Progress" 
                  value={stats.inProgress} 
                  icon={<UsersIcon className="w-5 h-5 text-amber-500" />}
                />
                <StatCard 
                  title="Resolved" 
                  value={stats.resolved} 
                  icon={<CheckIcon className="w-5 h-5 text-green-500" />}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feature: Feedback Management */}
          <div className="lg:col-span-2">
            <MainFeature 
              feedbacks={feedbacks} 
              onAddFeedback={addFeedback}
              onUpdateStatus={updateFeedbackStatus}
              onEditFeedback={editFeedback}
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Quick Tips</h3>
              <ul className="space-y-3 text-surface-700 dark:text-surface-300">
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Categorize feedback to identify common themes</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Respond to high priority items within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Regularly review sentiment trends for product improvements</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-5 h-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Update feedback status as you work through resolution</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-700">
                <h4 className="text-lg font-medium mb-3">Getting Started</h4>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  Add new feedback using the form, then track its status until resolved.
                </p>
                <img 
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Feedback management illustration" 
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-surface-200 dark:border-surface-800">
        <div className="container mx-auto max-w-6xl text-center text-surface-500 dark:text-surface-400 text-sm">
          &copy; {new Date().getFullYear()} FeedPulse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon }) {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-surface-800 shadow-card border border-surface-200 dark:border-surface-700">
      <div className="flex items-center justify-between">
        <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">{title}</p>
        {icon}
      </div>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}

export default Home;