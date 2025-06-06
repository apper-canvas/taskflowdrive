import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      <div className="text-center">
        <div className="mb-8">
          <ApperIcon name="Search" size={64} className="text-surface-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-surface-900 dark:text-surface-50 mb-2">
            Page Not Found
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mb-8">
            The page you're looking for doesn't exist.
          </p>
        </div>
        
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
        >
          <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
          Back to TaskFlow
        </Link>
      </div>
    </div>
  )
}

export default NotFound