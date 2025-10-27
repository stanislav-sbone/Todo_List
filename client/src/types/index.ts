export interface TaskType {
  id: string;
  text: string;
  isCompleted: boolean;
  isEditing: boolean;
  order?: number;
}

export type Sort = "ALL" | "COMPLETED" | "INCOMPLETED";
