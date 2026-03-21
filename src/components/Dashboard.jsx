import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Activity, Scissors, Calendar, 
  Wind, Flame, Droplets, ArrowUpRight, 
  ShieldCheck, Zap, Info
} from 'lucide-react';

export default function Dashboard({ messages }) {
  // Simulated data extraction from chat
  const hasVataMention = messages.some(m => m.content.toLowerCase().includes('vata') || m.content.toLowerCase().includes('anxious'));
  const hasTulsiMention = messages.some(m => m.content.toLowerCase().includes('tulsi'));

  const doshas = [
    { name: 'Vata', icon: Wind, color: 'text-blue-500', bg: 'bg-blue-50', level: hasVataMention ? 75 : 40, description: 'Air & Ether' },
    { name: 'Pitta', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50', level: 30, description: 'Fire & Water' },
    { name: 'Kapha', icon: Droplets, color: 'text-emerald-500', bg: 'bg-emerald-50', level: 20, description: 'Earth & Water' },
  ];

  const remedies = [
    { name: 'Holy Basil (Tulsi)', use: 'Stress & Respiratory', status: hasTulsiMention ? 'Active' : 'Locked' },
    { name: 'Ashwagandha', use: 'Sleep & Strength', status: 'Locked' },
    { name: 'Triphala', use: 'Digestion', status: 'Locked' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 bg-parchment/30">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold font-serif text-sage-900">Wellness Sanctuary</h2>
            <p className="text-sage-600">A holistic view of your path to balance</p>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-white rounded-2xl border border-sage-100 shadow-sm flex items-center gap-2">
               <Zap className="w-4 h-4 text-gold-500" />
               <span className="text-sm font-semibold">Sage Level: 4</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Dosha Balance Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-premium border border-sage-50"
          >
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-sage-900 flex items-center gap-2">
                 <Activity className="w-5 h-5 text-gold-500" /> Current Dosha Balance
               </h3>
               <button className="text-xs font-semibold text-emerald-600 hover:underline">Take Detailed Test</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {doshas.map((dosha, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className={`p-2 rounded-xl ${dosha.bg}`}>
                         <dosha.icon className={`w-4 h-4 ${dosha.color}`} />
                       </div>
                       <span className="font-bold text-sage-800">{dosha.name}</span>
                    </div>
                    <span className="text-xs font-medium text-sage-400">{dosha.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-sage-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${dosha.level}%` }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                      className={`h-full rounded-full ${dosha.color.replace('text', 'bg')}`}
                    />
                  </div>
                  <p className="text-[10px] text-sage-500 uppercase tracking-widest">{dosha.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-4 rounded-2xl bg-sage-50/50 border border-sage-100 flex gap-4 items-start">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-sage-700 leading-relaxed">
                {hasVataMention 
                  ? "I notice signs of Vata imbalance in your history. Consider grounding foods like cooked grains and healthy fats to stabilize your airy energy."
                  : "Your energies appear stable. Continue your rhythmic daily routines (Dinacharya) to maintain this harmony."}
              </p>
            </div>
          </motion.div>

          {/* Quick Routine Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-emerald-950 rounded-[32px] p-8 shadow-premium text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-emerald-900/40">
               <Flame className="w-32 h-32" />
            </div>
            <div className="relative z-10 space-y-6">
               <h3 className="text-xl font-bold flex items-center gap-2">
                 <Calendar className="w-5 h-5 text-gold-500" /> Zen Routine
               </h3>
               <div className="space-y-4">
                  {[
                    "Tongue Scraping",
                    "Oil Pulling (Gandusha)",
                    "Sun Salutations (12 min)",
                    "Warm Water Sipping"
                  ].map((item, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                       <div className="w-5 h-5 border-2 border-emerald-700 rounded-md flex items-center justify-center group-hover:border-emerald-500 transition-colors">
                          <div className="w-2 h-2 bg-emerald-500 rounded-sm opacity-0 group-hover:opacity-40" />
                       </div>
                       <span className="text-sm text-emerald-100 group-hover:text-white transition-colors">{item}</span>
                    </label>
                  ))}
               </div>
               <button className="w-full py-3 bg-gold-500 hover:bg-gold-600 rounded-xl font-bold text-sm transition-all mt-4">
                  Log My Progress
               </button>
            </div>
          </motion.div>

        </div>

        {/* Remedies Section */}
        <div className="space-y-4">
           <h3 className="text-xl font-bold text-sage-900 flex items-center gap-2">
             <Heart className="w-5 h-5 text-pink-500" /> Your Healing Altar
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {remedies.map((herb, i) => (
                <div key={i} className={`p-6 rounded-3xl border transition-all ${herb.status === 'Active' ? 'bg-white border-emerald-100 shadow-sm' : 'bg-sage-50/30 border-dashed border-sage-200 opacity-60'}`}>
                   <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-2xl ${herb.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-sage-100 text-sage-400'}`}>
                         <Info className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${herb.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-sage-200 text-sage-600'}`}>
                        {herb.status}
                      </span>
                   </div>
                   <h4 className="font-bold text-sage-900">{herb.name}</h4>
                   <p className="text-xs text-sage-500 mt-1">{herb.use}</p>
                   {herb.status === 'Active' && (
                     <button className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700">
                        View Wisdom Card <ArrowUpRight className="w-3 h-3" />
                     </button>
                   )}
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}
