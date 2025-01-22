export interface Question {
  id: string;
  title: string;
  subQuestion: string | null;
  questionOrigin: string | null;
  serialNumber: string;
  fileName: File | string;
  edits: string[];
  dateDue: string;
  createdAt: string;
  updatedAt: string;
  postedBy: {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
