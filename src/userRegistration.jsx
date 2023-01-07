import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"

import "./registration.css"

const url = import.meta.env.VITE_SERVER_URL 

function UserRegistration() {
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        password: ""
    })

    const handler = (e) => {
        const { name, value } = e.target
        setDetails({
            ...details,
            [name]: value
        })
    }

    const register = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${url}/registration`, details)

            toast.success(`you are successfully registered ${res.data.data.fname}`)

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const toggle = (e)=>{
  e.preventDefault()
  setShow(!show)
    }



    return (
        <div className="App">
            <div className='signUp'>
                <h2>Registration Form</h2>
                <h4>First Name</h4>
                <input
                    type="text"
                    name='fname'
                    placeholder = "Lav"
                    value={details.fname}
                    onChange={(e) => handler(e)} />
                <h4>Last Name</h4>
                <input
                    type="text"
                    name='lname'
                    placeholder = "verma"
                    value={details.lname}
                    onChange={(e) => handler(e)} />
                <h4>Email</h4>
                <input
                    type="email"
                    name='email'
                    value={details.email}
                    placeholder='abc@gmail.com'
                    onChange={(e) => handler(e)} />
                <h4>Phone</h4>
                <input
                    type="text"
                    name='phone'
                    value={details.phone}
                    placeholder='8X7XXXX2X4'
                    onChange={(e) => handler(e)} />
                <h4>Password</h4>
               <div className='pass'>
               <input
                    type={show ? "text" : "password"}
                    name='password'
                    value={details.password}
                    onChange={(e) => handler(e)} />
                    <button className="btn" onClick={(e)=>toggle(e)}>
                        {show ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                    </button>
               </div>
                <button onClick={(e) => register(e)}>Register</button>
            </div>
        </div>
    )
}

export default UserRegistration
