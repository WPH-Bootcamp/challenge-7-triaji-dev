export interface Review {
  id: number;
  userId: number;
  userName: string;
  restaurantId: number;
  transactionId: string;
  star: number; // 1-5
  comment?: string;
  menuIds?: number[];
  createdAt: string;
}

export interface CreateReviewRequest {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment?: string;
  menuIds?: number[];
}

export interface UpdateReviewRequest {
  star?: number;
  comment?: string;
}
