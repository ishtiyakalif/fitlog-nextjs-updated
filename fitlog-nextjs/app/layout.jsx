import './globals.css';
import { WorkoutProvider } from '@/context/WorkoutContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastViewport from '@/components/ToastViewport';

export const metadata = { title: 'FitLog — Workout Library', description: 'Train with intent. Log every set.' };

export default function RootLayout({ children }) {
  return <html lang="en"><body><WorkoutProvider><Navbar /><main className="site-main">{children}</main><Footer /><ToastViewport /></WorkoutProvider></body></html>;
}
