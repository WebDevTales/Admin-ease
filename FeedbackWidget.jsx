import React, { useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { auth } from '../../firebase/firebaseConfig';
import { FaPaperPlane, FaTimes, FaInfoCircle, FaCheck } from 'react-icons/fa'; // Added FaCheck here
import '../../styles/Profile/FeedbackWidget.css';

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      showToast('Please enter your feedback', 'error');
      return;
    }

    setIsSubmitting(true);
    const user = auth.currentUser;

    try {
      // Get user details from Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      let userData = {};
      if (userSnap.exists()) {
        userData = userSnap.data();
      }

      // Add feedback to Firestore
      await addDoc(collection(db, 'feedback'), {
        message: feedback,
        userId: user.uid,
        userName: userData.name || user.displayName || 'Anonymous',
        userEmail: userData.email || user.email || 'No email provided',
        createdAt: new Date(),
        status: 'new'
      });

      setFeedback('');
      showToast('Feedback submitted successfully!');
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showToast('Failed to submit feedback', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-container">
      {/* Floating Button */}
      {!isOpen && (
        <button 
          className="feedback-toggle-btn"
          onClick={() => setIsOpen(true)}
        >
          <span>Feedback</span>
          <FaInfoCircle className="feedback-icon" />
        </button>
      )}

      {/* Widget Panel */}
      {isOpen && (
        <div className="feedback-widget">
          <div className="feedback-header">
            <h3>Send us your feedback</h3>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What's on your mind?"
                rows="4"
                disabled={isSubmitting}
              />
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting || !feedback.trim()}
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <FaPaperPlane className="send-icon" />
                  <span>Submit</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Custom Toast Notification */}
      {toast.show && (
        <div className={`custom-toast ${toast.type}`}>
          <div className="toast-content">
            {toast.type === 'error' ? (
              <FaTimes className="toast-icon error" />
            ) : (
              <FaCheck className="toast-icon success" />
            )}
            <span>{toast.message}</span>
          </div>
          <div className="toast-progress"></div>
        </div>
      )}
    </div>
  );
};

export default FeedbackWidget;