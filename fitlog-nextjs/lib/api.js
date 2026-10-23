const API_URLS = [
  process.env.NEXT_PUBLIC_FITLOG_API,
  'https://api.abcz.workers.dev/api/fitlog',
  'https://api.api-store.workers.dev/api/fitlog',
].filter(Boolean);

const fallbackImage = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85';

// Local sample library keeps the page useful even if either workout API is down
// or returns an unexpected response shape.
const sampleWorkouts = [
  { id: 'sample-push-ups', name: 'Push-Ups', description: 'A classic bodyweight movement for building chest, shoulder and triceps strength.', image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=85', categories: ['Chest', 'Triceps'], equipment: 'Bodyweight', difficulty: 'Beginner', sets: 3, reps: '10-15', duration: 10, calories: 70, rating: 4.8, instructions: ['Start in a high plank with hands just wider than shoulders.', 'Keep your core braced and body in a straight line.', 'Lower your chest with control, then press back up.'] },
  { id: 'sample-dumbbell-press', name: 'Dumbbell Bench Press', description: 'A controlled pressing exercise that targets the chest, shoulders and triceps.', image: 'https://images.unsplash.com/photo-1534368270820-9de3d8053204?auto=format&fit=crop&w=1000&q=85', categories: ['Chest', 'Shoulders'], equipment: 'Dumbbells, bench', difficulty: 'Intermediate', sets: 4, reps: '8-12', duration: 15, calories: 110, rating: 4.9 },
  { id: 'sample-squats', name: 'Bodyweight Squats', description: 'Build lower-body strength and mobility with a simple, equipment-free squat.', image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=1000&q=85', categories: ['Legs', 'Glutes'], equipment: 'Bodyweight', difficulty: 'Beginner', sets: 3, reps: '12-15', duration: 10, calories: 85, rating: 4.7 },
  { id: 'sample-deadlift', name: 'Dumbbell Deadlift', description: 'Train the posterior chain with a hip hinge that strengthens glutes, hamstrings and back.', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=85', categories: ['Back', 'Glutes'], equipment: 'Dumbbells', difficulty: 'Intermediate', sets: 4, reps: '8-10', duration: 15, calories: 130, rating: 4.8 },
  { id: 'sample-plank', name: 'Forearm Plank', description: 'Build core stability by maintaining a strong, aligned position under tension.', image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=1000&q=85', categories: ['Core', 'Abs'], equipment: 'Bodyweight', difficulty: 'Beginner', sets: 3, reps: '30-45 sec', duration: 6, calories: 35, rating: 4.6 },
  { id: 'sample-lunges', name: 'Alternating Lunges', description: 'Improve single-leg strength, balance and coordination with alternating forward lunges.', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85', categories: ['Legs', 'Glutes'], equipment: 'Bodyweight', difficulty: 'Beginner', sets: 3, reps: '10 each side', duration: 12, calories: 90, rating: 4.7 },
  { id: 'sample-lat-pulldown', name: 'Lat Pulldown', description: 'A vertical pulling movement for the lats and upper back, with a focus on controlled reps.', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85', categories: ['Back', 'Biceps'], equipment: 'Cable machine', difficulty: 'Beginner', sets: 3, reps: '10-12', duration: 12, calories: 95, rating: 4.8 },
  { id: 'sample-shoulder-press', name: 'Dumbbell Shoulder Press', description: 'Press dumbbells overhead to develop shoulder strength and upper-body stability.', image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1000&q=85', categories: ['Shoulders', 'Triceps'], equipment: 'Dumbbells', difficulty: 'Intermediate', sets: 3, reps: '8-12', duration: 12, calories: 90, rating: 4.7 },
  { id: 'sample-bicep-curls', name: 'Bicep Curls', description: 'Isolate the biceps with steady repetitions and minimal upper-body movement.', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=85', categories: ['Biceps', 'Arms'], equipment: 'Dumbbells', difficulty: 'Beginner', sets: 3, reps: '10-12', duration: 8, calories: 55, rating: 4.6 },
  { id: 'sample-tricep-pushdown', name: 'Triceps Pushdown', description: 'Strengthen the back of the arms while keeping elbows close to your sides.', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85', categories: ['Triceps', 'Arms'], equipment: 'Cable machine', difficulty: 'Beginner', sets: 3, reps: '10-15', duration: 8, calories: 55, rating: 4.6 },
  { id: 'sample-mountain-climbers', name: 'Mountain Climbers', description: 'A dynamic bodyweight drill that combines core engagement and cardio conditioning.', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85', categories: ['Core', 'Cardio'], equipment: 'Bodyweight', difficulty: 'Intermediate', sets: 3, reps: '30 sec', duration: 8, calories: 100, rating: 4.7 },
  { id: 'sample-glute-bridge', name: 'Glute Bridges', description: 'Activate and strengthen the glutes with a controlled hip-extension movement.', image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=1000&q=85', categories: ['Glutes', 'Legs'], equipment: 'Bodyweight', difficulty: 'Beginner', sets: 3, reps: '12-15', duration: 8, calories: 60, rating: 4.7 },
];

function pick(obj, keys, fallback) {
  for (const key of keys) if (obj?.[key] !== undefined && obj?.[key] !== null && obj[key] !== '') return obj[key];
  return fallback;
}
function pickArray(obj, keys) {
  for (const key of keys) {
    const value = obj?.[key];
    if (Array.isArray(value)) return value.map(v => String(typeof v === 'object' ? (v?.name || v?.title || '') : v)).filter(Boolean);
    if (typeof value === 'string' && value.trim()) return value.split(/[,|]/).map(s => s.trim()).filter(Boolean);
  }
  return [];
}
function arrayFrom(payload) {
  if (Array.isArray(payload)) return payload;
  for (const key of ['data', 'workouts', 'exercises', 'results', 'items']) {
    if (Array.isArray(payload?.[key])) return payload[key];
    if (Array.isArray(payload?.data?.[key])) return payload.data[key];
  }
  return [];
}
function normalize(raw, index = 0) {
  const categories = pickArray(raw, ['categories', 'category', 'muscleGroups', 'muscle_groups', 'muscles', 'tags']);
  const instructions = pickArray(raw, ['instructions', 'steps', 'howTo', 'how_to']);
  const image = pick(raw, ['image', 'imageUrl', 'image_url', 'thumbnail', 'thumbnailUrl', 'photo', 'img'], fallbackImage);
  return {
    id: String(pick(raw, ['id', '_id', 'workoutId', 'workout_id', 'slug'], index + 1)),
    name: String(pick(raw, ['name', 'title', 'workoutName', 'workout_name', 'exercise'], `Workout ${index + 1}`)),
    description: String(pick(raw, ['description', 'details', 'summary'], 'A focused movement to help you train with control, consistency, and intent.')),
    image: typeof image === 'string' ? image : fallbackImage,
    categories: categories.length ? categories : ['Strength'],
    equipment: String(pick(raw, ['equipment', 'equipmentName', 'equipment_name'], 'Bodyweight')),
    difficulty: String(pick(raw, ['difficulty', 'level'], 'Intermediate')),
    sets: pick(raw, ['sets', 'setCount', 'set_count'], 4),
    reps: pick(raw, ['reps', 'repetitions'], '8-12'),
    duration: Number(pick(raw, ['duration', 'durationMinutes', 'duration_minutes', 'minutes', 'time'], 20)) || 20,
    calories: Number(pick(raw, ['calories', 'kcal', 'calorieBurn'], 120)) || 120,
    rating: Number(pick(raw, ['rating', 'rate', 'score'], 4.7)) || 4.7,
    instructions: instructions.map(x => typeof x === 'string' ? x : (x?.text || x?.instruction || String(x))),
  };
}

export async function getWorkouts() {
  for (const base of API_URLS) {
    try {
      const response = await fetch(base, { cache: 'no-store' });
      if (!response.ok) continue;
      const payload = await response.json();
      const data = arrayFrom(payload);
      if (data.length) return data.map(normalize);
    } catch {
      // Try the next API, then use the local sample library.
    }
  }
  return sampleWorkouts;
}

export async function getWorkoutById(id) {
  for (const base of API_URLS) {
    try {
      const response = await fetch(`${base}/${encodeURIComponent(id)}`, { cache: 'no-store' });
      if (!response.ok) continue;
      const payload = await response.json();
      const raw = payload?.data || payload?.workout || payload?.exercise || payload;
      if (raw && typeof raw === 'object' && !Array.isArray(raw)) return normalize(raw);
    } catch {
      // Try the next API or local data.
    }
  }
  return sampleWorkouts.find(workout => String(workout.id) === String(id)) || null;
}
