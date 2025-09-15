import { NextRequest,NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDB } from "@/lib/db";


export async function POST(request:NextRequest) {
   try {
     const{email,password}=await request.json()

     if (!email || !password) {
        return NextResponse.json(
            {error:"please provide email and password correctly"},
            {status:400}
        )
     }
     await connectToDB()
     const existingUser = await User.findOne({email})

     if (existingUser) {
        return NextResponse.json(
            {error:"user already exist"},
            {status:400}
        )
     }

     await User.create({
        email,password
     })

     return NextResponse.json(
        {message:"user registered successfully"},
        {status:200}
     )


   } catch (error) {
    console.error("registration error",error)
    return NextResponse.json(
            {error:"registration failed"},
            {status:400}
        )
   }
}