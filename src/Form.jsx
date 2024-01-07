import React, { useEffect, useState } from 'react'

const Form = () => {
    const [val,setVal]=useState({})
    const [users,setUsers]=useState([])

    const handleForm = (e)=>{
        //   console.log(e);
      setVal({
          ...val,
          [e.target.name]:e.target.value
        })
    }

    const  handleSubmit = async (e)=>{
        e.preventDefault();
        // console.log(val);
// here we are connecting our backend express js server
        const response = await fetch("http://localhost:8080/demo", {
          method:'POST',
          body: JSON.stringify(val),
          headers:{
            'Content-Type':'application/json'
          }
        })
       const data = await response.json()
        console.log(data);
    }
// here we are fetching data from mongodb using backend express js server
const getUsers = async ()=>{
  const response = await fetch("http://localhost:8080/demo", {
    method:'GET',
  })
 const data = await response.json()
  console.log(data);
  setUsers(data)
}

useEffect(()=>{
getUsers();
},[users])




  return (
    <>
    {/* <b>{JSON.stringify(val)}</b> */}
      <form onSubmit={handleSubmit}>
        <span>for name</span>
        <input type="text" name="name" onChange={handleForm} />
        <span>for password</span>
        <input type="text" name='password' onChange={handleForm} />
        <input type="submit"  />
      </form>

      <div>
        <ul>
          {/* database data is showing here */}
        {users.map(user=>  <li key={user._id}>{user.username}, {user.password}</li>)}
        </ul>
      </div>
    </>
  )
}

export default Form
