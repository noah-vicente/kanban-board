'use client'

import TaskCard from '@/components/TaskCard'

import Column from '@/components/Column'

export default function Home() {
  return (
    <div className='p-10'>
      <Column
        title="To Do"
        tasks={[
          {
            id: '1',
            title: 'Fix login bug',
            description: 'Users are getting logged out unexpectedly',
            status: 'todo',
            priority: 'high',
            label: 'Bug',
            due_date: '2026-05-20',
            user_id: 'abc',
            created_at: '2026-05-18'
          },
          {
            id: '2',
            title: 'Design new homepage',
            status: 'todo',
            priority: 'normal',
            user_id: 'abc',
            created_at: '2026-05-18'
          }
        ]}
        onAddTask={() => {}}
      />
    </div>
  )
}