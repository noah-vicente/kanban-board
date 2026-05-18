export interface Task {
    id: string
    title: string
    description?: string
    status: 'todo' | 'in_progress' | 'in_review' | 'done'
    priority: 'low' | 'normal' | 'high'
    label?: string
    due_date?: string
    user_id: string
    created_at: string
}