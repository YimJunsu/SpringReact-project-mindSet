// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import MainBanner from '../components/home/MainBanner';
import FeatureSection from '../components/home/FeatureSection';
import QuoteDisplay from '../components/home/QuoteDisplay';
import './Home.css';
import { fetchRandomQuote } from '../api/quoteApi';

const Home = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const data = await fetchRandomQuote();
        setQuote(data);
      } catch (error) {
        console.error('명언을 가져오는 데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    getQuote();
  }, []);

  return (
    <div className="home-page">
      <div className="content-wrapper">
        {/* 메인 배너 섹션 */}
        <section className="content-section">
          <MainBanner />
        </section>

        {/* 명언 섹션 */}
        <section className="content-section">
          <QuoteDisplay quote={quote} loading={loading} />
        </section>

        {/* 주요 기능 섹션 */}
        <section className="content-section">
          <FeatureSection />
        </section>
      </div>
    </div>
  );
};

export default Home;