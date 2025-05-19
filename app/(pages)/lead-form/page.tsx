"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { submitLeadForm, resetStatus } from '@/app/store/leadSlice';
import type { RootState, AppDispatch } from '@/app/store/store';

const countries = ['USA', 'Canada', 'India'];

const visaCategories = ['O-1', 'EB-1A', 'EB-2 NIW', 'I don’t know'];

const PublicLeadForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.lead);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    linkedin: '',
    visaInterest: [] as string[],
    helpText: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (success) {
      alert('Form submitted successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        linkedin: '',
        visaInterest: [],
        helpText: '',
      });
      dispatch(resetStatus());
    }
  }, [success, dispatch]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.country) newErrors.country = 'Country of citizenship is required';

    if (formData.linkedin && !/^https?:\/\/.+/.test(formData.linkedin)) {
      newErrors.linkedin = 'LinkedIn/Website URL is invalid';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const updatedVisaInterest = formData.visaInterest.slice();

      if (checkbox.checked) {
        updatedVisaInterest.push(checkbox.value);
      } else {
        const index = updatedVisaInterest.indexOf(checkbox.value);
        if (index > -1) updatedVisaInterest.splice(index, 1);
      }

      setFormData((prev) => ({ ...prev, visaInterest: updatedVisaInterest }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(submitLeadForm(formData));
  };

  return (
    <div className="assessment-container">
      <div className="hero">
        <div className="logo-container">
          <h1 className="logo">almă</h1>
        </div>
        <h2 className="headline">
          Get An Assessment <br /> <span>Of Your Immigration Case</span>
        </h2>
      </div>

      <div className="form-section">
        <div className="form-header">
          <Image
            src="/assets/info.png"
            alt="doc emoji"
            className="emoji"
            width={60}
            height={60}
          />
          <h3>Want to understand your visa options?</h3>
          <p className="description">
            Submit the form below and our team of experienced attorneys will
            review your information and send a preliminary assessment of your
            case based on your goals.
          </p>
        </div>

        <form className="form-body" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            aria-invalid={!!errors.firstName}
            aria-describedby="firstName-error"
          />
          {errors.firstName && <p className="error" id="firstName-error">{errors.firstName}</p>}

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            aria-invalid={!!errors.lastName}
            aria-describedby="lastName-error"
          />
          {errors.lastName && <p className="error" id="lastName-error">{errors.lastName}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {errors.email && <p className="error" id="email-error">{errors.email}</p>}

          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            aria-invalid={!!errors.country}
            aria-describedby="country-error"
          >
            <option value="">Country of Citizenship</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && <p className="error" id="country-error">{errors.country}</p>}

          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn / Personal Website URL"
            value={formData.linkedin}
            onChange={handleInputChange}
            aria-invalid={!!errors.linkedin}
            aria-describedby="linkedin-error"
          />
          {errors.linkedin && <p className="error" id="linkedin-error">{errors.linkedin}</p>}

          <div className="visa-section">
            <div className="emoji-container">
              <Image
                src="/assets/dice.png"
                alt="doc emoji"
                className="emoji"
                width={60}
                height={60}
              />
            </div>
            <h3>Visa categories of interest?</h3>
            {visaCategories.map((visa) => (
              <label key={visa}>
                <input
                  type="checkbox"
                  name="visaInterest"
                  value={visa}
                  checked={formData.visaInterest.includes(visa)}
                  onChange={handleInputChange}
                />{' '}
                {visa}
              </label>
            ))}
          </div>

          <div className="help-section">
            <div className="emoji-container">
              <Image
                src="/assets/heart.png"
                alt="doc emoji"
                className="emoji"
                width={60}
                height={60}
              />
            </div>
            <h3>How can we help you?</h3>
            <textarea
              name="helpText"
              placeholder={`What is your current status and when does it expire?
What is your past immigration history?
Are you looking for long-term permanent residency or short-term employment visa or both?
Are there any timeline considerations?`}
              rows={6}
              value={formData.helpText}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {error && <p className="error"> Missing required fields</p>}
        </form>
      </div>
    </div>
  );
};

export default PublicLeadForm;
