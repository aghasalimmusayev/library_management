export interface Loan {
  id: number;
  book_id: number;
  user_name: string;
  user_email: string;
  loan_date: Date;
  due_date: Date;
  return_date?: Date;
  status: "active" | "returned" | "overdue";
  created_at: Date;
}

export interface CreateLoanDto {
  book_id: number;
  user_name: string;
  user_email: string;
  due_date: Date;
}

export interface UpdateLoanDto {
  return_date?: Date;
  status?: "active" | "returned" | "overdue";
}

export interface LoanWithDetails extends Loan {
  book_title?: string;
  genre_name?: string;
}
