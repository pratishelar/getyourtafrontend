import { Photo } from './Photo';

export interface User {
  Id: number;
  name: string;
  gender: string;
  age: Date;
  officeName: string;
  gradePay: number;
  office: string;
  created: Date;
  lastActive: Date;
  photos?: Photo[];
}
