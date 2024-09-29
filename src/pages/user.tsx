import { useEffect, useState } from 'react';
import { User } from '../types/user';
import axios from 'axios';
import UserCard from '../components/userCard';
import { Button, Label, TextInput } from "flowbite-react";
import backendURL from '../config';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUsers().then((res) => {
        if (Array.isArray(res.data.users)) {
          setUsers(res.data.users);
        } else {
          console.error('API response does not contain a users array:', res.data);
          setUsers([]);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setUsers([]);
      });
    }, []);

    const handleUserForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await addUser(name,email);
        return result;
      };

  return (
    <div>
        <div className='ml-[650px]'>
        <form className="flex max-w-md flex-col gap-4 border border-black rounded-lg p-6" onChange={handleUserForm}>
      <div>
      <div>
        <div className="mb-2 block">
          <Label value="Your Name" />
        </div>
        <TextInput placeholder='Name'  
        required
        value={name}
        onChange={(e)=>{setName(e.target.value)}} />
      </div>
        <div className="mb-2 block">
          <Label  value="Your email" />
        </div>
        <TextInput id="email1" type="email" placeholder="name@gmail.com"
        required
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}} />
      </div>
      <Button type="submit">Add</Button>
    </form>
        </div>
        <div className='grid grid-cols-3 gap-2'>
        {users.map((user,index) => (
        <UserCard key={index} {...user} />
        ))}
        </div>
    </div>
  );
}
async function getUsers(){
    return await axios.get(`${backendURL}/api/v1/users/all`)
}

async function addUser(name:string, email:string) {
    return await axios.post(`${backendURL}/api/v1/users/add`,{
        name:name,
        email:email
    })
}