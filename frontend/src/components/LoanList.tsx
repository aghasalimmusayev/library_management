import { Loan } from "../types/models";

interface LoanListProps {
  loans: Loan[];
  onReturn?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const LoanList = ({ loans, onReturn, onDelete }: LoanListProps) => {
  if (loans.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No loans found</p>
      </div>
    );
  }

  const isOverdue = (loan: Loan) => {
    if (loan.status === "returned") return false;
    return new Date(loan.due_date) < new Date();
  };

  const getStatusBadge = (loan: Loan) => {
    if (loan.status === "returned") {
      return (
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          Returned
        </span>
      );
    }
    if (isOverdue(loan)) {
      return (
        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          Overdue
        </span>
      );
    }
    return (
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
        Active
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {loans.map((loan) => (
        <div
          key={loan.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {loan.book_title || `Book ID: ${loan.book_id}`}
              </h3>
              <p className="text-sm text-gray-600">
                {loan.genre_name && `Genre: ${loan.genre_name}`}
              </p>
            </div>
            {getStatusBadge(loan)}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500">Borrower</p>
              <p className="text-sm font-semibold text-gray-800">
                {loan.user_name}
              </p>
              <p className="text-xs text-gray-600">{loan.user_email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Due Date</p>
              <p className="text-sm font-semibold text-gray-800">
                {new Date(loan.due_date).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-600">
                Loaned: {new Date(loan.loan_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {loan.return_date && (
            <div className="mb-4">
              <p className="text-xs text-gray-500">Returned on</p>
              <p className="text-sm font-semibold text-gray-800">
                {new Date(loan.return_date).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="flex space-x-2">
            {loan.status !== "returned" && onReturn && (
              <button
                onClick={() => onReturn(loan.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-colors flex-1"
              >
                Mark as Returned
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(loan.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanList;
