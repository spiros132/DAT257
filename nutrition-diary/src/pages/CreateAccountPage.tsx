"use client";
import {RegisterUser} from "@/app/actions";
import { startTransition, useState } from "react";


export default function CreateAccountPage(){
  // Variables and their set functions for the input fields
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Handle functions for the input fields, 
  // reset the message when the client writes something new in the input fields
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setMessage("");
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setMessage("");
  };
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setMessage("");
  };

  // The message that we get from the server
  const [message, setMessage] = useState<string>('');

  function registerUser(){
    // Call the functions that exists on the server
    startTransition(() => {
      // Try to register the user
      RegisterUser(username, password, confirmPassword)
      .then((serverMessage) => {
        // We got a message from the server, display it
        setMessage(serverMessage);
      })
      .catch((error) => {
        // We got an error, display it on the console
        console.log(error);
      });
    });
  }

  return (
    <div className="flex min-h-screen"> 
      <div className="flex-1 flex items-center justify-center"> {/* Center the image */}
        <img src="/NutritionDiary1.png" alt="Nutrition Diary Logo" className="centered-image" style={{ width: '450px', filter: 'grayscale(3%) brightness(95%)' }} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center mt-1"> 
        <div className="flex flex-col items-center"> 
          <h2 className="text-2xl font-semibold mb-4">Welcome to Nutrition Diary</h2>
          <form action={registerUser} className="flex flex-col items-center">
            <input
              name="username"
              type="text"
              placeholder="CREATE USERNAME"
              className="border border-gray-300 rounded-md p-2 mb-2"
              onChange={handleUsername}
              value={username}
            />
            <input
              name="password"
              type="password"
              placeholder="CREATE PASSWORD"
              className="border border-gray-300 rounded-md p-2 mb-4"
              onChange={handlePassword}
              value={password}
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="CONFIRM PASSWORD"
              className="border border-gray-300 rounded-md p-2 mb-2"
              onChange={handleConfirmPassword}
              value={confirmPassword}
            />
            <button
              name="registerButton"
              type="submit" 
              className="bg-green-400 text-white font-semibold py-2 px-4 rounded-md"
            >
              CONFIRM REGISTRATION
            </button>
            <p>{message}</p>
            
            <div className="mb-6"></div> {/* Empty div for spacing */}
            <p className="text-sm text-black">Already have an account?</p>

            <button 
              className="bg-green-400 text-white font-semibold py-2 px-4 rounded-md"
            >
              TO LOGIN SCREEN
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 