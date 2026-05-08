import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Clock, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RankPlanner() {
  const [selectedGame, setSelectedGame] = useState('Valorant');
  const [currentRank, setCurrentRank] = useState('Bronze');
  const [targetRank, setTargetRank] = useState('Gold');

  const games = ['Valorant', 'CS2', 'PUBG Mobile'];
  const ranks = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bebas-neue text-white mb-8">Rank Improvement Planner</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-neutral-900/50 border border-white/10 rounded-2xl">
              <label className="text-xs uppercase text-neutral-500 font-bold tracking-widest block mb-4">Select Game</label>
              <div className="space-y-2">
                {games.map(game => (
                  <button
                    key={game}
                    onClick={() => setSelectedGame(game)}
                    className={cn(
                      "w-full p-4 rounded-xl text-left transition-all border",
                      selectedGame === game ? "border-neon-cyan bg-neon-cyan/5 text-white" : "border-white/5 text-neutral-400 hover:border-white/20"
                    )}
                  >
                    {game}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-neutral-900/50 border border-white/10 rounded-2xl">
              <label className="text-xs uppercase text-neutral-500 font-bold tracking-widest block mb-4">Current Rank</label>
              <select 
                value={currentRank}
                onChange={(e) => setCurrentRank(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-neon-cyan outline-none"
              >
                {ranks.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="p-6 bg-neutral-900/50 border border-white/10 rounded-2xl">
              <label className="text-xs uppercase text-neutral-500 font-bold tracking-widest block mb-4">Target Rank</label>
              <select 
                value={targetRank}
                onChange={(e) => setTargetRank(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:border-neon-cyan outline-none"
              >
                {ranks.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-gradient-to-br from-neon-violet/10 to-transparent border border-white/10 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="size-16 bg-neon-violet rounded-2xl flex items-center justify-center">
                  <Trophy className="text-black size-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bebas-neue text-white tracking-wide">Road to {targetRank}</h2>
                  <p className="text-neutral-500 text-sm">Estimated time: 4-6 weeks based on 10h/week</p>
                </div>
              </div>

              <div className="space-y-4">
                <PlanStep 
                  icon={Target} 
                  title="Daily Aim Routine" 
                  desc="15min Gridshot + 15min Tracking Drills in AimLab." 
                  duration="30m"
                />
                <PlanStep 
                  icon={Clock} 
                  title="VOD Review" 
                  desc="Analyze one loss per day. Focus on positioning errors." 
                  duration="20m"
                />
                <PlanStep 
                  icon={Calendar} 
                  title="Ranked Grind" 
                  desc="3 Competitive matches maximum. Stop after 2 consecutive losses." 
                  duration="2h"
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-neon-cyan text-xs font-bold uppercase mb-2">Key Skill to Focus</div>
                <div className="text-xl font-rajdhani font-bold text-white uppercase">Crosshair Placement</div>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-neon-green text-xs font-bold uppercase mb-2">Win Rate Forecast</div>
                <div className="text-xl font-rajdhani font-bold text-white uppercase">+12% Projected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PlanStep = ({ icon: Icon, title, desc, duration }: any) => (
  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
    <div className="size-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
      <Icon className="text-white size-5" />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-bold text-white text-sm uppercase tracking-wider">{title}</h4>
        <span className="text-xs text-neutral-500 font-mono">{duration}</span>
      </div>
      <p className="text-neutral-400 text-sm">{desc}</p>
    </div>
  </div>
);
