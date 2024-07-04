import { useState } from "react";
import { login } from "./api/users";
import { useNavigate } from "react-router-dom";

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const[showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {

    if(username == '' || password == '') {
      setErrorMessage("Username and Password is Required");
      setShowMessage(true);
    

    }

    else {
      const response = await login(username, password);

      if(response) {
       navigate('/inventory');
       
      }
    else {
      setErrorMessage("Invalid Username and Password");
      

    }  
    setShowMessage(true);
    }
  }


  return (
    <>

<div class="h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
 
    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

      <div class="max-w-md mx-auto">
        <div>
          <h1 class="text-4xl font-bold text-center">Login</h1>
        </div>
        {
          showMessage &&
          (
            <div className= "m-2 text-center rounded bg-red-200 text-red-700">
              { errorMessage}
        </div>
          )
        }

        <div class="divide-y divide-gray-200">
          <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div class="relative">
              <input value={username}onChange={(e) => setUsername(e.target.value)} type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
              <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
            </div>
            <div class="relative">
              <input value={password}onChange={(e) => setPassword(e.target.value)} type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
              <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            </div>
            <div class="flex">
              <button onClick={handleLogin} class="py-1 px-5 bg-black text-white p-5 ml-auto rounded hover:bg-blue-400 hover:text-white m-2">Login</button>
            </div>
          </div>
        </div>
      </div>

     

    </div>
 
</div>
</>
  )
}

export default App
