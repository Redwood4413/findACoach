interface Review {
  reviewId: string;
  userId: string;
  authorId: string;
  reviewsCount?: number;
  firstName?: string;
  lastName?: string;
  description: string;
  rate: number;
  createdAt: EpochTimeStamp;
  editedAt?: EpochTimeStamp;
}
