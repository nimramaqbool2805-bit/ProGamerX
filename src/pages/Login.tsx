import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, User, ChevronRight, Sparkles, Zap, Mail, AlertCircle, Globe, Gamepad2, CheckSquare, Square, KeyRound, RefreshCw } from 'lucide-react';
import { BackgroundBeamsWithCollision } from '../components/ui/BackgroundBeamsWithCollision';
import { cn } from '../lib/utils';

type AuthMode = 'LOGIN' | 'SIGN_UP' | 'FORGOT_PASSWORD';

export default function Login() {
  const [mode, setMode] = useState<AuthMode>('SIGN_UP');
  const [forgotStep, setForgotStep] = useState(1);
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [favoriteGame, setFavoriteGame] = useState('');
  const [region, setRegion] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isRegistered = localStorage.getItem('pgx_registered');
    if (isRegistered) {
      setMode('LOGIN');
    }
  }, []);

  const validatePassword = (pass: string) => {
    const minLength = pass.length >= 12;
    const hasAlpha = /[a-zA-Z]/.test(pass);
    const hasNum = /\d/.test(pass);
    return minLength && hasAlpha && hasNum;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (mode === 'FORGOT_PASSWORD') {
      if (forgotStep === 1) {
        if (!email) {
          setError('EMAIL IS REQUIRED FOR RECOVERY');
          return;
        }
        setIsAuthenticating(true);
        setTimeout(() => {
          setIsAuthenticating(false);
          setForgotStep(2);
          setSuccess('RECOVERY CODE SENT TO EMAIL');
        }, 2000);
      } else {
        if (!otpCode || !newPassword) {
          setError('CODE AND NEW PASSWORD REQUIRED');
          return;
        }
        if (!validatePassword(newPassword)) {
          setError('NEW PASSWORD MUST BE 12+ ALPHANUMERIC');
          return;
        }
        setIsAuthenticating(true);
        setTimeout(() => {
          setIsAuthenticating(false);
          setMode('LOGIN');
          setForgotStep(1);
          setSuccess('PASSWORD UPDATED SUCCESSFULLY');
          setPassword('');
        }, 2500);
      }
      return;
    }

    if (mode === 'SIGN_UP') {
      if (!email || !username || !password || !confirmPassword) {
        setError('ESSENTIAL FIELDS ARE REQUIRED');
        return;
      }
      if (password !== confirmPassword) {
        setError('PASSWORDS DO NOT MATCH');
        return;
      }
      if (!validatePassword(password)) {
        setError('PASSWORD MUST BE 12+ CHARACTERS WITH LETTERS & NUMBERS');
        return;
      }
      if (!agreedToTerms) {
        setError('YOU MUST AGREE TO THE TERMS & CONDITIONS');
        return;
      }
    } else {
      if (!username || !password) {
        setError('EMAIL/USERNAME AND PASSWORD REQUIRED');
        return;
      }
    }

    setIsAuthenticating(true);
    
    setTimeout(() => {
      if (mode === 'SIGN_UP') {
        localStorage.setItem('pgx_registered', 'true');
        localStorage.setItem('pgx_email', email);
        localStorage.setItem('pgx_username', username);
      }
      navigate('/chat');
    }, 2500);
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden flex items-center justify-center pt-28 pb-20">
      <BackgroundBeamsWithCollision className="bg-transparent!">
        <div className="container relative z-10 px-4 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl"
          >
            <div className="relative p-1 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] overflow-hidden">
              <div className="relative bg-neutral-950/80 backdrop-blur-3xl rounded-[2.4rem] p-8 md:p-12 border border-white/5">
                
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center size-16 bg-neon-cyan/10 rounded-2xl mb-6 border border-neon-cyan/20">
                    {mode === 'SIGN_UP' && <Sparkles className="text-neon-cyan size-8" />}
                    {mode === 'LOGIN' && <Shield className="text-neon-cyan size-8" />}
                    {mode === 'FORGOT_PASSWORD' && <KeyRound className="text-neon-cyan size-8" />}
                  </div>
                  <h1 className="text-4xl font-bebas-neue text-white tracking-[0.2em] mb-2">
                    {mode === 'SIGN_UP' && 'SIGN UP'}
                    {mode === 'LOGIN' && 'LOG IN'}
                    {mode === 'FORGOT_PASSWORD' && (forgotStep === 1 ? 'RECOVER ACCESS' : 'RESET PASSWORD')}
                  </h1>
                  <p className="text-neutral-500 text-[10px] uppercase tracking-[0.4em] font-black">
                    {mode === 'SIGN_UP' && 'Join the ProGamerX Elite'}
                    {mode === 'LOGIN' && 'Welcome Back Operative'}
                    {mode === 'FORGOT_PASSWORD' && (forgotStep === 1 ? 'Initiate Neural Link Recovery' : 'Set New Access Code')}
                  </p>
                </div>

                {/* Tabs */}
                {mode !== 'FORGOT_PASSWORD' && (
                  <div className="flex w-full bg-black/40 rounded-xl p-1 mb-8 border border-white/5">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('SIGN_UP');
                        setError(null);
                        setSuccess(null);
                      }}
                      className={cn(
                        "flex-1 py-3 text-[10px] uppercase tracking-[0.3em] font-black rounded-lg transition-all",
                        mode === 'SIGN_UP' 
                          ? "bg-white/10 text-white shadow-[0_0_15px_rgba(0,242,255,0.2)] border border-white/10" 
                          : "text-neutral-500 hover:text-white hover:bg-white/5"
                      )}
                    >
                      SIGN UP
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode('LOGIN');
                        setError(null);
                        setSuccess(null);
                      }}
                      className={cn(
                        "flex-1 py-3 text-[10px] uppercase tracking-[0.3em] font-black rounded-lg transition-all",
                        mode === 'LOGIN' 
                          ? "bg-white/10 text-white shadow-[0_0_15px_rgba(0,242,255,0.2)] border border-white/10" 
                          : "text-neutral-500 hover:text-white hover:bg-white/5"
                      )}
                    >
                      LOG IN
                    </button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3 text-[10px] text-red-500 font-black tracking-widest uppercase"
                      >
                        <AlertCircle size={14} />
                        {error}
                      </motion.div>
                    )}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-neon-cyan/10 border border-neon-cyan/20 rounded-xl p-3 flex items-center gap-3 text-[10px] text-neon-cyan font-black tracking-widest uppercase"
                      >
                        <Zap size={14} />
                        {success}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Forgot Password Flow */}
                    {mode === 'FORGOT_PASSWORD' ? (
                      <div className="col-span-1 md:col-span-2 space-y-6">
                        {forgotStep === 1 ? (
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600 ml-2">Signal (Email)</label>
                            <div className="relative group">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within:text-neon-cyan transition-colors" size={18} />
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ENTER RECOVERY EMAIL..."
                                className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white font-rajdhani text-xl tracking-widest focus:border-neon-cyan outline-none transition-all placeholder:text-neutral-800"
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600 ml-2">Recovery Code (6-Digit)</label>
                              <div className="relative group">
                                <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within:text-neon-cyan transition-colors" size={18} />
                                <input
                                  type="text"
                                  value={otpCode}
                                  onChange={(e) => setOtpCode(e.target.value)}
                                  placeholder="••••••"
                                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white font-rajdhani text-xl tracking-widest focus:border-neon-cyan outline-none transition-all placeholder:text-neutral-800"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600 ml-2">New Access Code (12+ Alphanumeric)</label>
                              <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within:text-neon-cyan transition-colors" size={18} />
                                <input
                                  type="password"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  placeholder="••••••••••••"
                                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white font-rajdhani text-xl tracking-widest focus:border-neon-cyan outline-none transition-all placeholder:text-neutral-800"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <>
                        {/* Primary Info */}
                        <div className="space-y-6 col-span-1 md:col-span-2">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600 ml-2">
                              {mode === 'SIGN_UP' ? 'Username / Gamer Tag' : 'Email or Username'}
                            </label>
                            <div className="relative group">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within:text-neon-cyan transition-colors" size={18} />
                              <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={mode === 'SIGN_UP' ? 'GamerTag...' : 'Email or Username...'}
                                className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white font-rajdhani text-xl tracking-widest focus:border-neon-cyan outline-none transition-all placeholder:text-neutral-800"
                              />
                            </div>
                          </div>

                          {mode === 'SIGN_UP' && (
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600 ml-2">Email Address</label>
                              <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within:text-neon-cyan transition-colors" size={18} />
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="your@email.com"
                                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white font-rajdhani text-xl tracking-widest focus:border-neon-cyan outline-none transition-all placeholder:text-neutral-800"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Passwords */}
                        <div className={cn("space-y-2", mode === 'SIGN_UP' ? "col-span-1" : "col-span-1 md:col-span-2")}>
                          <div className="flex justify-between items-center ml-2">
                            <label className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600">Password</label>
                            {mode === 'LOGIN' && (
                              <button 
                                type="button" 
                                onClick={() => {
                                  setMode('FORGOT_PASSWORD');
                                  setError(null);
                                  setSuccess(null);
                                }}
                                className="text-[8px] uppercase tracking-[0.2em] font-black text-neon-cyan/50 hover:text-neon-cyan transition-colors"
                              >
                                Forgot Password?
                              </button>
                            )}
                          </div>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within:text-neon-cyan transition-colors" size={18} />
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white font-rajdhani text-xl tracking-widest focus:border-neon-cyan outline-none transition-all placeholder:text-neutral-800"
                            />
                          </div>
                        </div>

                        {mode === 'SIGN_UP' && (
                          <>
                            <div className="space-y-2 col-span-1">
                              <label className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600 ml-2">Confirm Password</label>
                              <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within:text-neon-cyan transition-colors" size={18} />
                                <input
                                  type="password"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  placeholder="••••••••"
                                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white font-rajdhani text-xl tracking-widest focus:border-neon-cyan outline-none transition-all placeholder:text-neutral-800"
                                />
                              </div>
                            </div>
                            <div className="space-y-2 col-span-1">
                              <label className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600 ml-2">Favorite Game / Genre</label>
                              <div className="relative group">
                                <Gamepad2 className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within:text-neon-cyan transition-colors" size={18} />
                                <input
                                  type="text"
                                  value={favoriteGame}
                                  onChange={(e) => setFavoriteGame(e.target.value)}
                                  placeholder="e.g. Valorant / FPS"
                                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white font-rajdhani text-xl tracking-widest focus:border-neon-cyan outline-none transition-all placeholder:text-neutral-800"
                                />
                              </div>
                            </div>
                            <div className="space-y-2 col-span-1">
                              <label className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600 ml-2">Country / Region</label>
                              <div className="relative group">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within:text-neon-cyan transition-colors" size={18} />
                                <input
                                  type="text"
                                  value={region}
                                  onChange={(e) => setRegion(e.target.value)}
                                  placeholder="e.g. NA / Europe"
                                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white font-rajdhani text-xl tracking-widest focus:border-neon-cyan outline-none transition-all placeholder:text-neutral-800"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {/* Checkboxes for Login/Signup */}
                  {mode !== 'FORGOT_PASSWORD' && (
                    <div className="flex flex-col gap-4 py-2">
                      {mode === 'LOGIN' ? (
                        <label className="flex items-center gap-3 cursor-pointer group w-max">
                          <button type="button" onClick={() => setRememberMe(!rememberMe)} className="text-neutral-700 group-hover:text-neon-cyan transition-colors">
                            {rememberMe ? <CheckSquare size={18} className="text-neon-cyan" /> : <Square size={18} />}
                          </button>
                          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-neutral-600 group-hover:text-neutral-400 transition-colors">Remember Me</span>
                        </label>
                      ) : (
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <button type="button" onClick={() => setAgreedToTerms(!agreedToTerms)} className="text-neutral-700 group-hover:text-neon-cyan transition-colors mt-0.5">
                            {agreedToTerms ? <CheckSquare size={18} className="text-neon-cyan" /> : <Square size={18} />}
                          </button>
                          <span className="text-[9px] uppercase tracking-[0.1em] font-bold text-neutral-600 leading-relaxed">
                            I AGREE TO THE <span className="text-white hover:text-neon-cyan transition-colors">TERMS & CONDITIONS</span> AND <span className="text-white hover:text-neon-cyan transition-colors">PRIVACY POLICY</span>
                          </span>
                        </label>
                      )}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="space-y-4 pt-4">
                    <button
                      disabled={isAuthenticating}
                      className="relative w-full group overflow-hidden py-5 bg-white text-black font-black uppercase text-xs tracking-[0.4em] rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                        {isAuthenticating ? (
                          <>
                            {mode === 'SIGN_UP' && 'ENROLLING...'}
                            {mode === 'LOGIN' && 'LOGGING IN...'}
                            {mode === 'FORGOT_PASSWORD' && (forgotStep === 1 ? 'TRANSMITTING...' : 'RESETTING...')}
                          </>
                        ) : (
                          <>
                            {mode === 'SIGN_UP' && 'JOIN PROGAMERX'}
                            {mode === 'LOGIN' && 'LOG IN'}
                            {mode === 'FORGOT_PASSWORD' && (forgotStep === 1 ? 'SEND RECOVERY CODE' : 'RESET ACCESS CODE')}
                            <ChevronRight size={16} />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-neon-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>

                    {mode !== 'FORGOT_PASSWORD' && (
                      <>
                        <div className="flex items-center gap-4 py-2">
                          <div className="h-px flex-1 bg-white/5" />
                          <span className="text-[8px] uppercase tracking-[0.3em] font-black text-neutral-800">Or Connect With</span>
                          <div className="h-px flex-1 bg-white/5" />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <SocialButton icon="google" />
                          <SocialButton icon="discord" />
                          <SocialButton icon="steam" />
                        </div>
                      </>
                    )}
                  </div>
                </form>

                <div className="mt-12 text-center">
                  <button 
                    onClick={() => {
                      if (mode === 'FORGOT_PASSWORD') {
                        setMode('LOGIN');
                        setForgotStep(1);
                      } else {
                        setMode(mode === 'LOGIN' ? 'SIGN_UP' : 'LOGIN');
                      }
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-500 hover:text-neon-cyan transition-colors"
                  >
                    {mode === 'LOGIN' && "New Operative? Join ProGamerX"}
                    {mode === 'SIGN_UP' && 'Already part of the Elite? Log In'}
                    {mode === 'FORGOT_PASSWORD' && 'Back to Tactical Command (Login)'}
                  </button>
                </div>

                <div className="mt-10 flex items-center justify-between opacity-10">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white" />
                  <div className="px-4 text-[7px] uppercase tracking-[0.4em] font-black text-white whitespace-nowrap">Neural Protocol v3.0.4</div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white" />
                </div>
              </div>
            </div>

            {/* Tactical Overlays */}
            <AnimatePresence>
              {isAuthenticating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-black/60 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="relative size-32 mb-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-t-2 border-neon-cyan rounded-full shadow-[0_0_30px_rgba(0,242,255,0.6)]"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-6 border-b-2 border-neon-violet rounded-full opacity-50 shadow-[0_0_20px_rgba(176,38,255,0.4)]"
                    />
                    <Zap className="absolute inset-0 m-auto text-neon-cyan size-12 animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    <div className="text-white font-bebas-neue text-3xl tracking-[0.3em] glow-cyan">
                      {mode === 'SIGN_UP' && 'ESTABLISHING LINK'}
                      {mode === 'LOGIN' && 'ACCESSING CORE'}
                      {mode === 'FORGOT_PASSWORD' && (forgotStep === 1 ? 'ENCRYPTING SIGNAL' : 'REWRITING NEURAL ACCESS')}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.6em] text-neutral-500 font-black">
                      {mode === 'FORGOT_PASSWORD' && forgotStep === 1 ? 'Transmitting recovery sequence...' : 'Decrypting neural signature...'}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

function SocialButton({ icon }: { icon: 'google' | 'discord' | 'steam' }) {
  const icons = {
    google: (
      <svg className="size-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
    discord: (
      <svg className="size-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107a14.314 14.314 0 0 0 1.226 1.994a.075.075 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z" />
      </svg>
    ),
    steam: (
      <svg className="size-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 1a11 11 0 0 0-11 11 11 11 0 0 0 11 11 11 11 0 0 0 11-11A11 11 0 0 0 12 1zm0 2a9 9 0 0 1 8.8 7.15c-.43.15-1 .31-1.6.45-1.27-1.03-2.92-1.6-4.7-1.6a7.5 7.5 0 0 0-7.35 6H7l-3.3 2.15a9 9 0 0 1-.3-1.15c0-.13 0-.25.01-.38A9 9 0 0 1 12 3zm-5.7 13.9 2.8-1.8c.17.43.5.76.9 1a1.9 1.9 0 1 0 1.8-2.6 1.9 1.9 0 0 0-.3.02V13.5c0-.83.67-1.5 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5c0 .83-.67 1.5-1.5 1.5a7.5 7.5 0 0 0-.8.05l2.4 1.7a4.5 4.5 0 1 1-4.2-3.15c.17 0 .34.01.5.03l-2.6-1.85h.05a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 1-.35 0z" />
      </svg>
    )
  };

  return (
    <button
      type="button"
      className="p-4 border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/5 hover:border-neon-cyan/30 transition-all group"
    >
      <div className="group-hover:scale-110 transition-transform">{icons[icon]}</div>
    </button>
  );
}
