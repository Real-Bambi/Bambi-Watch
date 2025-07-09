export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Login</h1>
            <p className="text-lg text-gray-700">Please enter your credentials to login.</p>
            <div className="mt-4">
                <input type="text" placeholder="Username" className="border p-2 rounded mr-2" />
                <input type="password" placeholder="Password" className="border p-2 rounded" />
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Login</button>
        </div>
    )
}