'use client'

import { useState } from 'react'

interface Props {
    isOpen: boolean         // controls whether the modal is visible
    onClose: () => void     // called when the user closes without submitting
    onSubmit: (data: {      // called with the form data when the user clicks "Add Task"
        title: string,
        description?: string,
        priority: 'low' | 'normal' | 'high',
        label?: string,
        due_date?: string
    }) => void
}

export default function TaskModal({isOpen, onClose, onSubmit}: Props){

    // One state variable per form field — each updates on every keystroke via onChange
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState<'low' | 'normal' | 'high'>('normal')
    const [label, setLabel] = useState('')
    const [due_date, setDueDate] = useState('')
    const [titleError, setTitleError] = useState(false) // true when user tries to submit with no title

    // Resets all fields to their initial values.
    // Called after submission or when closing so the modal opens fresh next time.
    function resetForm() {
        setTitle('')
        setDescription('')
        setPriority('normal')
        setLabel('')
        setDueDate('')
        setTitleError(false)
    }

    // Renders nothing when closed — avoids mounting unnecessary DOM elements
    if (!isOpen) return null

    return (
        // Overlay — covers the full screen with a semi-transparent black background.
        // Clicking the overlay closes and resets the modal.
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
            onClick={() => { onClose(); resetForm() }}>

            {/* Modal card — stopPropagation prevents clicks inside from closing the modal */}
            <div className='bg-background rounded-xl shadow-xl p-6 w-full max-w-md'
                onClick={(e) => e.stopPropagation()}>

                <form className='flex flex-col gap-4'
                    onSubmit={(e) => {
                        e.preventDefault() // prevents the browser from refreshing the page on submit
                        if (!title.trim()) { // trim() ensures whitespace-only titles are rejected
                            setTitleError(true)
                            return
                        }
                        onSubmit({ title, description, priority, label, due_date })
                        resetForm()
                        onClose()
                    }}>

                    {/* Header row — inline title input on the left, close button on the right */}
                    <div className='flex items-center justify-between'>
                        <input
                            type='text'
                            placeholder='New Task'
                            value={title}
                            // Clear the error as soon as the user starts typing
                            onChange={(e) => { setTitle(e.target.value); setTitleError(false) }}
                            className='text-xl font-bold text-foreground border-none outline-none w-full'
                        />
                        <button type='button' onClick={() => { onClose(); resetForm() }}
                            className='text-muted hover:text-foreground text-xl cursor-pointer'>✕</button>
                    </div>

                    {/* Validation error — only shown when user submits with no title */}
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

                    {/* Priority dropdown — uses a select element with three fixed options */}
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

                    {/* Label field — free text tag like "Bug" or "Feature" */}
                    <div>
                        <label className='block text-sm font-medium text-foreground mb-1'>Label</label>
                        <input
                            value={label}
                            type='text'
                            onChange={(e) => setLabel(e.target.value)}
                            className='w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-background focus:outline-none focus:border-accent'
                        />
                    </div>

                    {/* Due date field — browser renders a native date picker */}
                    <div>
                        <label className='block text-sm font-medium text-foreground mb-1'>Due</label>
                        <input
                            value={due_date}
                            type='date'
                            onChange={(e) => setDueDate(e.target.value)}
                            className='w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-background focus:outline-none focus:border-accent'
                        />
                    </div>

                    {/* Footer — Cancel dismisses without saving, Add Task submits the form */}
                    <div className='flex justify-end gap-3 mt-2'>
                        <button type='button' onClick={() => { onClose(); resetForm() }}
                            className='px-4 py-2 rounded-lg text-muted hover:text-foreground transition duration-200 cursor-pointer'
                        >Cancel</button>
                        <button type='submit'
                            className='px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition duration-200 cursor-pointer'
                        >Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
