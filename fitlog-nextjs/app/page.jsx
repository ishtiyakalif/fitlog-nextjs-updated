"use client";
import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import Hero from '@/components/Hero';
import WorkoutCard from '@/components/WorkoutCard';
import { getWorkouts } from '@/lib/api';

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { let live = true; getWorkouts().then(data => { if (live) setWorkouts(data); }).catch(() => { if (live) setError('Could not load workouts. Please try again.'); }).finally(() => { if (live) setLoading(false); }); return () => { live = false; }; }, []);
  const shown = workouts;
  return <><Hero /><section id="library" className="library-section container"><div className="section-heading"><div><h2>THE LIBRARY</h2><p className="muted">Twelve lifts covering every major muscle group.</p></div><a className="text-link" href="#library">Explore library <ArrowDown size={15}/></a></div>
    {loading ? <div className="loading-state"><span className="spinner"/>Loading workouts…</div> : error ? <div className="notice">{error} <button className="button button-secondary" onClick={()=>location.reload()}>Retry</button></div> : shown.length ? <div className="workout-grid">{shown.map(w=><WorkoutCard key={w.id} workout={w}/>)}</div> : <div className="empty-inline"><h3>NO WORKOUTS AVAILABLE</h3><p className="muted">Please try again in a moment.</p></div>}
  </section></>;
}
