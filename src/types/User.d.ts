interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  age: null | number;
  registerDate: EpochTimeStamp;
  isCoach: boolean;
  isAdmin: boolean;
  isLoggedIn?: boolean;
}
