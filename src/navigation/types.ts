export type RootStackParamList = {
  Login: undefined;
  TaskList: { officerName: string; taskId?: string; backgroundColor?: string };
  TaskDetail: { task: Task; officerName: string };
};

export type Task = {
  id: string;
  title: string;
  code: string;
  size: string;
  address: string;
  contact: string;
  officer: string;
};
