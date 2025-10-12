import React, { useState } from 'react';
import { X, Send, Check, AlertCircle } from 'lucide-react';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    interest: 'AI Hosting'
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch("https://formcarry.com/s/YKAkGhPA2IG", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.code === 200) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            company: '',
            message: '',
            interest: 'AI Hosting'
          });
        }, 3000);
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 14, 26, 0.9)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={onClose}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes successPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}
      </style>

      <div 
        style={{
          background: 'linear-gradient(135deg, #1a2332, #0a0e1a)',
          border: '1px solid rgba(0, 255, 157, 0.2)',
          borderRadius: '24px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          animation: 'slideUp 0.4s ease-out',
          boxShadow: '0 20px 60px rgba(0, 255, 157, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(26, 35, 50, 0.8)',
            border: '1px solid rgba(0, 255, 157, 0.2)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s',
            color: '#e8eaf0',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 255, 157, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.5)';
            e.currentTarget.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(26, 35, 50, 0.8)';
            e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.2)';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          <X size={20} />
        </button>

        <div style={{ padding: '48px 32px' }}>
          {/* Success State */}
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 24px',
                background: 'linear-gradient(135deg, #00ff9d, #00b8ff)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'successPulse 1s ease-in-out infinite'
              }}>
                <Check size={40} style={{ color: '#0a0e1a' }} />
              </div>
              <h3 style={{
                fontSize: '28px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#e8eaf0'
              }}>
                Message Sent!
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#9ca3af',
                lineHeight: 1.6
              }}>
                Thank you for your interest. Our team will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  background: 'rgba(0, 255, 157, 0.1)',
                  border: '1px solid rgba(0, 255, 157, 0.2)',
                  borderRadius: '24px',
                  fontSize: '12px',
                  marginBottom: '16px',
                  color: '#00ff9d',
                  fontWeight: 600
                }}>
                  GET IN TOUCH
                </div>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: '#e8eaf0'
                }}>
                  Let's Build Together
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#9ca3af',
                  lineHeight: 1.6
                }}>
                  Tell us about your AI infrastructure needs and we'll create a custom solution for you.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#fca5a5'
                }}>
                  <AlertCircle size={20} />
                  <span style={{ fontSize: '14px' }}>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Name */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '8px',
                      color: '#e8eaf0'
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(26, 35, 50, 0.5)',
                        border: '1px solid rgba(0, 255, 157, 0.2)',
                        borderRadius: '8px',
                        color: '#e8eaf0',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.5)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 255, 157, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.2)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '8px',
                      color: '#e8eaf0'
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(26, 35, 50, 0.5)',
                        border: '1px solid rgba(0, 255, 157, 0.2)',
                        borderRadius: '8px',
                        color: '#e8eaf0',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.5)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 255, 157, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.2)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '8px',
                      color: '#e8eaf0'
                    }}>
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(26, 35, 50, 0.5)',
                        border: '1px solid rgba(0, 255, 157, 0.2)',
                        borderRadius: '8px',
                        color: '#e8eaf0',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.5)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 255, 157, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.2)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Interest Dropdown */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '8px',
                      color: '#e8eaf0'
                    }}>
                      I'm interested in
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(26, 35, 50, 0.5)',
                        border: '1px solid rgba(0, 255, 157, 0.2)',
                        borderRadius: '8px',
                        color: '#e8eaf0',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s',
                        cursor: 'pointer',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.5)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 255, 157, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.2)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <option value="AI Hosting">AI Hosting</option>
                      <option value="GPU Infrastructure">GPU Infrastructure</option>
                      <option value="White Glove Support">White Glove Support</option>
                      <option value="Custom Solutions">Custom Solutions</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '8px',
                      color: '#e8eaf0'
                    }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(26, 35, 50, 0.5)',
                        border: '1px solid rgba(0, 255, 157, 0.2)',
                        borderRadius: '8px',
                        color: '#e8eaf0',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.5)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 255, 157, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 255, 157, 0.2)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '14px 32px',
                      background: isSubmitting 
                        ? 'rgba(0, 255, 157, 0.3)' 
                        : 'linear-gradient(135deg, #00ff9d, #00b8ff)',
                      color: '#0a0e1a',
                      fontWeight: 600,
                      borderRadius: '8px',
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.3s',
                      marginTop: '8px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 255, 157, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid #0a0e1a',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 0.6s linear infinite'
                        }}></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <style>
                {`
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                `}
              </style>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;