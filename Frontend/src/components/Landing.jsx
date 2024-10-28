import React, { useState, useRef, useEffect } from 'react';

const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Create refs for the sections
  const howItWorksRef = useRef(null);
  const feedbackRef = useRef(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const FAQs = [
    {
      Question: "What is an ATS?",
      Answer: "ATS (Applicant Tracking System) is software used by employers to filter job applications based on predefined criteria."
    },
    {
      Question: "How is ATS score calculated?",
      Answer: "An ATS scores a resume based on keyword matches, relevant experience, skills, education, and overall formatting. The score determines how well your resume aligns with the job description, influencing whether it reaches a human recruiter."
    },
    {
      Question: "Why is a job recommendation system important?",
      Answer: "The fundamental aim of the recommendation is to provide prediction of the different items in which a user would be interested in based on their preferences. Recommendation systems based on collaborative filtering techniques are able to provide approximately accurate prediction when there is enough data."
    },
  ];

  // Function to scroll to the How It Works section
  const scrollToHowItWorks = () => {
    howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    });

    if (howItWorksRef.current) {
      observer.observe(howItWorksRef.current);
    }

    return () => {
      if (howItWorksRef.current) {
        observer.unobserve(howItWorksRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-center py-20">
        <div className="absolute inset-0 bg-fixed bg-opacity-50 bg-hero-pattern"></div>
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 animate-fadeInUp opacity-0 delay-150 scale-110">
            ATS Checker & Job Recommendations
          </h1>
          <p className="text-lg sm:text-2xl mb-6 animate-fadeInUp opacity-0 delay-300">
            Optimize your resume to pass ATS systems and get tailored job recommendations based on your profile.
          </p>
          <button 
            onClick={scrollToHowItWorks} // Attach scroll function here
            className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 animate-fadeInUp opacity-0 delay-450"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* How It Works Section with Hover Effects and Slide Animation */}
      <section ref={howItWorksRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {FAQs.map((faq, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-150 hover:bg-purple-50 ${isVisible ? 'animate-slideInLeft' : 'opacity-0'} transition-opacity duration-700 delay-150`}>
                <div className="bg-purple-500 text-white w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-6">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{faq.Question}</h3>
                <p>{faq.Answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion Effect */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <div
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h3 className="text-xl font-bold mb-2">{faq.Question}</h3>
                  <span
                    className={`transform transition-transform ${
                      activeFaq === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </div>
                <p
                  className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                    activeFaq === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                 {faq.Answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section ref={feedbackRef} className="py-20 bg-gray-100"> {/* Attach ref here */}
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">User Feedback</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <p className="italic">"This tool helped me improve my resume and land an interview at my dream company!"</p>
              <p className="mt-4 text-sm text-gray-600">- Alex, Marketing Professional</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <p className="italic">"The ATS checker is spot-on. The feedback was invaluable for my job search."</p>
              <p className="mt-4 text-sm text-gray-600">- Jordan, Software Engineer</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <p className="italic">"The job recommendations matched my skills perfectly. Highly recommended!"</p>
              <p className="mt-4 text-sm text-gray-600">- Sam, Data Analyst</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-purple-600 text-white text-center">
        <p>© 2024 ATS Checker & Job Recommendations | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default LandingPage;
