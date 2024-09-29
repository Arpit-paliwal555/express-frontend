import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import backendURL from '../config';

export default function Returnbook(){
    const [userid, setUserid] = useState("");
    const [bookname, setBookname] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await returnBook(userid,bookname);
        return result;
        };
    return(
        <div>
            <form className="flex max-w-md flex-col gap-4 ml-[650px]" onSubmit={handleSubmit}>
            <div>
                <div className="mb-2 block items-center mt-9">
                <Label value="Return A Book" /><br />
                </div>
                <TextInput  className="mt-2"
                placeholder="User Id" 
                required
                value={userid}
                onChange={(e)=>{setUserid(e.target.value)}}
                />
                <TextInput  className="mt-2"
                placeholder="Book Name" 
                required
                value={bookname}
                onChange={(e)=>{setBookname(e.target.value)}}
                />
            
            </div>
            <Button type="submit">Return</Button>
            </form>
        </div>
    )
}
const returnBook =async (bookName:string, userId:string)=>{
    const date = new Date().toISOString().replace('Z', '+00:00');
    try{
      const response = await axios.put(`${backendURL}/api/v1/bookIssue/return-book`,{
        userId:userId,
        bookName:bookName,
        returnDate: date
      });
      alert('Book Returned!');
      console.log(response.data);
    }catch(error){
      console.error('error issueing book', error);
    }
  }