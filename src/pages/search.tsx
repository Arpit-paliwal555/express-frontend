import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Book } from "../types/book";
import backendURL from "../config";
export default function Search(){

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [searchrangeResults, setSearchrangeResults] = useState<Book[]>([]);
    const [minrange, setMinrange] = useState(0);
    const [maxrange, setMaxrange] = useState(0);
    const [bookname, setBookname] = useState("");
    const [category, setCategory] = useState("");
    const [rentperday, setRentperday] = useState(0);
    const [detailSearchrangeResults, setDetailSearchrangeResults] = useState<Book[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const results = await searchResponse(searchTerm);
    setSearchResults(results);
    };

    const handlerangeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const results = await searchrangeResponse(minrange, maxrange);
        setSearchrangeResults(results);
    };

    const handleAddBookSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const result = await addBook(bookname,category,rentperday);
      return result;
    };

    const handleDetailSearchSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const result = await detailSearchResponse(searchTerm,category,minrange,maxrange);
      setDetailSearchrangeResults(result)
    };


    return(
        <div>
          {/* search by name form */}
        <form className="flex max-w-md flex-col gap-4 ml-[650px]" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block items-center">
        <Label value="Search a book " /><br />
          <Label value="Name of the book/Search term" />
        </div>
        <TextInput  
        placeholder="search term (Case sensitive)" 
        required
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <Button type="submit">Search</Button>
    </form>
    {searchResults.length > 0 && (
        <div className="mt-8 ml-[650px]">
          <h2 className="text-xl font-bold mb-4">Search Results:</h2>
          <ul>
            {searchResults.map((book,index) => (
              <li key={index} className="mb-2">
                <strong>{book.name}</strong> - {book.category} (${book.rentPerDay}/day)
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* search by rent range form */}
      <form className="flex max-w-md flex-col gap-4 ml-[650px]" onSubmit={handlerangeSubmit}>
      <div>
        <div className="mb-2 block items-center mt-9">
        <Label value="Search a book with rent range " /><br />
        </div>
        <TextInput  className="mt-2"
        placeholder="starting range" 
        required
        value={minrange}
        onChange={(e) => setMinrange(Number(e.target.value))} />
        <TextInput  className="mt-2"
        placeholder="ending range" 
        required
        value={maxrange}
        onChange={(e) => setMaxrange(Number(e.target.value))} />
      </div>
      <Button type="submit">Search</Button>
    </form>
    {searchrangeResults.length > 0 && (
        <div className="mt-8 ml-[650px]">
          <h2 className="text-xl font-bold mb-4">Search Results:</h2>
          <ul>
            {searchrangeResults.map((book,index) => (
              <li key={index} className="mb-2">
                <strong>{book.name}</strong> - {book.category} (${book.rentPerDay}/day)
              </li>
            ))}
          </ul>
        </div>
      )}
    {/* add new book form */}
    <form className="flex max-w-md flex-col gap-4 ml-[650px]" onSubmit={handleAddBookSubmit}>
      <div>
        <div className="mb-2 block items-center mt-9">
        <Label value="Add a new Book " /><br />
        </div>
        <TextInput  className="mt-2"
        placeholder="Book Name" 
        required
        value={bookname}
        onChange={(e)=>setBookname(e.target.value)}
        />
        <TextInput  className="mt-2"
        placeholder="Category" 
        required
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        />
        <TextInput className="mt-2"
        placeholder="Rent per Day" 
        required
        value={rentperday}
        onChange={(e)=>setRentperday(Number(e.target.value))}
        />
      </div>
      <Button type="submit">Add Book</Button>
    </form>
    {/* Search by name, category, minrent and maxrent form */}
    <form className="flex max-w-md flex-col gap-4 ml-[650px]" onSubmit={handleDetailSearchSubmit} >
      <div>
        <div className="mb-2 block items-center mt-9">
        <Label value="Search a book with category, term and rent range " /><br />
        </div>
        <TextInput  className="mt-2"
        placeholder="Category" 
        required
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
         />
        <TextInput  className="mt-2"
        placeholder="Search term" 
        required
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
         />
        <TextInput  className="mt-2"
        placeholder="starting range" 
        required
        value={minrange}
        onChange={(e) => setMinrange(Number(e.target.value))} />
        <TextInput  className="mt-2"
        placeholder="ending range" 
        required
        value={maxrange}
        onChange={(e) => setMaxrange(Number(e.target.value))} />
      </div>
      <Button type="submit">Search</Button>
    </form>
    {detailSearchrangeResults.length > 0 && (
        <div className="mt-8 ml-[650px]">
          <h2 className="text-xl font-bold mb-4">Search Results:</h2>
          <ul>
            {detailSearchrangeResults.map((book,index) => (
              <li key={index} className="mb-2">
                <strong>{book.name}</strong> - {book.category} (${book.rentPerDay}/day)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    )
}
async function searchResponse(term: string) {
  try {
      const response = await axios.get(`${backendURL}/api/v1/books/search/${encodeURIComponent(term)}`);
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('error fetching books', error);
      return [];
  }
}

async function searchrangeResponse(minrange: number, maxrange: number) {
    try {
        const response = await axios.get(`${backendURL}/api/v1/books/rent-range/${encodeURIComponent(minrange)}/${encodeURIComponent(maxrange)}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('error fetching books', error);
        return [];
    }
}

async function addBook(bookname: string, category: string, rentperday: number) {
  try {
      const response = await axios.post(`${backendURL}/api/v1/books/add`,{
        name: bookname,
        category: category,
        rentPerDay: rentperday
      });
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('error fetching books', error);
      return [];
  }
}

async function detailSearchResponse(name:string, category:string, minrange: number, maxrange: number) {
  try {
      const response = await axios.get(`${backendURL}/api/v1/books/detail-search/${encodeURIComponent(category)}/${encodeURIComponent(name)}/${encodeURIComponent(minrange)}/${encodeURIComponent(maxrange)}`);
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('error fetching books', error);
      return [];
  }
}