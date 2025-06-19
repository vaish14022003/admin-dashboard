export interface Manager {
    _id: string;
    name: string;
    email: string;
    isValidated: boolean;
    createdAt: string;
    restaurants: string[]; // or full restaurant objects
}
  