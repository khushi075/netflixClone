import NavbarItem from "./navbarItem";
import {HiOutlineMenuAlt1,HiOutlineUser,HiChevronDown} from 'react-icons/hi';
import {TfiSearch} from 'react-icons/tfi'
import { IconContext } from "react-icons";
import MobileMenu from "./mobileMenu";
import { text } from "stream/consumers";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./accountMenu";

const top_offset=66;

const Navbar= () => {
    const [showMobileMenu,setShowMobileMenu]=useState(false);
    const [showAccountMenu,setShowAccountMenu]=useState(false);
    const [showBackground,setShowBackground]=useState(false);

    useEffect(()=>{
        const handleScroll = () => {
            if(window.scrollY>=top_offset){
                setShowBackground(true);
            }
            else{
                setShowBackground(false);
            }
        }

        window.addEventListener('scroll',handleScroll);

        return () => {
            window.removeEventListener('scroll',handleScroll);
        }

    },[]);

    const toggleMobileMenu= useCallback( () => {
        setShowMobileMenu((current)=> !current);
    },[]);

    const toggleAccountMenu= useCallback( () => {
        setShowAccountMenu((current)=> !current);
    },[]);

    return (
        <nav className="w-full fixed z-40">
            <div 
                className={`
                    bg-black-900 bg-opacity-90 text-red-700
                    flex flex-row items-center
                    px-4 md:px-16 py-6 
                    transition duration-500
                    ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''} 
                `}
            >
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-cente gap-2 mr-5 cursor-pointer relative">
                    <IconContext.Provider value={{ className: "shared-class", size: '25' }}>
                        <>
                            <HiOutlineMenuAlt1 className="transition"/>
                        </>
                    </IconContext.Provider>
                    <MobileMenu visible={showMobileMenu}/>
                </div>
                <h1 className="text-3xl lg:h-6xl">
                    gini
                </h1>
                <div className="flex-row ml-8 gap-7 hidden  lg:flex lg:items-center lg:justify-end">
                    <NavbarItem label="Home" />
                    <NavbarItem label="Movies" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="My List" />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-500 cursor-pointer transition">
                        <TfiSearch size={20}/>
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-md overflow-hidden">
                            <img src="../images/default-blue.png" alt="user-img" />
                        </div>
                        <div className="lg:hidden">
                            <HiChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>
                        </div>
                        <div className="hidden lg:inline">
                            <HiChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} size={20}/>
                        </div>
                        <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;