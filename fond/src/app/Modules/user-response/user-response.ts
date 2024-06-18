export interface UserResponse {
  userId?: string | null;
  questionId: string;
  answerIndex: number;
  confirmation: 'nonconfirmé' | 'accepté' | 'refusé'; 
}
