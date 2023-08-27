interface Request {
  requestId: string;
  coachId: string;
  userId: string;
  message: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  sentAbout: EpochTimeStamp;
}
