// src/components/home/FeatureSection.jsx
import React from 'react';
import './FeatureSection.css';

const FeatureSection = () => {
  const features = [
    {
      id: 1,
      title: '공부 관리',
      description: '공부 시간을 기록하고 목표를 달성해보세요. 체계적인 공부 관리로 효율적인 학습을 돕습니다.',
      icon: '📚',
    },
    {
      id: 2,
      title: '운동 기록',
      description: '다양한 운동을 기록하고 인증하세요. 꾸준한 운동 습관을 만들어 건강한 생활을 유지하세요.',
      icon: '💪',
    },
    {
      id: 3,
      title: '식단 관리',
      description: 'AI가 추천하는 건강한 식단으로 영양 균형을 맞추세요. 식단 기록으로 건강한 식습관을 형성하세요.',
      icon: '🥗',
    },
    {
      id: 4,
      title: '커뮤니티',
      description: '비슷한 목표를 가진 사람들과 소통하고 동기 부여를 받으세요. 함께 성장하는 즐거움을 경험하세요.',
      icon: '👥',
    },
  ];

  return (
    <div className="feature-section">
      <div className="section-header">
        <h2>마인드<span>SET</span>의 주요 기능</h2>
        <p>자기 개발을 위한 다양한 기능들을 한 곳에서 경험하세요</p>
      </div>
      <div className="features-container">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;