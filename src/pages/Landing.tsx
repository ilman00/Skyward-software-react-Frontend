import { 
  Monitor, ShieldCheck, BarChart3, Users, Zap, 
  Globe, ArrowRight, PlayCircle,
  Smartphone, Database, LayoutDashboard
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-blue-100">
      
      {/* --- NAVIGATION --- */}
      {/* <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">SMD Manager</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#stats" className="hover:text-blue-600 transition-colors">Performance</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">Workflow</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">Sign In</Link>
            <Link to="/register" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              Get Started
            </Link>
          </div>
        </div>
      </nav> */}

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold uppercase tracking-wider">
              <Zap size={14} /> New: V2.0 Dashboard is live
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
              The Operating System for <span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">SMD Management.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
              From inventory tracking to automated rent payouts. Empower your marketers, manage your staff, and scale your digital screen network globally.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 group">
                Start Free Trial <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
                <PlayCircle size={20} /> Watch Demo
              </button>
            </div>
          </div>
          <div className="relative">
             {/* Abstract UI representation */}
            <div className="bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-3xl p-4 lg:p-8 shadow-2xl">
              <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="h-8 bg-slate-50 border-b flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="h-4 w-1/3 bg-slate-100 rounded" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-20 bg-blue-50 rounded-lg border border-blue-100" />
                    <div className="h-20 bg-slate-50 rounded-lg" />
                    <div className="h-20 bg-slate-50 rounded-lg" />
                  </div>
                  <div className="h-32 bg-slate-50 rounded-lg" />
                </div>
              </div>
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Revenue Growth</p>
                  <p className="text-2xl font-black text-slate-800">+28.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Capabilities</h2>
            <p className="text-4xl font-bold text-slate-900">Everything you need to manage your network at scale.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Monitor className="text-blue-600" />}
              title="Inventory Tracking"
              desc="Real-time status updates for every SMD device in your network. Know what's active and what's sold."
            />
            <FeatureCard 
              icon={<Users className="text-purple-600" />}
              title="Marketer Ecosystem"
              desc="Comprehensive broker management with custom commission structures for every deal closed."
            />
            <FeatureCard 
              icon={<Database className="text-emerald-600" />}
              title="Secure Ledger"
              desc="A complete, immutable history of every closed deal and rent payout made to your clients."
            />
            <FeatureCard 
              icon={<Smartphone className="text-rose-600" />}
              title="Mobile Optimized"
              desc="Manage your entire staff and customer directory from your phone with our responsive dashboard."
            />
            <FeatureCard 
              icon={<LayoutDashboard className="text-indigo-600" />}
              title="Advanced Analytics"
              desc="Track monthly rent disbursements and sell prices to forecast your growth effectively."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-amber-600" />}
              title="Role-Based Access"
              desc="Granular permissions for Admins and Staff to ensure your sensitive data stays protected."
            />
          </div>
        </div>
      </section>

      {/* --- STATISTICS SECTION --- */}
      <section id="stats" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem val="5,000+" label="Active SMDs" />
            <StatItem val="120+" label="Global Marketers" />
            <StatItem val="PKR 45M+" label="Monthly Payouts" />
            <StatItem val="99.9%" label="System Uptime" />
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Simple Workflow for High-Stakes Management</h2>
              <div className="space-y-6">
                <StepItem num="01" title="Register Inventory" desc="Upload your SMD devices with unique codes and specifications." />
                <StepItem num="02" title="Assign Marketers" desc="Connect brokers to devices and set their percentage or fixed commission." />
                <StepItem num="03" title="Close Deals" desc="Record sales and automatically initiate monthly rent payout cycles." />
              </div>
            </div>
            <div className="bg-slate-100 rounded-3xl aspect-square flex items-center justify-center p-12">
               <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Zap size={40} fill="currentColor" />
                  </div>
                  <p className="font-bold text-slate-800 text-xl">Lightning Fast Integration</p>
                  <p className="text-slate-500">Connects with your existing API within minutes.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">Ready to take control of your assets?</h2>
          <p className="text-blue-100 text-xl">Join the elite network of screen owners using SMD Manager.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-white text-blue-600 px-10 py-4 rounded-xl font-black text-lg hover:bg-blue-50 transition-all shadow-2xl">
              Get Started for Free
            </Link>
            <Link to="/contact" className="bg-blue-700 text-white border border-blue-500 px-10 py-4 rounded-xl font-black text-lg hover:bg-blue-800 transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1 space-y-4">
             <div className="flex items-center gap-2 font-bold text-xl">
               <div className="bg-blue-600 p-1.5 rounded-lg text-white"><ShieldCheck size={20} /></div>
               <span>SMD Manager</span>
             </div>
             <p className="text-slate-500 text-sm">Professional management solutions for the modern digital advertising infrastructure.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Product</h4>
            <ul className="text-sm text-slate-500 space-y-2">
              <li>Inventory Management</li>
              <li>Broker Tracking</li>
              <li>Payout Ledgers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="text-sm text-slate-500 space-y-2">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Support</h4>
            <ul className="text-sm text-slate-500 space-y-2">
              <li>Help Center</li>
              <li>API Docs</li>
              <li>Contact Support</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
           <p>© 2026 SMD Manager. All Rights Reserved.</p>
           <div className="flex gap-6">
              <Globe size={16} /> English (US)
           </div>
        </div>
      </footer>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
  </div>
);

const StatItem = ({ val, label }: any) => (
  <div className="space-y-1">
    <p className="text-4xl font-black text-white">{val}</p>
    <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px]">{label}</p>
  </div>
);

const StepItem = ({ num, title, desc }: any) => (
  <div className="flex gap-6">
    <span className="text-3xl font-black text-slate-200">{num}</span>
    <div>
      <h4 className="text-lg font-bold text-slate-900">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default LandingPage;