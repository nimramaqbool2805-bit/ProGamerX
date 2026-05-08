import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, Gamepad2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'device', title: 'Select Your Platform' },
  { id: 'skill', title: 'What is your skill level?' },
  { id: 'style', title: 'Define your playstyle' },
  { id: 'result', title: 'Your Optimized Settings' },
];

export default function SettingsGenerator() {
  const [currentStep, setCurrentStep] = useState(0);
  const { settings, setSettings } = useStore();

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bebas-neue text-white mb-4">Settings Optimizer</h1>
          <div className="flex gap-2">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={cn(
                  "h-1 flex-1 transition-colors",
                  i <= currentStep ? "bg-neon-cyan" : "bg-white/10"
                )}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-neutral-900/50 border border-white/10 p-8 rounded-2xl backdrop-blur-xl"
          >
            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <OptionCard
                  icon={Monitor}
                  title="PC"
                  active={settings.device === 'PC'}
                  onClick={() => { setSettings({ device: 'PC' }); handleNext(); }}
                />
                <OptionCard
                  icon={Smartphone}
                  title="Mobile"
                  active={settings.device === 'Mobile'}
                  onClick={() => { setSettings({ device: 'Mobile' }); handleNext(); }}
                />
                <OptionCard
                  icon={Gamepad2}
                  title="Console"
                  active={settings.device === 'Console'}
                  onClick={() => { setSettings({ device: 'Console' }); handleNext(); }}
                />
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                {['Beginner', 'Intermediate', 'Advanced', 'Pro'].map((level) => (
                  <button
                    key={level}
                    onClick={() => { setSettings({ skillLevel: level }); handleNext(); }}
                    className={cn(
                      "w-full p-6 text-left border rounded-xl transition-all flex justify-between items-center",
                      settings.skillLevel === level ? "border-neon-cyan bg-neon-cyan/10 text-white" : "border-white/10 text-neutral-400 hover:border-white/30"
                    )}
                  >
                    <span className="font-rajdhani text-xl font-bold uppercase tracking-wider">{level}</span>
                    {settings.skillLevel === level && <Check className="text-neon-cyan" />}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <OptionCard
                  title="Aggressive"
                  desc="High mobility, close-range combat focus."
                  active={settings.playStyle === 'Aggressive'}
                  onClick={() => { setSettings({ playStyle: 'Aggressive' }); handleNext(); }}
                />
                <OptionCard
                  title="Tactical"
                  desc="Strategic positioning, utilities usage."
                  active={settings.playStyle === 'Tactical'}
                  onClick={() => { setSettings({ playStyle: 'Tactical' }); handleNext(); }}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="p-6 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl">
                  <h3 className="text-neon-cyan font-bebas-neue text-2xl mb-4">Recommended Sensitivity</h3>
                  <div className="text-5xl font-bold text-white mb-2">1.25 <span className="text-lg font-normal text-neutral-500 italic">@ 800 DPI</span></div>
                  <p className="text-neutral-400 text-sm">Optimized for {settings.playStyle} style on {settings.device}.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-neutral-500 text-xs uppercase mb-1">Graphics</div>
                    <div className="text-white font-bold">Performance (Low/Med)</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-neutral-500 text-xs uppercase mb-1">Refresh Rate</div>
                    <div className="text-white font-bold">Max Available</div>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentStep(0)}
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-neon-cyan transition-colors"
                >
                  Restart Generator
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {currentStep > 0 && currentStep < steps.length - 1 && (
          <button 
            onClick={handleBack}
            className="mt-8 text-neutral-500 hover:text-white transition-colors flex items-center gap-2 uppercase text-xs tracking-widest"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}

const OptionCard = ({ icon: Icon, title, desc, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "p-8 border rounded-2xl transition-all text-center flex flex-col items-center gap-4 group",
      active ? "border-neon-cyan bg-neon-cyan/10" : "border-white/10 hover:border-white/30"
    )}
  >
    {Icon && <Icon className={cn("size-12 transition-colors", active ? "text-neon-cyan" : "text-neutral-500 group-hover:text-white")} />}
    <div>
      <div className={cn("font-bebas-neue text-2xl tracking-wide", active ? "text-white" : "text-neutral-400 group-hover:text-white")}>{title}</div>
      {desc && <p className="text-neutral-500 text-sm mt-1">{desc}</p>}
    </div>
  </button>
);
