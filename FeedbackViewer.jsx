import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth } from '../../firebase/firebaseConfig';
import { FaTrash, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import '../../styles/Profile/FeedbackViewer.css';

const FeedbackViewer = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        fetchUserFeedback(user.uid);
      } else {
        setCurrentUser(null);
        setFeedbackList([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserFeedback = async (userId) => {
    try {
      setLoading(true);
      const q = query(collection(db, 'feedback'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const feedbacks = [];
      querySnapshot.forEach((doc) => {
        feedbacks.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setFeedbackList(feedbacks);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      showToast('Failed to load feedback', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await deleteDoc(doc(db, 'feedback', feedbackId));
      setFeedbackList(prev => prev.filter(fb => fb.id !== feedbackId));
      showToast('Feedback deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting feedback:', error);
      showToast('Failed to delete feedback', 'error');
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  return (
    <div className="feedback-viewer-container">
      <div className="feedback-viewer-header">
        <h3>Your Feedback</h3>
        <span className="feedback-count">{feedbackList.length} items</span>
      </div>

      <div className="feedback-list">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : feedbackList.length === 0 ? (
          <div className="empty-state">No feedback submitted yet</div>
        ) : (
          feedbackList.map(feedback => (
            <div key={feedback.id} className="feedback-item">
              <div className="feedback-content">
                <p className="feedback-message">{feedback.message}</p>
                <div className="feedback-meta">
                  <span className="feedback-date">{formatDate(feedback.createdAt)}</span>
                  <span className={`feedback-status ${feedback.status}`}>
                    {feedback.status}
                  </span>
                </div>
              </div>
              <button 
                className="delete-btn"
                onClick={() => handleDeleteFeedback(feedback.id)}
                title="Delete feedback"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`feedback-toast ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'error' ? <FaExclamationCircle /> : <FaCheckCircle />}
          </div>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default FeedbackViewer;