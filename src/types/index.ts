export interface Task {
    id: string;
    title: string;
    status: 'todo' | 'in-progress' | 'done';
}

export interface Column {
    id: string;
    title: string;
    tasks: Task[];
}
