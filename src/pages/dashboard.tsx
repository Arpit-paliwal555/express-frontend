import BookCard from '../components/bookcard';
import { useEffect, useState } from 'react';
import { Book } from '../types/book';
import axios from 'axios';
import backendURL from '../config';

export default function Dashboard() {
  
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks().then((res) => {
      setBooks(res.data);
    })
    console.log(books);
  }, []);
  return (
    <div className='grid grid-cols-4 gap-2'>
    {books.map((book,index)=>(
      <BookCard key={index} book={book}></BookCard>
    ))}
    </div>
  );
}
async function getBooks(){
    return await axios.get(`${backendURL}/api/v1/books/get-all`)
  }