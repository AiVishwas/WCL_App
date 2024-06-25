export type RootStackParamList = {
    Login: undefined;
    TaskList: undefined;
    TaskDetail: { task: Task };
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

  