// src/components/home/QuoteDisplay.jsx
import React from 'react';
import './QuoteDisplay.css';

const QuoteDisplay = ({ quote, loading }) => {
  return (
    <section className="quote-section">
      <div className="quote-container">
        {loading ? (
          <div className="loading">명언을 불러오는 중...</div>
        ) : quote ? (
          <>
            <div className="quote-content">
              <p>"{quote.content}"</p>
            </div>
            {quote.author && (
              <div className="quote-author">
                <p>- {quote.author}</p>
              </div>
            )}
          </>
        ) : (
          <div className="quote-error">명언을 불러올 수 없습니다.</div>
        )}
      </div>
    </section>
  );
};

export default QuoteDisplay;