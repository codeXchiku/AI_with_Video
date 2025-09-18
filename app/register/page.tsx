import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password != confirmPassword) {
            alert("password and confirm password not matching")
            return;
        }
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error || "registration failed")
            }

            router.push("/login")

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    name="email"
                     type="email"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input name="confirmPassword" type="password" 
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)} />
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>

            <div>
                <p>If you already registered then <a href="/login">click here</a></p>
            </div>

        </div>
    )
}

export default RegisterPage


//improve ments: react query,