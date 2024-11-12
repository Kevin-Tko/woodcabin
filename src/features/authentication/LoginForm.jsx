import { useState } from 'react'
import Logo from '../../ui-component/Logo'
import { useLogin } from './useLogin'

function LoginForm() {
    const [email, setEmail] = useState('kevin@example.com')
    const [password, setPassword] = useState('Pass123')

    const { loggingIn, login } = useLogin()

    function handleSubmit(e) {
        e.preventDefault()

        if (!email || !password) return

        //Mutate function to clear input elements if login details are wrong
        login(
            { email, password },
            {
                onSettled: () => {
                    setEmail('')
                    setPassword('')
                },
            },
        )
    }

    return (
        <div className="bg-stone-300 w-1/3 p-4 left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2 space-y-6 rounded">
            <Logo />
            <h1 className="text-center font-poppins text-2xl font-semibold">
                Login to your Account
            </h1>
            <form
                className="bg-stone-50 ring-1 ring-stone-100 rounded space-y-6 p-4 flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2 w-10/12">
                    <label
                        htmlFor="username"
                        className="text-xs font-poppins font-bold"
                    >
                        Email Address
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded border-none ring-1 focus:ring-1 ring-stone-300 px-2 py-2 focus:outline-none font-poppins text-xs font-semibold"
                    />
                </div>
                <div className="flex flex-col gap-2 w-10/12">
                    <label
                        htmlFor="password"
                        className="text-xs font-poppins font-bold"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded border-none ring-1 focus:ring-1 ring-stone-300 px-2 py-2 focus:outline-none font-poppins text-xs font-semibold"
                    />
                </div>
                <div className=" w-10/12">
                    <button
                        type="submit"
                        disabled={loggingIn}
                        className={`bg-green-500 block w-full py-2 rounded text-center font-poppins text-stone-50 text-xs font-bold tracking-wider ${loggingIn ? 'bg-green-300 cursor-not-allowed' : ''}`}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
