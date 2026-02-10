import React, { useState, useEffect } from "react";
import Coin from "/images/money.png";
import DashBoardImg from "/images/laptopwork.png";
import Payment from "/images/payement.png";
import Unlock from "/images/unlock.png";
import Auths from "/images/authentication.png";
import DashboardHome from "/images/dashboardhome.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; 

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    
    const storedUsername = localStorage.getItem("name");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.8s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

     
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src={Coin}
            alt=""
            className="absolute w-12 h-12 opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      
      <Navbar />

      <section className="relative pt-32 pb-32 overflow-hidden">
       
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-violet-200/30 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
          
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 animate-fadeInUp">
                <span className="navfam flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="navfam text-xs font-bold uppercase tracking-wider text-slate-600">Trusted by Creators</span>
              </div>

              <h1 className="navfam text-6xl xl:text-7xl font-black text-slate-900 leading-[1.1] mb-6 animate-fadeInUp delay-100">
                Turn Your Knowledge Into
                <span className="navfam block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 mt-2">
                  Instant Revenue
                </span>
              </h1>

              <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed animate-fadeInUp delay-200">
                Skip the marketplace fees. Sell courses, PDFs, and videos directly with secure tokenized links. Get paid instantly when buyers access your content.
              </p>

              <div className="flex flex-wrap gap-4 animate-fadeInUp delay-300">
                {username ? (
                  <Link to="/dashboard">
                    <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg flex items-center gap-2">
                      Go to Dashboard
                      <span>→</span>
                    </button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg flex items-center gap-2">
                      Start Selling
                      <span>→</span>
                    </button>
                  </Link>
                )}
                <Link to="/blog"> 
                  <button className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all text-lg">
                    Explore Blogs
                  </button>
                </Link>
              </div>
            </div>

         
            <div className="relative animate-fadeInRight delay-300">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-[3rem] blur-3xl opacity-20" 
                   style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
              <div className="relative z-20 rounded-[2.5rem] border-8 border-white shadow-2xl overflow-hidden bg-white">
                <img src={DashboardHome} alt="Dashboard Preview" className="w-full h-auto" />
              </div>
              
              <img 
                src={Coin} 
                alt="" 
                className="absolute -top-12 -right-12 w-28 h-28 drop-shadow-2xl"
                style={{
                  animation: 'float 4s ease-in-out infinite',
                  transform: `translateY(${scrollY * 0.05}px) rotate(10deg)`
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-950 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fadeInUp">
              Built for Scale
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed animate-fadeInUp delay-100">
              Everything you need to run a digital empire without the technical overhead.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
              img={Payment} 
              title="Instant Settlement" 
              desc="Funds move directly from buyer to your wallet. No 30-day holding periods or marketplace delays."
              delay="200"
            />
            <FeatureCard 
              img={Auths} 
              title="Identity-Link Security" 
              desc="Our tokenized access ensures only valid buyers view your content, protecting your intellectual property."
              delay="300"
            />
            <FeatureCard 
              img={Unlock} 
              title="Zero-Click Purchase" 
              desc="Remove the 'Sign-Up' barrier. High-conversion checkout flows designed for impulse digital buys."
              delay="400"
            />
          </div>
        </div>
      </section>

      
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100 rounded-full blur-[120px] opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-fadeInLeft delay-200">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-3xl blur-2xl opacity-20" />
              <img
                src={DashBoardImg}
                alt="Creator Dashboard"
                className="relative rounded-3xl shadow-2xl border-4 border-slate-200 w-full"
              />
            </div>

            <div className="animate-fadeInRight delay-300">
              <h3 className="text-5xl font-bold mb-8">
                Your Command Center for
                <span className="navfam block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 mt-2">
                  Passive Income
                </span>
              </h3>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                One powerful dashboard to manage your entire content empire. Upload, price, track, and earn.
              </p>
              <div className="space-y-5">
                {[
                  "Upload courses, PDFs, videos, or any digital content",
                  "Set custom pricing and expiry times for each product",
                  "Track revenue and downloads in real-time analytics",
                  "Generate shareable links in seconds, share anywhere",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 animate-fadeInUp" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-lg text-slate-700 font-medium pt-0.5">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

   
      <section className="py-32 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(3)].map((_, i) => (
            <img
              key={i}
              src={Coin}
              alt=""
              className="absolute w-16 h-16"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
                animation: `float ${6 + i}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 animate-fadeInUp">
            Start Earning From Your Expertise Today
          </h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto leading-relaxed animate-fadeInUp delay-100">
            Keep 95% of your profits. No middlemen. No monthly fees. Just you and your earnings.
          </p>
          <Link to={username ? "/dashboard" : "/addaccount"}>
            <button className="px-12 py-5 bg-white text-indigo-700 rounded-2xl text-xl font-bold hover:bg-slate-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 animate-scaleIn delay-200">
              {username ? "Go to Dashboard" : "Launch Your Creator Stack"}
            </button>
          </Link>
          
          <div className="mt-16 flex justify-center gap-12 text-white/80 animate-fadeInUp delay-300">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">Quick</div>
              <div className="text-sm mt-1">Setup</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$0</div>
              <div className="text-sm mt-1">Monthly Fees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm mt-1">Access</div>
            </div>
          </div>
        </div>
      </section>


      <footer className="bg-slate-900 py-12 text-center text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="navfam text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-4">
            CreatorStack
          </div>
          <p>© 2026 CreatorStack.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ img, title, desc, delay }) {
  return (
    <div 
      className={`group relative p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all duration-500 backdrop-blur-sm hover:-translate-y-3 animate-fadeInUp delay-${delay}`}
    >
 
      <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 shadow-xl border border-slate-700">
        <img 
          src={img} 
          alt={title} 
          className="w-20 h-20 object-contain brightness-110 group-hover:brightness-125 transition-all" 
        />
      </div>
      
      <h4 className="font-bold text-2xl mb-4 text-white group-hover:text-indigo-400 transition-colors">
        {title}
      </h4>
      <p className="text-slate-400 leading-relaxed text-lg group-hover:text-slate-300 transition-colors">
        {desc}
      </p>

     
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-indigo-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
    </div>
  );
}