import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { toast } from 'sonner';

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate("/");
                toast.success(res.data.message);
                setInput({
                    email: "",
                    password: ""
                });
            }
            setLoading(false);

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

    }

    return (
        <div className='flex flex-col items-center w-screen h-screen justify-center'>
            <div className='w-screen flex absolute top-0 left-0 cursor-pointer mx-2'>
                <h1 className='text-center font-bold text-xl m-3'><img src="logo.png" alt="ChatterBox" className='h-[5rem] w-[11rem]' /></h1>
            </div>
            <form
                onSubmit={signupHandler}
                className='shadow-lg flex flex-col gap-5 p-8 py-10'
            >
                <div className='mb-1 -mt-12'>
                    <h1 className='text-center font-bold text-4xl m-3 mt-5'>Login your account</h1>
                    <p className='text-base text-center'>Please log in to your account to proceed.</p>
                </div>
                <div>
                    <span className='font-medium'>Email <span className='text-base text-red-700'>*</span></span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <span className='font-medium'>Password <span className='text-base text-red-700'>*</span></span>
                    <div className="relative">
                        <Input
                            type={show ? "text" : "password"}
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="focus-visible:ring-transparent my-2 border border-gray-300 rounded-md pr-10"
                        />
                        <button
                            className="absolute inset-y-0 right-0 flex items-center px-3 bg-slate-100 focus:outline-none"
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick();
                            }}
                        >
                            {show ? <ViewOffIcon /> : <ViewIcon />}
                        </button>
                    </div>

                </div>
                {
                    loading ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit' className="bg-[#042035] hover:bg-[#165686]">Login</Button>
                    )
                }
                <span className='text-center'>
                    Dosen't have an account?
                    <Link to="/signup" className='text-blue-600 mx-1'>Signup</Link>
                </span>
            </form>
        </div>
    )
}

export default Login
