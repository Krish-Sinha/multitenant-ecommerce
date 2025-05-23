"use client"

import  Link  from "next/link"
import { Poppins } from "next/font/google"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NavbarSidebar } from "./sidebar-navbar"
import { useState } from "react"
import { MenuIcon } from "lucide-react"

const poppins=Poppins({
    subsets:["latin"],
    weight:["700"],
})

interface NavbarItemProps{
    href:string
    children:React.ReactNode
    isActive?:boolean
}

const NavbarItems=({
    href,
    children,
    isActive
}:NavbarItemProps)=>{
    return(
        <Button
        asChild
        variant="outline"
        className={cn(
            "bg-transparent rounded-full hover:bg-transparent border-transparent hover:border-primary px-3.5 text-lg",
            isActive && "bg-black  text-white hover:bg-black hover:text-white"
        )}
        >
            <Link href={href}>
            {children}
            </Link>
        </Button>
    )
    
}


const navbarItemArray=[
    {href:"/",children:"Home"},
    {href:"/about",children:"About"},
    {href:"/features",children:"Features"},
    {href:"/pricing",children:"Pricing"},
    {href:"/contact",children:"Contact"}
]

export const Navbar=()=>{
    const pathname=usePathname()
    const[isSidebarOpen,setIsSidebarOpen]=useState(false)
    return(
        <div className="flex h-20 border-b justify-between font-medium bg-white">
            <Link href="/" className="pl-6 flex items-center">
                <span className={cn("text-3xl font-semibold",poppins.className)}>MultiStoreX</span>
            </Link>


                <NavbarSidebar
                items={navbarItemArray}
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
                />


            <div className="items-center gap-4 hidden lg:flex">
                {navbarItemArray.map((item)=>(
                    <NavbarItems
                        key={item.href}
                        href={item.href}
                        isActive={pathname ===item.href}>
                        {item.children}
                    </NavbarItems>
                ))}
            </div>
            
            <div className="hidden lg:flex">
                <Button 
                    asChild
                    variant="secondary"
                    className="border-l border-r-0 border-b-0 border-t-0 px-12 h-full rounded-none bg-white  hover:bg-pink-400 transition-colors hover:cursor-pointer text-lg">
                <Link href="/sign-in">
                    Log In
                </Link>
                </Button>
                
                <Button
                    asChild 
                    className="border-l border-r-0 border-b-0 border-t-0 px-12 h-full rounded-none bg-black text-white  hover:bg-pink-400 hover:text-black transition-colors hover:cursor-pointer text-lg">
                <Link href="/sign-up">
                    Start selling
                </Link>
                </Button>
            </div>
            <div className="flex lg:hidden items-center justify-center">
                <Button
                    variant='ghost'
                    className="size-12 border-transparent bg-white"
                    onClick={()=>setIsSidebarOpen(true)}
                >
                    <MenuIcon/>
                </Button>
            </div>
        </div>
    )
}