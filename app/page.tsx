'use client'

import { useState } from 'react'
import Column from '@/components/Column'
import CreateTaskModal from '@/components/CreateTaskModal'
import type { Task } from '@/lib/types'
import TaskDetailModal from '@/components/TaskDetailModal'

// Temporary test page — will be replaced by <Board /> once Board.tsx is built.
// Tasks are hardcoded here for UI testing only. Real data will come from Supabase.
export default function Home() {

  // Controls whether the create task modal is open
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Holds the task the user clicked on — null means no task detail modal is open.
  // key={selectedTask?.id} on TaskDetailModal forces it to remount when a different task is selected,
  // ensuring the form fields reset to the new task's values.
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  return (
    <div className='p-10'>

      {/* Single test column — will be replaced by Board.tsx which renders all four columns */}
      <Column
        title="To Do"
        tasks={[
          {
            id: '1',
            title: 'Fix login bug',
            description: 'Users are getting logged out unexpectedly',
            status: 'todo',
            priority: 'low',
            label: 'Bug',
            due_date: '2026-05-20',
            user_id: 'abc',
            created_at: '2026-05-18'
          },
          {
            id: '2',
            title: 'Design new homepage',
            status: 'todo',
            priority: 'high',
            user_id: 'abc',
            created_at: '2026-05-18'
          }
        ]}
        onAddTask={() => setIsModalOpen(true)}
        onTaskClick={(task) => setSelectedTask(task)}
      />

      {/* Create task modal — opens when + Add Task is clicked */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={data => {
          // Temporary — just logs data until Board.tsx handles real Supabase inserts
          console.log('new task data:', data)
          setIsModalOpen(false)
        }}
      />

      {/* Task detail modal — opens when a task card is clicked.
          key forces remount when selectedTask changes so fields always show the correct task. */}
      <TaskDetailModal
          key={selectedTask?.id}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={(updated) => {
              // Temporary — just logs data until Board.tsx handles real Supabase updates
              console.log('saved task:', updated)
              setSelectedTask(null)
          }}
          onDelete={(id) => {
              // Temporary — just logs id until Board.tsx handles real Supabase deletes
              console.log('deleted task id:', id)
              setSelectedTask(null)
          }}
      />
    </div>
  )
}