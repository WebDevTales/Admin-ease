import React from "react";
import "../../styles/FAQS/FAQS.css";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on 'Forgot Password' on the login page. Follow the instructions in the email sent to your registered email address to set a new password securely.",
    },
    {
      question: "Can I change my email address?",
      answer: "Yes, you can update your email address under 'Account Settings'. Please ensure your new email is verified to continue receiving important notifications.",
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team via the 'Help' section on our website or email us at support@example.com. Our team is available 24/7 to assist you.",
    },
    {
      question: "Is my personal data secure?",
      answer: "Yes, we use advanced encryption technologies to protect your data. We never share your personal details with third parties without your consent.",
    },
    {
      question: "Will my product be delivered safely?",
      answer: "Absolutely! We ensure secure packaging and work with trusted courier services to guarantee that your order reaches you in perfect condition.",
    },
    {
      question: "How will my product be delivered?",
      answer: "Your product will be delivered via our partnered courier services such as FedEx, UPS, or DHL, depending on your location. You will receive a tracking link once your order is shipped.",
    },
    {
      question: "What should I do if my order is delayed?",
      answer: "If your order is delayed, please check your tracking link for updates. If there is no update for 48 hours, contact our support team, and we will resolve the issue promptly.",
    },
    {
      question: "What happens if I receive a damaged product?",
      answer: "If your product arrives damaged, please contact our support team immediately with photos of the damage. We will arrange a replacement or refund as per our return policy.",
    },
    {
      question: "Can I cancel my order after placing it?",
      answer: "Yes, you can cancel your order within 24 hours of placing it. After that, it may be too late as the shipping process begins. Please contact support for further assistance.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit/debit cards, PayPal, Apple Pay, Google Pay, and various other secure payment methods. You can find the full list on our checkout page.",
    },
    {
      question: "Is it safe to make online payments on your website?",
      answer: "Yes! Our payment gateway uses SSL encryption to ensure that your transactions are safe and secure. We do not store your payment details.",
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order is shipped, you will receive a tracking number via email and SMS. You can use this to track your order in real time.",
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy. If you're unsatisfied with your purchase, you can request a return or exchange within 30 days of receiving your order.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer worldwide shipping. International delivery times and shipping costs vary depending on the destination. You can check estimated delivery times during checkout.",
    },
    {
      question: "How can I get a discount on my purchase?",
      answer: "We frequently offer discounts and special promotions. Subscribe to our newsletter to stay updated on exclusive offers and promo codes.",
    },
  ];

  return (
    <div className="faq-container">
      <h2>❓ Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question">
              <h3>{faq.question}</h3>
            </div>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

