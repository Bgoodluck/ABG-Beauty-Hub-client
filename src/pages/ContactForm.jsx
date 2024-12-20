import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Send 
} from 'lucide-react';
import Title from '../components/Title';

function ContactForm() {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Subject: '',
    Message: '',
    Date: '', 
  });

  // Google Sheets Script URL (you'll need to replace with your own)
  const googleSheetScriptURL = 'https://script.google.com/macros/s/AKfycbwKXSgez1Fi1521FEAXwe5GxexLAW5C-SEP2zykscCku8HhMGehmrGbCncMvwdrdRzF/exec';
  
  // Email Service Script URL (you'll need to set this up)
  const emailServiceURL = 'https://script.google.com/macros/s/AKfycbwKXSgez1Fi1521FEAXwe5GxexLAW5C-SEP2zykscCku8HhMGehmrGbCncMvwdrdRzF/exec';

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; 
    setFormData((prevData) => ({
      ...prevData,
      Date: today,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send to Google Sheets
      const sheetResponse = await fetch(googleSheetScriptURL, {
        method: 'POST',
        body: new URLSearchParams(formData),
      });

      // Send Email
      const emailResponse = await fetch(emailServiceURL, {
        method: 'POST',
        body: new URLSearchParams(formData),
      });

      if (sheetResponse.ok && emailResponse.ok) {
        setMessage('Message sent successfully');
        setFormData({
          Name: '',
          Email: '',
          Subject: '',
          Message: '',
          Date: new Date().toISOString().split('T')[0], 
        });
        setTimeout(() => setMessage(''), 5000);
      } else {
        setMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error!', error.message);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <section className="px-4 py-16 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
      <Title text1={'GET IN'} text2={'TOUCH'} />
        {/* Get In <span className="text-[#fd3da1]">Touch</span> */}
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info Column */}
        <div className="bg-gray-100 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">
          <Title text1={'Reach out'} text2={'to us!'} /> 
          </h3>
          <p className="text-gray-600 mb-6">
            Feel free to get in touch with us. We are always open to to provide you with our services.
          </p>

          {/* Contact Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-4">
              <Mail className="text-[#fd3da1] text-3xl" />
              <div>
                <span className="text-sm text-gray-500">Mail us</span>
                <h4 className="font-medium">bisigoodluck@outlook.com</h4>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="text-[#fd3da1] text-3xl" />
              <div>
                <span className="text-sm text-gray-500">Call us</span>
                <h4 className="font-medium">+1-7436594624</h4>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {[
              { Icon: Facebook, href: "https://www.facebook.com" },
              { Icon: Twitter, href: "https://x.com/@bissysoulja" },
              { Icon: Linkedin, href: "https://www.linkedin.com" },
              { Icon: Instagram, href: "https://www.instagram.com" },
              { Icon: Youtube, href: "https://youtube.com" }
            ].map(({ Icon, href }, index) => (
              <a 
                key={index} 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#fd3da1] hover:text-white transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form Column */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fd3da1]"
              required
            />
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fd3da1]"
              required
            />
            <input
              type="text"
              name="Subject"
              value={formData.Subject}
              onChange={handleChange}
              placeholder="Your Subject"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fd3da1]"
            />
          </div>

          <textarea
            name="Message"
            value={formData.Message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-[#fd3da1]"
            required
          ></textarea>

          <button 
            type="submit" 
            className="w-full bg-[#fd3da1] text-white py-3 rounded-lg hover:bg-slate-400 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Send Message</span>
            <Send className="ml-2" size={20} />
          </button>

          {message && (
            <div className={`p-4 rounded-lg text-center ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactForm;