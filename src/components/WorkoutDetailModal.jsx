import { useEffect, useRef } from 'react'

export default function WorkoutDetailModal({ workout, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="workout-detail"
      aria-labelledby="workout-detail-title"
      aria-describedby="workout-detail-description"
      onClose={onClose}
    >
      <div className="workout-detail__header">
        <div>
          <p className="section-kicker">{workout.category} quest</p>
          <h2 id="workout-detail-title">{workout.name}</h2>
        </div>
        <button className="workout-detail__close" type="button" aria-label="Close workout plan" onClick={() => dialogRef.current?.close()}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <p id="workout-detail-description" className="workout-detail__description">{workout.description}</p>

      <div className="workout-detail__summary">
        <span><strong>Total duration</strong>{workout.duration} min</span>
        <span><strong>EXP reward</strong>+{workout.exp} EXP</span>
        <span><strong>Equipment</strong>{workout.equipment}</span>
      </div>

      <section className="workout-detail__warmup" aria-labelledby="warmup-title">
        <p className="section-kicker">Get ready</p>
        <h3 id="warmup-title">Warm-up</h3>
        <p>{workout.warmUp}</p>
      </section>

      <section className="workout-detail__plan" aria-labelledby="exercise-list-title">
        <div className="workout-detail__plan-heading">
          <h3 id="exercise-list-title">Exercise plan</h3>
          <span>{workout.exercises.length} exercises</span>
        </div>
        <ol>
          {workout.exercises.map((exercise) => (
            <li key={exercise.name}>
              <div>
                <strong>{exercise.name}</strong>
                <span>{exercise.prescription}</span>
              </div>
              <span className="workout-detail__rest"><strong>Rest</strong>{exercise.rest}</span>
            </li>
          ))}
        </ol>
      </section>
    </dialog>
  )
}
