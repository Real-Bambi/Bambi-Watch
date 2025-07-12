import Nicebg from "../assets/signup.jpg";
import { Link } from "react-router";

export default function SignUp() {
    return (
        <>
            <div className=" bg-cover bg-center h-screen flex justify-center items-center"
                style={{ backgroundImage: `url(${Nicebg})` }}>
                <div className=" bg-cover bg-center h-[80vh] w-[90%]  shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-row "
                    style={{ backgroundImage: `url(${Nicebg})` }}>
                    <div className="w-[50%] flex flex-col justify-center items-center  bg-[rgba(0,0,0,0.5)] ">
                        <p className="text-white font-bold text-5xl">Let's get started!</p>
                        <p className="flex justify-center text-center pt-6 text-2xl text-white italic">Already a Member?
                            <Link to="/login" className="text-purple-500 font-semibold hover:underline ml-2">Log In
                            </Link>
                        </p>
                    </div>
                    <div className="w-[40%] flex justify-center items-center">
                        <form action="" className="bg-[rgba(255,255,255,0.2)] p-8 rounded-xl w-full text-white">
                            <div className="flex flex-col justify-center text-center pb-4">
                                <p className="font-bold  text-3xl">Watch Together</p>
                                <p className="font-bold  text-lg text-gray-400">Watch movies with friends, anywhere</p></div>
                            <div className="flex flex-col pb-4 ">
                                <label htmlFor="username"> Username </label>
                                <input type="text" className=" border border-[rgba(255,255,255,0.4)] p-2 rounded-md " />
                            </div>
                            <div className="flex flex-col pb-4">
                                <label htmlFor="email"> Email </label>
                                <input type="email" className="  border border-[rgba(255,255,255,0.4)] p-2 rounded-md" />
                            </div>
                            <div className="flex flex-col pb-4">
                                <label htmlFor="password"> Password </label>
                                <input type="password" className="border border-[rgba(255,255,255,0.4)] p-2 rounded-md" />
                            </div>
                            <div className="flex flex-col pb-4">
                                <label htmlFor="confirmpassword">Confirm Password </label>
                                <input type="password" className="border border-[rgba(255,255,255,0.4)] p-2 rounded-md" />
                            </div>

                            <button type="submit" className="p-2 w-full rounded-md border bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Sign Up</button>

                        </form>
                    </div>

                </div>
            </div>

        </>
    )
}