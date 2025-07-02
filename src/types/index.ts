
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Column {
    id: string;
    title: string;
    tasks: Task[];
    color?: string;
}

// Board interface for future state management
export interface Board {
    id: string;
    title: string;
    columns: Column[];
    createdAt?: Date;
    updatedAt?: Date;
}
