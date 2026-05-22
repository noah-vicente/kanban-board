'use client'

import type { Task } from '@/lib/types'
import TaskCard from './TaskCard'

interface Props {
    title: string
    tasks: Task[]
    onAddTask: () => void
}

export default function Column({title, tasks, onAddTask}: Props) {
    return <div className='bg-surface border-border w-72'>
        <div className='bg-border rounded-xl p-4 flex items-center justify-between border-b border-border py-2'> 
            <span className='text-foreground px-2 py-1 rounded-full text-md font-medium'>{title}</span>
            <span className='text-foreground px-2 py-1 rounded-full text-md font-medium'> {tasks.length} </span>
        </div>
        <div className='flex flex-col gap-3 p-4'>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
        <button className='w-full py-1 px-1 text-muted rounded-xl text-sm hover:bg-border hover:text-foreground cursor-pointer transition duration-200' 
            onClick={onAddTask}>
            + Add Task
        </button>
    </div>
}