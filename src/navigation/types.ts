export type RootStackParamList = {
    Login: undefined;
    TaskList: {officerName : string};
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

  