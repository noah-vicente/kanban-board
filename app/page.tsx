import TaskCard from '@/components/TaskCard'

export default function Home() {
  return (
    <div className='p-10 w-100'>
      <TaskCard task={{
        id: '1',
        title: 'Fix login bug',
        description: 'Users are getting logged out unexpectedly',
        status: 'todo',
        priority: 'low',
        label: 'Bug',
        due_date: '2026-05-20',
        user_id: 'abc',
        created_at: '2026-05-18'
      }} />
    </div>
  )
}