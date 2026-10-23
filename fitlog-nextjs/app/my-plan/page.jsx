"use client";
import { useEffect, useMemo, useState } from 'react';
import { Check, Clock3, Flame, SlidersHorizontal, Star, X } from 'lucide-react';
import Link from 'next/link';
import { useWorkout } from '@/context/WorkoutContext';
import { getWorkouts } from '@/lib/api';
import { formatName } from '@/lib/format';

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeSaved, markDone } = useWorkout();
  const [tab, setTab] = useState('plan'); const [workouts, setWorkouts] = useState([]); const [loading, setLoading] = useState(true); const [sort, setSort] = useState('duration');
  useEffect(()=>{let live=true;getWorkouts().then(d=>live&&setWorkouts(d)).catch(()=>{}).finally(()=>live&&setLoading(false));return()=>{live=false}},[]);
  const list = useMemo(()=>{const ids=tab==='plan'?plan:saved;return ids.map(item=>typeof item==='object'?item:workouts.find(w=>String(w.id)===String(item))).filter(Boolean).sort((a,b)=>Number(a?.[sort]||0)-Number(b?.[sort]||0))},[tab,plan,saved,workouts,sort]);
  const minutes=plan.reduce((sum,item)=>sum+Number((typeof item==='object'?item:workouts.find(w=>String(w.id)===String(item)))?.duration||0),0);
  const calories=plan.reduce((sum,item)=>sum+Number((typeof item==='object'?item:workouts.find(w=>String(w.id)===String(item)))?.calories||0),0);
  return <section className="plan-page container"><div className="page-intro"><h1>MY PLAN</h1><p className="muted">Cap of five lifts for today. Finish them, then load more.</p></div>
    <div className="metrics-grid"><Metric title="EXERCISES" value={plan.length} hint="in today's plan"/><Metric title="MINUTES" value={minutes} hint="estimated duration"/><Metric title="CALORIES" value={calories} hint="estimated burn"/></div>
    <div className="plan-toolbar"><div className="tabs"><button className={tab==='plan'?'tab active':'tab'} onClick={()=>setTab('plan')}>Today's Plan <span>{plan.length}</span></button><button className={tab==='saved'?'tab active':'tab'} onClick={()=>setTab('saved')}>Saved <span>{saved.length}</span></button></div><label className="sort-box plan-sort"><SlidersHorizontal size={16}/><span>Sort by</span><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort workouts"><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select></label></div>
    {loading ? <div className="loading-state"><span className="spinner"/>Loading workouts…</div> : list.length ? <div className="plan-list">{list.map(w=><article className="plan-card" key={w.id}><Link href={`/workouts/${w.id}`} className="plan-thumb"><img src={w.image} alt={w.name}/></Link><div className="plan-card-main"><Link className="plan-card-title" href={`/workouts/${w.id}`}>{formatName(w.name)}</Link><p className="muted small">{w.equipment}</p><div className="stats-row"><span><Clock3/>{w.duration} min</span><span><Flame/>{w.calories} kcal</span><span><Star/>{w.rating}</span></div></div><div className="plan-card-actions"><Link className="button button-secondary" href={`/workouts/${w.id}`}>View Details</Link>{tab==='plan'&&<button className="button button-primary" onClick={()=>markDone(w)}> <Check size={15}/> Mark as Done</button>}<button className="icon-button danger" title="Remove" aria-label="Remove workout" onClick={()=>tab==='plan'?removeFromPlan(w.id):removeSaved(w.id)}><X size={18}/></button></div></article>)}</div> : <div className="empty-state"><div className="empty-mark">✳</div><p className="eyebrow">READY WHEN YOU ARE</p><h2>NOTHING HERE YET</h2><p className="muted">Browse the library and add a lift to get today moving.</p><Link className="button button-primary" href="/">Go to workouts</Link></div>}
  </section>;
}
function Metric({title,value,hint}) { return <div className="metric-card"><p>{title}</p><strong>{value}</strong><span>{hint}</span></div>; }
