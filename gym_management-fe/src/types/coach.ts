export interface Coach {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userSummary?: string;
  title?: string;
  ratings?: number;
  target: string;
  timeSlots?: string[];
} 