interface Review {
  reviewId: string;
  userId: string;
  authorId: string;
  firstName?: string;
  lastName?: string;
  description: string;
  rate: number;
  createdAt: EpochTimeStamp;
  editedAt?: EpochTimeStamp;
}
