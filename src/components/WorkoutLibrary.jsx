import { useState } from 'react'
import AscentMark from './AscentMark'
import WorkoutDetailModal from './WorkoutDetailModal'
import { workoutCategories, workouts } from '../data/workouts'

function WorkoutNavigation({ onNavigateHome, onSignOut }) {
  return (
    <header className="dashboard-nav workout-library__nav">
      <button className="dashboard-brand" type="button" onClick={onNavigateHome} aria-label="Ascend home">
        <span className="brand__mark"><AscentMark compact /></span>
        <span>ASCEND</span>
      </button>
      <nav className="workout-library__nav-links" aria-label="Primary navigation">
        <button type="button" onClick={onNavigateHome}>Home</button>
        <button type="button" className="is-active" aria-current="page">Workouts</button>
        <button className="nav-sign-out" type="button" onClick={onSignOut}>Sign Out</button>
      </nav>
    </header>
  )
}

function WorkoutFilters({ search, onSearchChange, category, onCategoryChange }) {
  return (
    <div className="workout-filters">
      <label className="workout-search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.5 4.5" />
        </svg>
        <span className="visually-hidden">Search workouts by name</span>
        <input
          type="search"
          placeholder="Search workouts..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="workout-categories" role="group" aria-label="Filter workouts by category">
        {workoutCategories.map((item) => (
          <button
            key={item}
            type="button"
            className={category === item ? 'is-active' : ''}
            aria-pressed={category === item}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

function WorkoutCard({ workout, onViewPlan }) {
  return (
    <article className="library-workout-card">
      <div className="library-workout-card__top">
        <span className="library-workout-card__category">{workout.category}</span>
        <span className="library-workout-card__reward">+{workout.exp} EXP</span>
      </div>
      <h3>{workout.name}</h3>
      <div className="library-workout-card__stats" aria-label="Workout details">
        <span><strong>Difficulty</strong>{workout.difficulty}</span>
        <span><strong>Duration</strong>{workout.duration} min</span>
        <span><strong>Exercises</strong>{workout.exercises.length}</span>
        <span className="library-workout-card__equipment"><strong>Equipment</strong>{workout.equipment}</span>
      </div>
      <button className="library-workout-card__button" type="button" onClick={() => onViewPlan(workout)}>
        View Plan <span aria-hidden="true">-&gt;</span>
      </button>
    </article>
  )
}

function WorkoutGrid({ items, onViewPlan }) {
  return (
    <div className="library-workout-grid">
      {items.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} onViewPlan={onViewPlan} />
      ))}
    </div>
  )
}

export default function WorkoutLibrary({ onNavigateHome, onSignOut }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const normalizedSearch = search.trim().toLowerCase()

  const matchingWorkouts = workouts.filter((workout) => {
    const matchesName = workout.name.toLowerCase().includes(normalizedSearch)
    const matchesCategory = category === 'All' || workout.category === category
    return matchesName && matchesCategory
  })
  const recommendedWorkouts = matchingWorkouts
    .filter((workout) => workout.difficulty === 'Beginner')
    .slice(0, 3)

  const resetFilters = () => {
    setSearch('')
    setCategory('All')
  }

  return (
    <div className="dashboard-page workout-library">
      <WorkoutNavigation onNavigateHome={onNavigateHome} onSignOut={onSignOut} />
      <main className="dashboard-main workout-library__main">
        <section className="workout-library__hero" aria-labelledby="workout-library-title">
          <p className="section-kicker">Find your next session</p>
          <h1 id="workout-library-title">Choose Your Next Quest.</h1>
          <p>Explore the training plans, pick a pace that feels right, and take the next step.</p>
        </section>

        <WorkoutFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
        />

        {matchingWorkouts.length > 0 ? (
          <>
            {recommendedWorkouts.length > 0 && (
              <section className="workout-library__section" aria-labelledby="recommended-title">
                <div className="workout-library__section-heading">
                  <div>
                    <p className="section-kicker">A strong place to start</p>
                    <h2 id="recommended-title">Recommended for Rank E</h2>
                  </div>
                  <span className="workout-library__rank">RANK E</span>
                </div>
                <WorkoutGrid items={recommendedWorkouts} onViewPlan={setSelectedWorkout} />
              </section>
            )}
            <section className="workout-library__section" aria-labelledby="all-workouts-title">
              <div className="workout-library__section-heading">
                <div>
                  <p className="section-kicker">The complete collection</p>
                  <h2 id="all-workouts-title">All Workouts <span>({matchingWorkouts.length})</span></h2>
                </div>
              </div>
              <WorkoutGrid items={matchingWorkouts} onViewPlan={setSelectedWorkout} />
            </section>
          </>
        ) : (
          <section className="workout-library__empty" aria-live="polite">
            <span className="workout-library__empty-mark" aria-hidden="true">?</span>
            <h2>No quests found</h2>
            <p>Try another workout name or category, and your next session will show up here.</p>
            <button type="button" onClick={resetFilters}>Reset Filters</button>
          </section>
        )}
      </main>
      {selectedWorkout && (
        <WorkoutDetailModal
          workout={selectedWorkout}
          onClose={() => setSelectedWorkout(null)}
        />
      )}
    </div>
  )
}
