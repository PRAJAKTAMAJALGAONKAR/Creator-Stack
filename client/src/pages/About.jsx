import React from "react";
import Complete from "/images/100complete.png";
import WebDev from "/images/webdev.png";

export default function About() {
  const values = [
    {
      title: "Creator First",
      description: "Every decision we make starts with one question: Does this empower creators? Your success is our success.",
      icon: "💡",
      gradient: "from-amber-400 to-orange-500",
    },
    {
      title: "Transparent Always",
      description: "No hidden fees, no surprise charges. What you earn is what you keep. Simple, honest, transparent.",
      icon: "🔍",
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      title: "Innovation Driven",
      description: "We're constantly pushing boundaries to give you tools that didn't exist yesterday. The future of creator economy starts here.",
      icon: "🚀",
      gradient: "from-purple-400 to-pink-500",
    },
  ];

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Get paid instantly when your content is accessed",
    },
    {
      icon: "🔒",
      title: "Secure & Safe",
      description: "Bank-level security protecting your content and earnings",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Track your performance with real-time insights",
    },
    {
      icon: "🌍",
      title: "Global Reach",
      description: "Sell to anyone, anywhere in the world",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>

    
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-indigo-50 via-white to-violet-50 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-200/30 rounded-full blur-[100px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-indigo-200 rounded-full text-sm font-semibold mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-indigo-700 navfam">About Us</span>
          </div>
          <h1 className="navfam text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight animate-fadeInUp">
            Empowering Creators to
            <span className="navfam block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 mt-2">
              Own Their Economy
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto animate-fadeInUp">
            CreatorStack was built on a simple belief: creators deserve to keep what they earn. No middlemen, minimal marketplace fees, no gatekeepers.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-6">
                Our Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                Built by Creators,
                <span className="navfam block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  For Creators
                </span>
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p className="flex items-start gap-3">
                  <span className="text-2xl mt-1">✨</span>
                  <span>We built the platform we wished existed: instant payments, 5% platform fees, and complete control over pricing and distribution.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-2xl mt-1">🎯</span>
                  <span>What started as a solution for frustrated creators quickly became a movement empowering thousands worldwide.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-2xl mt-1">🌟</span>
                  <span>Today, creators use CreatorStack to sell digital products directly, keeping 90% of what they earn.</span>
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-[3rem] blur-3xl opacity-20 animate-float" />
              <img
                src={WebDev}
                alt="Creator at work"
                className="relative rounded-[2.5rem] shadow-2xl border-8 border-white w-full transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-500 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-violet-400 rounded-[3rem] blur-3xl opacity-30 animate-float" />
              <img
                src={Complete}
                alt="100% Complete"
                className="relative rounded-[2.5rem] shadow-2xl border-8 border-white/10 w-full transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 rounded-full text-sm font-bold mb-6">
                Our Mission
              </div>
              <h2 className="navfam text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Democratizing the
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  Creator Economy
                </span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                To remove barriers between creators and their earnings, empowering every creator with professional-grade tools.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                We believe every creator—whether you're just starting or already established—deserves access to tools that don't sacrifice a third of their revenue to platforms that don't add value.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-10">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-white mb-1">95%</div>
                  <div className="text-sm text-slate-400">Your Earnings</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-white mb-1">5%</div>
                  <div className="text-sm text-slate-400">Platform Fees</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-6">
              Our Values
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we build and every decision we make.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-[2rem] p-10 hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-indigo-200 transform hover:-translate-y-2"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Choose CreatorStack?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-indigo-200"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Take Control?</h2>
          <p className="text-xl md:text-2xl text-indigo-100 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join creators who are earning without giving away a third of their revenue to platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/addaccount"
              className="px-10 py-5 bg-white text-indigo-700 font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200 text-lg"
            >
              Start Selling Free
            </a>
            <a
              href="/dashboard/help"
              className="px-10 py-5 border-2 border-white text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-200 text-lg backdrop-blur-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}