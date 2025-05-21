import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const AlertTriangleIcon = getIcon('alert-triangle');
const HomeIcon = getIcon('home');

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg mx-auto"
      >
        <div className="flex justify-center mb-6">
          <AlertTriangleIcon className="w-16 h-16 text-amber-500" />
        </div>
        
        <h1 className="text-4xl font-bold mb-3">Page Not Found</h1>
        
        <p className="text-surface-600 dark:text-surface-400 text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="btn-primary py-3 px-6 inline-flex items-center gap-2"
          >
            <HomeIcon className="w-5 h-5" /> 
            Return Home
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 text-surface-500 dark:text-surface-400 text-sm"
      >
        &copy; {new Date().getFullYear()} FeedPulse
      </motion.div>
    </div>
  );
}

export default NotFound;