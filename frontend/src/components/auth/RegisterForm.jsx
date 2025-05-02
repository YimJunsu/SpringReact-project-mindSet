// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode'; // 다음 주소 API
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    gender: '',
    phone: '',
    address: '',
    addressDetail: '',
    postCode: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // 입력 시 해당 필드의 오류 메시지 제거
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    // 이메일 검증
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다.';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    }

    // 비밀번호 확인 검증
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 닉네임 검증
    if (!formData.nickname.trim()) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    }

    // 성별 검증
    if (!formData.gender) {
      newErrors.gender = '성별을 선택해주세요.';
    }

    // 주소 검증
    if (!formData.address.trim()) {
      newErrors.address = '주소를 입력해주세요.';
    }

    // 상세 주소 검증
    if (!formData.addressDetail.trim()) {
      newErrors.addressDetail = '상세 주소를 입력해주세요.';
    }

    // 우편번호 검증
    if (!formData.postCode.trim()) {
      newErrors.postCode = '우편번호를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      // API 호출 로직 (추후 구현)
      console.log('회원가입 요청 데이터:', formData);

      // 성공 시 로그인 페이지로 이동
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (error) {
      setErrors({
        ...errors,
        form: '회원가입에 실패했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 주소 검색 모달 열기
  const handleAddressSearch = () => {
    setIsAddressModalOpen(true);
  };

  // 다음 주소 API 완료 핸들러
  const handleAddressComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setFormData({
      ...formData,
      postCode: data.zonecode,
      address: fullAddress,
    });

    setIsAddressModalOpen(false);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {errors.form && <div className="form-error">{errors.form}</div>}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">이메일 *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="password">비밀번호 *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인 *</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nickname">닉네임 *</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className={errors.nickname ? 'error' : ''}
          />
          {errors.nickname && <div className="error-message">{errors.nickname}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">성별 *</label>
          <div className="gender-radio-group">
            <div className="radio-item">
              <input
                type="radio"
                id="gender-male"
                name="gender"
                value="M"
                checked={formData.gender === 'M'}
                onChange={handleChange}
              />
              <label htmlFor="gender-male">남성</label>
            </div>
            <div className="radio-item">
              <input
                type="radio"
                id="gender-female"
                name="gender"
                value="F"
                checked={formData.gender === 'F'}
                onChange={handleChange}
              />
              <label htmlFor="gender-female">여성</label>
            </div>
          </div>
          {errors.gender && <div className="error-message">{errors.gender}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">전화번호</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="'-' 없이 입력하세요"
          />
        </div>
      </div>

      <div className="form-row address-row">
        <div className="form-group">
          <label htmlFor="postCode">우편번호 *</label>
          <div className="post-code-input">
            <input
              type="text"
              id="postCode"
              name="postCode"
              value={formData.postCode}
              onChange={handleChange}
              className={errors.postCode ? 'error' : ''}
              readOnly
            />
            <button type="button" onClick={handleAddressSearch} className="btn-address-search">
              주소 검색
            </button>
          </div>
          {errors.postCode && <div className="error-message">{errors.postCode}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="address">주소 *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
            readOnly
          />
          {errors.address && <div className="error-message">{errors.address}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="addressDetail">상세 주소 *</label>
          <input
            type="text"
            id="addressDetail"
            name="addressDetail"
            value={formData.addressDetail}
            onChange={handleChange}
            className={errors.addressDetail ? 'error' : ''}
          />
          {errors.addressDetail && <div className="error-message">{errors.addressDetail}</div>}
        </div>
      </div>

      <button type="submit" className="btn-submit" disabled={isLoading}>
        {isLoading ? '처리 중...' : '회원가입'}
      </button>

      {/* 주소 검색 모달 */}
      {isAddressModalOpen && (
        <div className="address-modal-overlay">
          <div className="address-modal">
            <div className="address-modal-header">
              <h3>주소 검색</h3>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsAddressModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <DaumPostcode
              onComplete={handleAddressComplete}
              style={{ width: '100%', height: 400 }}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;