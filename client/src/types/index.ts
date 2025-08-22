export interface TaskType {
  id: number;
  text: string;
  isCompleted: boolean;
  isEditing: boolean;
}

export type Sort = "ALL" | "COMPLETED" | "INCOMPLETED";
