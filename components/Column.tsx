'use client'

import type { Task } from '@/lib/types'
import TaskCard from './TaskCard'

interface Props {
    title: string       // column heading (e.g. "To Do", "In Progress")
    tasks: Task[]       // array of tasks that belong to this column
    onAddTask: () => void   // callback fired when the user clicks "+ Add Task"
}

// Renders a single Kanban column with a header, a list of task cards, and an add button.
// The same component is reused for all four columns — only the props differ.
export default function Column({title, tasks, onAddTask}: Props) {
    return (
        <div className='bg-surface border-border w-72'>

            {/* Column header — shows the column title and the number of tasks */}
            <div className='bg-border rounded-xl p-4 flex items-center justify-between border-b border-border py-2'>
                <span className='text-foreground px-2 py-1 rounded-full text-md font-medium'>{title}</span>
                {/* tasks.length dynamically shows the current task count */}
                <span className='text-foreground px-2 py-1 rounded-full text-md font-medium'>{tasks.length}</span>
            </div>

            {/* Task list — maps over the tasks array and renders a TaskCard for each one.
                The key prop is required by React to efficiently track list items. */}
            <div className='flex flex-col gap-3 p-4'>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>

            {/* Add task button — calls the onAddTask prop which opens the CreateTaskModal */}
            <button
                className='w-full py-1 px-1 text-muted rounded-xl text-sm hover:bg-border hover:text-foreground cursor-pointer transition duration-200'
                onClick={onAddTask}>
                + Add Task
            </button>
        </div>
    )
}