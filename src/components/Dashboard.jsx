import { useState } from 'react'
import AscentMark from './AscentMark'

const navItems = ['Home', 'Workouts', 'Progress', 'Achievements']

const quests = [
  { title: 'Complete one workout', detail: 'Any training session counts', reward: '+35 EXP', icon: 'bolt', complete: false },
  { title: 'Walk 5,000 steps', detail: '0 / 5,000 steps today', reward: '+20 EXP', icon: 'steps', complete: false },
  { title: 'Log eight hours of sleep', detail: 'Recovery makes the work count', reward: '+15 EXP', icon: 'moon', complete: false },
]

const workouts = [
  { name: 'Strength', description: 'Build power', icon: 'barbell', accent: 'violet' },
  { name: 'Cardio', description: 'Raise the pace', icon: 'pulse', accent: 'pink' },
  { name: 'Mobility', description: 'Move freely', icon: 'move', accent: 'blue' },
  { name: 'Full Body', description: 'Train it all', icon: 'body', accent: 'orange' },
  { name: 'Beginner', description: 'Start strong', icon: 'spark', accent: 'green' },
  { name: 'Custom', description: 'Make it yours', icon: 'plus', accent: 'purple' },
]

const activity = [
  { day: 'M', level: 42 },
  { day: 'T', level: 72 },
  { day: 'W', level: 30 },
  { day: 'T', level: 86 },
  { day: 'F', level: 58 },
  { day: 'S', level: 90 },
  { day: 'S', level: 45 },
]

function Icon({ name, size = 20 }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 1.8 }
  const paths = {
    bolt: <path {...common} d="m13 2-8 11h6l-1 9 8-12h-6l1-8Z" />,
    steps: <><path {...common} d="M4 18h5v-5h5V8h6" /><path {...common} d="M6 6h.01M18 18h.01" strokeWidth="4" /></>,
    moon: <path {...common} d="M20 15.4A8.5 8.5 0 0 1 8.6 4 8.5 8.5 0 1 0 20 15.4Z" />,
    barbell: <><path {...common} d="M7 8v8M4 10v4M17 8v8M20 10v4M7 12h10" /></>,
    pulse: <path {...common} d="M2 12h4l2.1-5 4 10 2.1-5H22" />,
    move: <><path {...common} d="m12 3 3 3-3 3M12 21l-3-3 3-3M3 12l3-3 3 3M21 12l-3 3-3-3" /><path {...common} d="M5 12h14M12 5v14" /></>,
    body: <><circle {...common} cx="12" cy="5" r="2" /><path {...common} d="M8 21 10 13l-4-3 2-3 4 2 4-2 2 3-4 3 2 8M12 9v4" /></>,
    spark: <path {...common} d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" />,
    plus: <path {...common} d="M12 5v14M5 12h14" />,
    flame: <path {...common} d="M12.5 2.5c1 4.1-2.7 5.4-.9 8.2.8 1.3 2.5 1.1 3.2-.1.8-1.5.3-3 .3-3 4.2 3.1 4.3 9.8.3 12.5-3.9 2.7-9.5.3-9.5-4.7 0-3.6 2.2-5.8 4.6-8.7.1 2 1.5 2.7 2 2.5.8-.3.6-2.7 0-6.7Z" />,
    trophy: <><path {...common} d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 21h8M9 17h6" /></>,
    trend: <><path {...common} d="m4 16 5-5 3 3 7-8" /><path {...common} d="M14 6h5v5" /></>,
    check: <path {...common} d="m5 12 4 4L19 6" />,
    logout: <><path {...common} d="M10 5H5v14h5M14 8l4 4-4 4M9 12h9" /></>,
    menu: <path {...common} d="M4 7h16M4 12h16M4 17h16" />,
    arrow: <path {...common} d="M5 12h14m-5-5 5 5-5 5" />,
  }

  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

function DashboardNav({ activeSection, onNavigate, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = (section) => {
    onNavigate(section)
    setMenuOpen(false)
  }

  return (
    <header className="dashboard-nav">
      <button className="dashboard-brand" type="button" onClick={() => navigate('Home')} aria-label="Ascend home">
        <span className="brand__mark"><AscentMark compact /></span>
        <span>ASCEND</span>
      </button>
      <button className="nav-menu-button" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span className="visually-hidden">Toggle navigation</span>
        <Icon name="menu" />
      </button>
      <nav id="primary-navigation" className={menuOpen ? 'dashboard-nav__links dashboard-nav__links--open' : 'dashboard-nav__links'} aria-label="Primary navigation">
        {navItems.map((item) => (
          <button key={item} type="button" className={activeSection === item ? 'is-active' : ''} onClick={() => navigate(item)}>{item}</button>
        ))}
        <button className="nav-sign-out" type="button" onClick={onSignOut}><Icon name="logout" size={17} />Sign Out</button>
      </nav>
    </header>
  )
}

function RankCard() {
  return (
    <article className="rank-card dashboard-card">
      <div className="rank-card__heading">
        <div><p className="section-kicker">Your current standing</p><h2>Rank <span>E</span></h2></div>
        <div className="rank-emblem" aria-label="Rank E">E</div>
      </div>
      <div className="rank-level-row"><span>Level 1</span><span>0 / 100 EXP</span></div>
      <div className="experience-bar" aria-label="0 of 100 experience points"><span></span></div>
      <p className="rank-card__copy">Start your first streak. Every small action moves you forward.</p>
    </article>
  )
}

function StreakCard() {
  return (
    <article className="streak-card dashboard-card">
      <div className="streak-card__icon"><Icon name="flame" size={25} /></div>
      <div><p className="section-kicker">Current streak</p><strong>0 <span>days</span></strong><p>Begin today. Keep it alive tomorrow.</p></div>
      <div className="streak-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
    </article>
  )
}

function QuestList() {
  return (
    <section className="quests-section" id="quests">
      <div className="section-heading"><div><p className="section-kicker">One step at a time</p><h2>Today&apos;s Quests</h2></div><span className="section-heading__date">DAY 01</span></div>
      <div className="quest-list">
        {quests.map((quest) => (
          <article className="quest-row" key={quest.title}>
            <span className="quest-row__icon"><Icon name={quest.icon} /></span>
            <div className="quest-row__copy"><h3>{quest.title}</h3><p>{quest.detail}</p></div>
            <span className="quest-row__reward">{quest.reward}</span>
            <span className={quest.complete ? 'quest-row__check quest-row__check--complete' : 'quest-row__check'} aria-label={quest.complete ? 'Complete' : 'Not complete'}>{quest.complete && <Icon name="check" size={14} />}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function WorkoutCategories() {
  return (
    <section className="workout-section" id="workouts">
      <div className="section-heading section-heading--workouts"><div><p className="section-kicker">Pick your next session</p><h2>Train Your Way</h2></div><button className="text-button" type="button">View all <Icon name="arrow" size={16} /></button></div>
      <div className="workout-grid">
        {workouts.map((workout) => (
          <button className={`workout-card workout-card--${workout.accent}`} key={workout.name} type="button">
            <span className="workout-card__icon"><Icon name={workout.icon} size={23} /></span>
            <span className="workout-card__content"><strong>{workout.name}</strong><small>{workout.description}</small></span>
            <Icon name="arrow" size={17} />
          </button>
        ))}
      </div>
    </section>
  )
}

function RankProgress() {
  return (
    <article className="rank-progress dashboard-card" id="progress">
      <div className="rank-progress__topline"><span className="rank-progress__icon"><Icon name="trend" /></span><p className="section-kicker">Rank progress</p></div>
      <h2>Earn EXP. Rise through the ranks.</h2>
      <p>Daily activities build your EXP. Finish a separate rank challenge when you are ready to advance from Rank E to Rank D.</p>
      <div className="rank-path" aria-label="Rank E advances to rank D after a challenge"><span className="rank-path__rank rank-path__rank--current">E</span><span className="rank-path__line"><i></i></span><span className="rank-path__rank">D</span></div>
      <button className="outline-button" type="button">View rank challenge <Icon name="arrow" size={16} /></button>
    </article>
  )
}

function WeeklyActivity() {
  return (
    <article className="weekly-activity dashboard-card">
      <div className="section-heading"><div><p className="section-kicker">This week</p><h2>Activity</h2></div><span className="activity-total">0 <small>workouts</small></span></div>
      <div className="activity-chart" aria-label="Sample weekly activity chart">
        {activity.map((item, index) => (<div className={index === 5 ? 'activity-chart__day activity-chart__day--highlight' : 'activity-chart__day'} key={`${item.day}-${index}`}><span style={{ height: `${item.level}%` }}></span><small>{item.day}</small></div>))}
      </div>
    </article>
  )
}

function LatestAchievement() {
  return (
    <article className="achievement-card dashboard-card" id="achievements">
      <span className="achievement-card__sparkle"><Icon name="spark" size={15} /></span>
      <span className="achievement-card__icon"><Icon name="trophy" size={28} /></span>
      <div><p className="section-kicker">Latest achievement</p><h2>First Step</h2><p>Complete your first workout to unlock this badge.</p></div>
      <button type="button" aria-label="View achievements"><Icon name="arrow" size={18} /></button>
    </article>
  )
}

export default function Dashboard({ onSignOut }) {
  const [activeSection, setActiveSection] = useState('Home')
  const navigate = (section) => {
    setActiveSection(section)
    const target = section === 'Home' ? 'home' : section.toLowerCase()
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="dashboard-page" id="home">
      <DashboardNav activeSection={activeSection} onNavigate={navigate} onSignOut={onSignOut} />
      <main className="dashboard-main">
        <section className="dashboard-hero" aria-labelledby="welcome-heading">
          <div><p className="section-kicker">Saturday, October 10</p><h1 id="welcome-heading">Welcome back, <span>Hunter.</span></h1><p>Every rep is a vote for the person you are becoming.</p></div>
          <button className="start-workout-button" type="button"><Icon name="bolt" size={19} /> Start Workout <Icon name="arrow" size={18} /></button>
        </section>
        <section className="dashboard-overview" aria-label="Current progress overview"><RankCard /><StreakCard /></section>
        <QuestList />
        <WorkoutCategories />
        <section className="dashboard-lower-grid"><RankProgress /><div className="dashboard-lower-grid__side"><WeeklyActivity /><LatestAchievement /></div></section>
      </main>
    </div>
  )
}
