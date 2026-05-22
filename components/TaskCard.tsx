import type { Task } from '@/lib/types'

interface Props {
    task: Task
}

const priorityStyles = {
    high: 'bg-red-100 text-red-700',
    normal: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
}

export default function TaskCard({task}: Props){
    return <div className='bg-background border border-border rounded-xl p-4 shadow-lg flex flex-col gap-3'>
        <div className='bg-header rounded-t-xl p-4 -mx-4 -mt-4 flex items-center justify-between border-b border-border pb-3'>
            <span className={`${priorityStyles[task.priority]} px-2 py-1 rounded-full text-xs font-medium`}> 
                {task.priority} 
            </span>
            {task.due_date && 
                <span className='text-muted font-bold'> 
                    {new Date(task.due_date).toLocaleDateString('en-US', 
                        { month: 'short', day: 'numeric', year: 'numeric' })} 
                </span>
            }
        </div>
        <h2 className='text-foreground font-bold text-lg'> {task.title} </h2>
        {task.description && <p className='text-muted'> {task.description} </p>}
        {task.label && <span className='bg-accent text-white px-2 py-1 rounded-full text-xs font-medium w-fit'> {task.label} </span>}
    </div>
}