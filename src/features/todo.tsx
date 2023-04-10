export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  description: string;
}

export interface TodoErrors {
  title: string;
  description: string;
}
