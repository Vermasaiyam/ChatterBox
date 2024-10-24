import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Signup = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const {user} = useSelector(store=>store.auth);

    const [input, setInput] = useState({
        username: "",
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
            const res = await axios.post('https://chatterbox-aaxc.onrender.com/api/user/register', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
                setInput({
                    username: "",
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

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

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
                    <h1 className='text-center font-bold text-4xl m-3 mt-5'>Create an account</h1>
                    <p className='text-base text-center'>To continue, fill out the personal info.</p>
                </div>
                <div>
                    <span className='font-medium'>Username <span className='text-base text-red-700'>*</span></span>
                    <Input
                        type="text"
                        name="username"
                        value={input.username}
                        onChange={changeEventHandler}
                        placeholder="Enter the username"
                        className="focus-visible:ring-transparent my-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <span className='font-medium'>Email <span className='text-base text-red-700'>*</span></span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder="Enter the email"
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
                            placeholder="Enter the password"
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
                        <Button type='submit' className="bg-[#042035] hover:bg-[#165686]">Signup</Button>
                    )
                }
                <span className='text-center'>
                    Already have an account?
                    <Link to="/login" className='text-blue-600 mx-1'>Login</Link>
                </span>
            </form>
        </div>
    )
}

export default Signup
