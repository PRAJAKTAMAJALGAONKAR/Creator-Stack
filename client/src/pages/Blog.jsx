import React, { useState } from 'react';
import emailjs from "@emailjs/browser";

import Blog1 from "/images/Blog1.png";
import Blog2 from "/images/Blog2.png";
import Blog3 from "/images/Blog3.png";
import Blog4 from "/images/search.png";
import Blog5 from "/images/laptopwork.png";
import Blog6 from "/images/newaccount.png"
function Blog() {

    const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
  e.preventDefault();

  if (!email) {
    alert("Please enter email");
    return;
  }

  setLoading(true);

  emailjs
    .send(
      "service_4of9nrf",
      "template_l3iql6o",
      {
           to_email: email,
           user_email: email,

      },
      "Mquyiih-BEcNh-jzx"
    )
    .then((res) => {
      console.log("Success:", res);
      alert("Subscribed Successfully ✅");
      setEmail("");
      setLoading(false);
    })
    .catch((err) => {
      console.error("EmailJS Error:", err);
      alert("Subscription Failed ❌ " + err.text);
      setLoading(false);
    });
};


  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tips & Tricks', 'Success Stories', 'Updates', 'Guides'];

  const blogPosts = [
    {
      id: 1,
      title: "How to Price Your Digital Products for Maximum Revenue",
      excerpt:
        "Learn the psychology behind pricing strategies that convert browsers into buyers. Discover the sweet spot for your digital products.",
      image: Blog1,
      category: "Tips & Tricks",
      date: "Jan 24, 2026",
      readTime: "5 min read",
      author: "Anonymous",
      link: "https://medium.com/@realpranav19/how-to-price-your-digital-products-for-maximum-revenue-2acc7450ada6",
    },
    {
      id: 2,
      title: "From $0 to $10k: A Creator's Journey with CreatorStack",
      excerpt:
        "Meet a creator who transformed their side hustle into a full-time income stream using CreatorStack.",
      image: Blog2,
      category: "Success Stories",
      date: "Jan 18, 2025",
      readTime: "8 min read",
      author: "Anonymous",
      link: "https://medium.com/@realpranav19/from-0-to-10k-a-creators-journey-with-creatorstack-1bedce90fa50",
    },
    {
      id: 3,
      title: "Complete Guide: Setting Up Your First Digital Product",
      excerpt:
        "Step-by-step walkthrough to launch your first digital product from scratch.",
      image: Blog3,
      category: "Guides",
      date: "Jan 15, 2025",
      readTime: "10 min read",
      author: "Income AIcademy",
      link: "https://medium.com/@IncomeAIcademy/how-i-launched-my-first-digital-product-in-a-weekend-and-5-easy-digital-product-ideas-you-can-ed2b79bb991b",
    },
    {
      id: 4,
      title: "Why Zero Platform Fees Matter for Your Business",
      excerpt:
        "A breakdown of how marketplace fees eat into your profits and why zero fees matter.",
      image: Blog4,
      category: "Tips & Tricks",
      date: "Jan 12, 2025",
      readTime: "6 min read",
      author: "JohnMark Ezvaldo",
      link: "https://medium.com/@ezvaldomark/the-zero-fee-revolution-why-high-transaction-costs-are-becoming-obsolete-715a8177f762",
    },
    {
      id: 5,
      title: "New Feature: Advanced Analytics Dashboard",
      excerpt:
        "Track your performance with real-time analytics and creator insights.",
      image: Blog5,
      category: "Updates",
      date: "Jan 10, 2025",
      readTime: "4 min read",
      author: "CreatorStack Team",
      link: "https://medium.com/@design_talks/dashboard-design-for-data-analytics-8ab39fb5633d",
    },
    {
      id: 6,
      title: "Building an Audience Before You Launch",
      excerpt:
        "Learn how to build hype and audience before launching your product.",
      image: Blog6,
      category: "Guides",
      date: "Jan 8, 2025",
      readTime: "7 min read",
      author: "Ryan Hoover",
      link: "https://medium.com/@rrhoover/building-a-startup-build-an-audience-first-9fbba4f1fa15",
    },
  ];


  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
      `}</style>

      
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-indigo-50 via-white to-violet-50 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-200/30 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-indigo-200 rounded-full text-sm font-semibold mb-8 shadow-sm animate-fadeInUp">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-indigo-700">Creator Insights</span>
          </div>
          <h1 className="navfam text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight animate-fadeInUp delay-100">
            Resources to Help You
            <span className=" navfam block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 mt-2">
              Grow Your Revenue
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto animate-fadeInUp delay-200">
            Tips, strategies, and success stories from creators who are winning with CreatorStack.
          </p>
        </div>
      </section>

    
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2.5rem] overflow-hidden shadow-2xl animate-fadeInUp delay-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-full">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm font-semibold rounded-full border border-indigo-400/30">
                    {featuredPost.category}
                  </span>
                  <span className="text-slate-400 text-sm">{featuredPost.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400"></div>
                    <div>
                      <div className="text-white font-semibold text-sm">{featuredPost.author}</div>
                      <div className="text-slate-400 text-sm">{featuredPost.readTime}</div>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
                    <a href={featuredPost.link} target="_blank" rel="noreferrer">
                      Read More → </a>

                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   
      <section className="py-8 px-6 bg-slate-50 sticky top-20 z-40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all
            ${selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600 hover:bg-indigo-50"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-indigo-200 transform hover:-translate-y-2 animate-fadeIn delay-${Math.min(index, 4) * 100}`}
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400"></div>
                      <span className="text-sm font-semibold text-slate-700">{post.author}</span>
                    </div>
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors font-semibold"
                    >
                      Read →
                    </a>

                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-indigo-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            Get the latest creator tips, success stories, and platform updates delivered to your inbox.
          </p>
                  
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl border text-slate-900 focus:outline-none focus:ring-4 focus:ring-white/30"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-xl"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>

          </form>
          <p className="text-sm text-indigo-200 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}

export default Blog;