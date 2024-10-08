import React from 'react';

// FeedbackModal.jsx
const FeedbackForm = ({ isOpen, onClose, onSubmit, feedback, setFeedback }) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Feedback Form</h2>
        <label htmlFor="rating">Rating:</label>
        <select
          name="rating"
          value={feedback.rating}
          onChange={handleInputChange}
          id="rating"
        >
          <option value="">Select Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label htmlFor="comments">Comments:</label>
        <textarea
          name="comments"
          value={feedback.comments}
          onChange={handleInputChange}
          id="comments"
        />
        <button onClick={onSubmit}>Submit Feedback</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default FeedbackForm;
