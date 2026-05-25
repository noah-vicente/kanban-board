'use client'

import type { Task } from '@/lib/types'

interface Props {
    task: Task
    onSelect: (task: Task) => void
}

// Maps each priority value to a pair of Tailwind classes (background + text color).
// Using an object lookup instead of if/else keeps the code concise and easy to extend.
const priorityStyles = {
    high: 'bg-red-100 text-red-700',
    normal: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
}

export default function TaskCard({task, onSelect}: Props){
    return (
        // Outer card — white background, soft border, rounded corners, subtle shadow
        <div onClick={() => onSelect(task)}
            className='bg-background border border-border rounded-xl p-4 
            shadow-lg flex flex-col gap-3 cursor-pointer hover:shadow-xl transition'>

            {/* Metadata row — colored header strip with priority badge and due date */}
            <div className='bg-header rounded-t-xl p-4 -mx-4 -mt-4 flex items-center justify-between border-b border-border pb-3'>
                {/* Priority badge — color determined by priorityStyles lookup */}
                <span className={`${priorityStyles[task.priority]} px-2 py-1 rounded-full text-xs font-medium`}>
                    {task.priority}
                </span>

                {/* Due date — only renders if due_date exists on the task */}
                {task.due_date &&
                    <span className='text-muted font-bold'>
                        {/* Convert ISO date string (YYYY-MM-DD) to readable format (May 20, 2026) */}
                        {new Date(task.due_date).toLocaleDateString('en-US',
                            { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                }
            </div>

            {/* Task title — always present */}
            <h2 className='text-foreground font-bold text-lg'> {task.title} </h2>

            {/* Description — only renders if provided */}
            {task.description && <p className='text-muted'> {task.description} </p>}

            {/* Label badge — only renders if provided */}
            {task.label && <span className='bg-accent text-white px-2 py-1 rounded-full text-xs font-medium w-fit'> {task.label} </span>}
        </div>
    )
}