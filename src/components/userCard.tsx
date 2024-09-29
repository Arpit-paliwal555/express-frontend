import { User } from "../types/user";
import { Card } from "flowbite-react";

export default function UserCard(user:User){

    return <div>
    <Card className="max-w-sm mx-9 my-9">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {user.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <b>ID: </b>{user._id ||user.id} <br />
        <b>Name: </b>{user.name} <br />
        <b>Email: </b>{user.email}
      </p>
    </Card>
    </div>
}