"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Bookmark, CalendarPlus, Clock3, Flame, Star, ArrowLeft } from 'lucide-react';
import { getWorkoutById, getWorkouts } from '@/lib/api';
import { useWorkout } from '@/context/WorkoutContext';
import { formatName } from '@/lib/format';

export default function WorkoutDetailPage() {
 const params=useParams(); const router=useRouter(); const {addToPlan,addSaved,plan}=useWorkout(); const [workout,setWorkout]=useState(null); const [loading,setLoading]=useState(true); const [error,setError]=useState(false);
 useEffect(()=>{let live=true; (async()=>{try{let item=await getWorkoutById(params.id); if(!item) item=(await getWorkouts()).find(w=>String(w.id)===String(params.id)); if(live)setWorkout(item||null);}catch(e){if(live)setError(true)}finally{if(live)setLoading(false)}})();return()=>{live=false}},[params.id]);
 if(loading)return <div className="loading-state detail-loading"><span className="spinner"/>Loading workout…</div>;
 if(error||!workout)return <div className="not-found container"><p className="eyebrow">404 / WORKOUT NOT FOUND</p><h1>THAT LIFT ISN'T HERE.</h1><Link className="button button-primary" href="/">Back to library</Link></div>;
 const instructions=workout.instructions?.length?workout.instructions:[`Set up your ${workout.equipment.toLowerCase()} with a stable, controlled position.`,`Brace your core and move through a comfortable range of motion.`,`Perform each repetition slowly without bouncing or rushing.`,`Return to the starting position and reset before the next rep.`];
 return <section className="detail-page container"><Link href="/" className="back-link"><ArrowLeft size={16}/> Back to library</Link><div className="detail-layout"><div className="detail-image"><img src={workout.image} alt={workout.name}/></div><div className="detail-content"><h1>{formatName(workout.name)}</h1><p className="detail-description">{workout.description}</p><div className="tag-row detail-tags">{workout.categories.map(c=><span className="tag" key={c}>{c}</span>)}</div><div className="spec-panel">{[['EQUIPMENT',workout.equipment],['DIFFICULTY',workout.difficulty],['SETS',workout.sets],['REPS',workout.reps],['DURATION',`${workout.duration} min`],['CALORIES',`${workout.calories} kcal`],['RATING',workout.rating]].map(([label,value])=><div className="spec-row" key={label}><span>{label}</span><strong>{value||'—'}</strong></div>)}</div><div className="instructions"><h2>INSTRUCTIONS</h2><ol>{instructions.slice(0,4).map((step,i)=><li key={i}>{step}</li>)}</ol></div><div className="detail-actions"><button className="button button-primary" disabled={plan.some(w=>String(w.id)===String(workout.id))||plan.length>=5} onClick={()=>addToPlan(workout)}><CalendarPlus size={17}/>{plan.some(w=>String(w.id)===String(workout.id))?'Already in today’s plan':plan.length>=5?'Plan is full':"Add to today's plan"}</button><button className="button button-secondary" onClick={()=>addSaved(workout)}><Bookmark size={17}/>Save for later</button></div>{plan.length>=5&&!plan.some(w=>String(w.id)===String(workout.id))&&<p className="muted small">Today's plan is full. Remove a lift before adding another.</p>}</div></div></section>;
}
