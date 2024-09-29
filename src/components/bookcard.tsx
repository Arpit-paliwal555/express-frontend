import { Button, Card, Modal, TextInput } from "flowbite-react";
import { Book } from "../types/book";
import { useState } from "react";
import axios from "axios";
import backendURL from "../config";

export default function BookCard({ book }: { book: Book }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const handleIssueBook = () => {
    setIsModalOpen(true);
  };

  const issueBook =async (bookName:string, userId:string)=>{
    const date = new Date().toISOString().replace('Z', '+00:00');
    try{
      const response = await axios.put(`${backendURL}/api/v1/bookIssue/issue-book`,{
        bookName:bookName,
        userId:userId,
        issueDate: date
      });
      alert('Book issued!');
      console.log(response.data);
      setIsModalOpen(false);
    }catch(error){
      console.error('error issueing book', error);
    }
  }

  return (
    <div>
    <Card className="max-w-sm mx-9 my-9">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {book.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <b>ID: </b>{book._id ||book.id} <br />
        <b>Category: </b>{book.category} <br />
        <b>Rent Per Day: </b>{book.rentPerDay}
      </p>
      <Button onClick={handleIssueBook}>
        issue this book
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Card>

    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <Modal.Header>Issue Book</Modal.Header>
    <Modal.Body>
      <div className="space-y-6">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          Are you sure you want to issue "{book.name}"?
        </p>
        <TextInput
              id="userId"
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => {
        // Add your issue book logic here
        issueBook(book.name,userId)
        console.log('Book issued:', book);
        setIsModalOpen(false);
      }}>
        Confirm Issue
      </Button>
      <Button color="gray" onClick={() => setIsModalOpen(false)}>
        Cancel
      </Button>
    </Modal.Footer>
    </Modal>
</div>
  );
}
