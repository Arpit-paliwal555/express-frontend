export interface BookTransaction {
    bookName: string;
    totalIssuers: number;
    currentIssuer: {
      id: string;
      name: string;
    } | null;
    status: string;
  }
  export interface BookRentDetails{
    bookName:string,
    totalRent:Number
  }
  export interface UserIssuedBooks {
    userId: string;
    userName: string;
    issuedBooks: {
      bookName: string;
      issueDate: string;
    }[];
  }

  export interface IssuedBooksInRange{
    startDate: string;
    endDate: string;
    issuedBooks: { bookName: string; userId: string }[];
  }