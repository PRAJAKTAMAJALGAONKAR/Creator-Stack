import React, { useState } from "react";
import RealDash from "/images/maindashimg.png";

const DashboardHome = () => {
  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    { title: "Dashboard", link: "/dashboard", color: "bg-white" },
    { title: "Upload Content", link: "/dashboard/upload", color: "bg-white" },
    { title: "Sales Stats", link: "/dashboard/sales", color: "bg-white" },
    { title: "Help", link: "/dashboard/help", color: "bg-white" },
  ];

  return (
    <div className="p-10 min-h-screen bg-slate-50 relative overflow-hidden">
      
      
      {activeCard !== null && (
        <>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 bg-black opacity-60 animate-speed-line"
              style={{
                top: `${Math.random() * 100}%`,
                left: '-100%',
                width: `${Math.random() * 200 + 150}px`,
                animationDelay: `${i * 0.04}s`,
                animationDuration: `${Math.random() * 0.2 + 0.3}s`,
                transform: `skewX(-${Math.random() * 10 + 5}deg)`
              }}
            />
          ))}
        </>
      )}

      <h1 className="navfam text-4xl font-extrabold mb-3 text-slate-900 tracking-tight">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24 relative">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative"
            onMouseEnter={() => setActiveCard(i)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <a href={card.link} className="group relative block">
              
              
              {activeCard === i && (
                <>
                  
                  {[...Array(5)].map((_, lineIndex) => (
                    <div
                      key={`h-${lineIndex}`}
                      className="absolute h-0.5 bg-slate-400 opacity-50"
                      style={{
                        top: `${20 + lineIndex * 20}%`,
                        left: '-200px',
                        width: '120px',
                        animation: `speedLineRight 0.4s ease-out forwards`,
                        animationDelay: `${lineIndex * 0.03}s`,
                        transform: 'skewX(-12deg)'
                      }}
                    />
                  ))}
                </>
              )}

             
              <div
                className="
                  absolute inset-0 
                  border-2 border-slate-900 
                  rounded-xl 
                  -skew-x-12
                  translate-x-2 translate-y-2
                  transition-all duration-300
                  group-hover:translate-x-3 group-hover:translate-y-3
                "
              ></div>

              
              <div
                className={`
                  relative
                  ${card.color}
                  border-2 border-slate-900
                  h-40
                  rounded-xl
                  -skew-x-12
                  flex
                  items-center
                  justify-center
                  p-6
                  shadow-md
                  group-hover:shadow-xl
                  transition-all duration-300
                  overflow-hidden
                `}
              >
               
                <div className="absolute inset-2 border border-slate-200 rounded-lg transform skew-x-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>

               
                <span
                  className="
                    transform skew-x-12
                    text-slate-900
                    font-extrabold
                    text-xl
                    uppercase
                    tracking-wider
                    text-center
                    relative z-10
                  "
                >
                  {card.title}
                </span>

              
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="relative max-w-2xl w-full">
          
          <div className="absolute inset-0 bg-indigo-100 blur-2xl opacity-20 rounded-3xl"></div>

          
          <img
            src={RealDash}
            alt="Dashboard Preview"
            className="
              relative
              rounded-2xl
              shadow-xl
              border
              border-slate-200
              w-full
            "
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes speedLineRight {
          0% {
            left: -200px;
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            left: 120%;
            opacity: 0;
          }
        }

        @keyframes expandLine {
          0% {
            width: 0;
            opacity: 1;
          }
          100% {
            width: 60px;
            opacity: 0;
          }
        }

        @keyframes speed-line {
          0% {
            left: -100%;
            opacity: 0;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            left: 120%;
            opacity: 0;
          }
        }

        .animate-speed-line {
          animation: speed-line 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DashboardHome;