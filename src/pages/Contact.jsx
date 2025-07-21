import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Please enter a message';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setTimeout(() => setSuccess(false), 6000);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-16 text-black flex flex-col items-center relative">
      <style>
        {`
          @keyframes slide-in {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide-in {
            animation: slide-in 0.4s ease-out;
          }
        `}
      </style>

      <div className="max-w-2xl w-full bg-white p-8 shadow-xl rounded-xl">
        <h2 className="text-4xl font-bold text-purple-700 mb-6 text-center">
          Get in Touch with Bambi Watch
        </h2>
        <p className="text-gray-700 text-center mb-8">
          We'd love to hear from you. Whether it's feedback, partnership, or general inquiries.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <textarea
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            ></textarea>
            {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-md font-semibold hover:bg-purple-800 transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-center">
          <h3 className="text-lg font-medium text-purple-700 mb-3">Follow Us</h3>
          <div className="flex justify-center gap-5 text-purple-600 text-2xl">
            <a href="https://facebook.com" className="hover:text-purple-800">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" className="hover:text-purple-800">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="hover:text-purple-800">
              <FaInstagram />
            </a>
            <a href="mailto:cyrusbarrow610@gmail.com" className="hover:text-purple-800">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Success Popup - now top right */}
      {success && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
          ✅ Message sent successfully!
        </div>
      )}
    </div>
  );
}

export default ContactPage;
