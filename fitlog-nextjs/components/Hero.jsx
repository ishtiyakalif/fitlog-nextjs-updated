import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <p className="eyebrow">WORKOUT LIBRARY</p>
        <h1>TRAIN WITH INTENT.<br />LOG EVERY SET.</h1>
        <p className="hero-description">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today's plan, and watch the week's work add up.
        </p>
        <a href="#library" className="button button-primary">
          BROWSE WORKOUTS <ArrowRight size={16} />
        </a>
      </div>

      <div className="hero-visual">
        <img
          className="hero-exercise-image"
          src="/hero-exercise.png"
          alt="An anatomical figure exercising on a gym machine"
        />
      </div>
    </section>
  );
}
