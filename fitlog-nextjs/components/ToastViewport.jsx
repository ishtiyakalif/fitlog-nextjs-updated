"use client";
import { CheckCircle2, Info, X } from 'lucide-react';
import { useWorkout } from '@/context/WorkoutContext';
export default function ToastViewport(){const {toast,dismissToast}=useWorkout();if(!toast)return null;return <div className="toast" role="status"><CheckCircle2 size={19}/><span>{toast.message}</span><button aria-label="Dismiss notification" onClick={dismissToast}><X size={16}/></button></div>}
