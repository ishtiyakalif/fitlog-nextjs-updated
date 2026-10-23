"use client";
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
const WorkoutContext=createContext(null); const PLAN_KEY='fitlog-plan-v1'; const SAVED_KEY='fitlog-saved-v1';
export function WorkoutProvider({children}){const [plan,setPlan]=useState([]);const [saved,setSaved]=useState([]);const [hydrated,setHydrated]=useState(false);const [toast,setToast]=useState(null);
 useEffect(()=>{try{const p=JSON.parse(localStorage.getItem(PLAN_KEY)||'[]');const s=JSON.parse(localStorage.getItem(SAVED_KEY)||'[]');setPlan(Array.isArray(p)?p:[]);setSaved(Array.isArray(s)?s:[])}catch{}setHydrated(true)},[]);
 useEffect(()=>{if(hydrated)localStorage.setItem(PLAN_KEY,JSON.stringify(plan))},[plan,hydrated]);useEffect(()=>{if(hydrated)localStorage.setItem(SAVED_KEY,JSON.stringify(saved))},[saved,hydrated]);
 const notify=useCallback(message=>{setToast({message,id:Date.now()});setTimeout(()=>setToast(null),2800)},[]);const dismissToast=()=>setToast(null);
 const addToPlan=workout=>{if(plan.some(w=>String(w.id)===String(workout.id))){notify('This workout is already in today’s plan.');return}if(plan.length>=5){notify('Today’s plan is limited to five lifts.');return}setPlan(p=>[...p,workout]);notify('Added to today’s plan.');};
 const addSaved=workout=>{if(saved.some(w=>String(w.id)===String(workout.id))){notify('This workout is already saved.');return}setSaved(s=>[...s,workout]);notify('Workout saved for later.');};
 const removeFromPlan=id=>{setPlan(p=>p.filter(w=>String(w.id)!==String(id)));notify('Removed from today’s plan.');};const removeSaved=id=>{setSaved(s=>s.filter(w=>String(w.id)!==String(id)));notify('Removed from saved workouts.');};const markDone=workout=>{setPlan(p=>p.filter(w=>String(w.id)!==String(workout.id)));notify(`${workout.name} marked as done.`)};
 return <WorkoutContext.Provider value={{plan,saved,toast,addToPlan,addSaved,removeFromPlan,removeSaved,markDone,dismissToast,notify}}>{children}</WorkoutContext.Provider>}
export function useWorkout(){const value=useContext(WorkoutContext);if(!value)throw new Error('useWorkout must be used within WorkoutProvider');return value}
