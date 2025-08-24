export interface TaskType {
  id: string;
  text: string;
  isCompleted: boolean;
  isEditing: boolean;
}

export type Sort = "ALL" | "COMPLETED" | "INCOMPLETED";
