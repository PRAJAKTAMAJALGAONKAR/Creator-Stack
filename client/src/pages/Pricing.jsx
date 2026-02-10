import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Pricing1 from "/images/Pricing1.png";
import Pricing2 from "/images/Pricing2.png";
import Pricing3 from "/images/Pricing3.png";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for getting started",
      image: Pricing1,
      features: [
        "5% platform fee per transaction",
        "Upload up to 10 products",
        "Basic analytics dashboard",
        "Secure payment links",
        "Email support",
        "Standard file hosting (100MB per file)",
      ],
      highlighted: false,
      cta: "Get Started Free",
    },
    {
      name: "Pro",
      price: billingCycle === "monthly" ? "29" : "290",
      description: "For serious creators",
      image: Pricing2,
      features: [
        "Only 3% platform fee per transaction",
        "Unlimited products",
        "Advanced analytics & insights",
        "Custom branding options",
        "Priority support",
        "Enhanced file hosting (1GB per file)",
        "Customer management tools",
        "Discount & coupon codes",
      ],
      highlighted: true,
      cta: "Start Pro",
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and agencies",
      image: Pricing3,
      features: [
        "Negotiable platform fee (as low as 2%)",
        "Everything in Pro",
        "Dedicated account manager",
        "White-label solutions",
        "API access",
        "Custom integrations",
        "Team collaboration features",
        "SLA guarantee",
      ],
      highlighted: false,
      cta: "Contact Sales",
    },
  ];

  const comparisonFeatures = [
    { category: "Platform Fee", free: "5%", pro: "3%", enterprise: "2-3%" },
    { category: "Products", free: "10", pro: "Unlimited", enterprise: "Unlimited" },
    { category: "File Size Limit", free: "100MB", pro: "1GB", enterprise: "Custom" },
    { category: "Analytics", free: "Basic", pro: "Advanced", enterprise: "Custom Reports" },
    { category: "Support", free: "Email", pro: "Priority", enterprise: "Dedicated Manager" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
      `}</style>

  
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-indigo-50 via-white to-violet-50 relative overflow-hidden">

        <div className="max-w-4xl mx-auto text-center relative z-10">

          <h1 className="navfam text-5xl md:text-7xl font-black text-slate-900 mb-6 animate-fadeInUp delay-100">
            Pricing That Scales
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 mt-2">
              With Your Success
            </span>
          </h1>

          <p className="text-xl text-slate-600 animate-fadeInUp delay-200">
            Start free and only pay when you earn.
          </p>
        </div>

        <div className="flex justify-center mt-12 animate-fadeInUp delay-300">

          <div className="inline-flex bg-white border rounded-full p-1">

            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full ${
                billingCycle === "monthly"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-full ${
                billingCycle === "annual"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600"
              }`}
            >
              Annual
            </button>

          </div>
        </div>
      </section>

     
      <section className="py-16 px-6 bg-white">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          {plans.map((plan, index) => (

            <div
              key={plan.name}
              className={`relative rounded-[2rem] p-8 border-2 animate-scaleIn delay-${index}00 ${
                plan.highlighted
                  ? "border-indigo-600 bg-indigo-50 shadow-xl"
                  : "border-slate-200 bg-white"
              }`}
            >

              {plan.badge && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}

              <img
                src={plan.image}
                alt={plan.name}
                className="w-full h-40 object-contain mb-6"
              />

              <h3 className="text-2xl font-bold">{plan.name}</h3>

              <p className="text-slate-600 mb-6">{plan.description}</p>

              <div className="mb-8">

                {plan.price !== "Custom" ? (
                  <h2 className="text-5xl font-bold">
                    ₹{plan.price}
                    <span className="text-base text-slate-500">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </h2>
                ) : (
                  <h2 className="text-4xl font-bold">Custom</h2>
                )}

              </div>

             
              <button
                onClick={() => {
                  if (plan.name === "Pro") {
                    navigate("/subscription");
                  }
                }}
                className={`w-full py-4 rounded-xl font-bold mb-8 ${
                  plan.highlighted
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-slate-900 text-white"
                }`}
              >
                {plan.cta}
              </button>

              <div className="space-y-3">

                {plan.features.map((f, i) => (

                  <div key={i} className="flex gap-2">

                    <span className="text-indigo-600">✔</span>

                    <span>{f}</span>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>
      </section>

      
      <section className="py-20 px-6 bg-slate-50">

        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead>
              <tr className="bg-slate-100">
                <th className="p-4 text-left">Feature</th>
                <th className="p-4 text-center">Free</th>
                <th className="p-4 text-center text-indigo-600">Pro</th>
                <th className="p-4 text-center">Enterprise</th>
              </tr>
            </thead>

            <tbody>

              {comparisonFeatures.map((f, i) => (

                <tr key={i} className="border-t">

                  <td className="p-4">{f.category}</td>
                  <td className="p-4 text-center">{f.free}</td>
                  <td className="p-4 text-center text-indigo-600 font-semibold">
                    {f.pro}
                  </td>
                  <td className="p-4 text-center">{f.enterprise}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}
