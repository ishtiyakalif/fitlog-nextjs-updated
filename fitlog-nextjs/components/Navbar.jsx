"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell } from 'lucide-react';
import { useWorkout } from '@/context/WorkoutContext';
export default function Navbar(){const path=usePathname();const {plan,saved}=useWorkout();return <header className="navbar"><Link href="/" className="brand"><Dumbbell size={23} strokeWidth={2.8}/><span>FITLOG</span></Link><nav className="nav-links"><Link className={path==='/'?'nav-link active':'nav-link'} href="/">Workouts</Link><Link className={path.startsWith('/my-plan')?'nav-link active':'nav-link'} href="/my-plan">My Plan</Link></nav><div className="nav-status"><Link href="/my-plan" className="status-link">Plan <span className="counter counter-filled">{plan.length}</span></Link><Link href="/my-plan?tab=saved" className="status-link">Saved <span className="counter">{saved.length}</span></Link></div></header>}
