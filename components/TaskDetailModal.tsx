'use client'

import type { Task } from '@/lib/types'
import { useState } from 'react'

interface Props {
    task: Task | null               // the task being viewed — null means no task is selected
    onClose: () => void             // called when the user closes without saving
    onSave: (updated: Task) => void // called with the full updated task on save
    onDelete: (id: string) => void  // called with the task id when the user deletes
}

// Modal for viewing and editing an existing task.
// Pre-fills all form fields with the task's current data.
// The parent component passes key={task.id} so this remounts fresh when a different task is selected.
export default function DetailModel({task, onClose, onSave, onDelete}: Props){

    // State is initialized from the task's current values rather than empty strings.
    // ?? '' provides a fallback for optional fields that may be undefined.
    const [title, setTitle] = useState(task?.title ?? '')
    const [description, setDescription] = useState(task?.description ?? '')
    const [priority, setPriority] = useState<'low' | 'normal' | 'high'>(task?.priority ?? 'normal')
    const [label, setLabel] = useState(task?.label ?? '')
    const [due_date, setDueDate] = useState(task?.due_date ?? '')
    const [titleError, setTitleError] = useState(false) // true when user tries to save with no title

    // Renders nothing when no task is selected
    if (!task) return null

    return (
        // Overlay — covers full screen with semi-transparent black background.
        // Clicking the overlay closes the modal without saving.
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
            onClick={onClose}>

            {/* Modal card — stopPropagation prevents overlay click from firing inside the card */}
            <div className='bg-background rounded-xl shadow-xl p-6 w-full max-w-md'
                onClick={(e) => e.stopPropagation()}>

                {/* onSubmit is the built-in HTML form event — fires when the Save button is clicked */}
                <form className='flex flex-col gap-4'
                    onSubmit={(e) => {
                        e.preventDefault() // prevents the browser from refreshing the page
                        if (!title.trim()) {
                            setTitleError(true)
                            return
                        }
                        // Spread the original task to preserve id, user_id, created_at, status
                        // then override only the fields the user can edit
                        onSave({
                            ...task,
                            title: title!,
                            description,
                            priority,
                            label,
                            due_date
                        })
                        onClose()
                    }}>

                    {/* Header row — editable title on the left, close button on the right */}
                    <div className='flex items-center justify-between'>
                        <input
                            type='text'
                            placeholder='Task title'
                            value={title}
                            // Clears the error the moment the user starts typing again
                            onChange={(e) => { setTitle(e.target.value); setTitleError(false) }}
                            className='text-xl font-bold text-foreground border-none outline-none w-full'
                        />
                        <button type='button' onClick={onClose}
                            className='text-muted hover:text-foreground text-xl cursor-pointer'>✕</button>
                    </div>

                    {/* Validation error — only visible if user tries to save with an empty title */}
                    {titleError && <p className='text-red-500 text-xs'>Title is required</p>}

                    <hr className='border-border mb-4' />

                    {/* Description field */}
                    <div>
                        <label className='block text-sm font-medium text-foreground mb-1'>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-background focus:outline-none focus:border-accent'
                        />
                    </div>

                    {/* Priority dropdown */}
                    <div>
                        <label className='block text-sm font-medium text-foreground mb-1'>Priority</label>
                        <select value={priority}
                            onChange={(e) => setPriority(e.target.value as 'low' | 'normal' | 'high')}
                            className='w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-background focus:outline-none focus:border-accent'
                        >
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Label field */}
                    <div>
                        <label className='block text-sm font-medium text-foreground mb-1'>Label</label>
                        <input
                            value={label}
                            type='text'
                            onChange={(e) => setLabel(e.target.value)}
                            className='w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-background focus:outline-none focus:border-accent'
                        />
                    </div>

                    {/* Due date field */}
                    <div>
                        <label className='block text-sm font-medium text-foreground mb-1'>Due</label>
                        <input
                            value={due_date}
                            type='date'
                            onChange={(e) => setDueDate(e.target.value)}
                            className='w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-background focus:outline-none focus:border-accent'
                        />
                    </div>

                    {/* Footer — Delete on the far left (destructive), Cancel and Save on the right */}
                    <div className='flex justify-between mt-2'>
                        {/* Delete is separated visually to prevent accidental clicks */}
                        <button type='button' onClick={() => onDelete(task.id)}
                            className='text-red-500 hover:text-red-700 text-sm cursor-pointer transition'>
                            Delete Task
                        </button>
                        <div className='flex gap-3'>
                            <button type='button' onClick={onClose}
                                className='px-4 py-2 rounded-lg text-muted hover:text-foreground transition duration-200 cursor-pointer'
                            >Cancel</button>
                            <button type='submit'
                                className='px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition duration-200 cursor-pointer'
                            >Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
