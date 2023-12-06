/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import Account from "./Account";
import { useMoralis } from "react-moralis";
import MarketPlaceSVG from '/assets/marketplace.svg';
import { useSelector, useDispatch } from 'react-redux';
import * as notify from '../state/ylttoast/index';
import OneSignal from 'react-onesignal';

// import busd from "../assets/busd.png"
// import menu from "../assets/menu.png"




export default function Navbar({ setIsLoading }) {

  const dispatch = useDispatch();
  const notiInfo = useSelector(({ notification }) => notification.value);

  useEffect(() => {
    const set = notiInfo.set;
    const data = notiInfo.data;
    if (set && data) {
      if (data.type == 1) {
        toast(data.msg, { type: toast.TYPE.INFO, autoClose: 6000 })
      }
      if (data.type == 3) {
        toast(data.msg, { type: toast.TYPE.WARNING, autoClose: 6000 })
      }
      clearNotify()
    }

  }, [notiInfo])

  const clearNotify = () => {
    const msg = {
      set: false,
      data: {}
    }
    dispatch(notify.setNotification(msg))
  }

  const [eventsModalOpen, setEventsModalOpen] = useState(false);
  const [tokenURI, setTokenURI] = useState("")
  const { authenticate, isAuthenticated, user, enableWeb3, Moralis } = useMoralis();  

  const authUser = async () => {
    const connectorId = window.localStorage.getItem("connectorId")
    await enableWeb3({ throwOnError: true, provider: connectorId });
    const { account, chainId } = Moralis;
    const { message } = await Moralis.Cloud.run('requestMessage', {
      address: account,
      chain: parseInt(chainId, 16),
      url: process.env.NEXT_PUBLIC_APP_URL,
      networkType: 'evm',
    });
    // Authenticate and login via parse
    await authenticate({
      signingMessage: message,
      throwOnError: true,
    }).then((user) => {
      if (user) {

      } else {

      }
    })
  }

  const eventsModalOpenHandler = () => setEventsModalOpen(true)

  useEffect(() => {
    setTokenURI(`?token=${user?.id}`)
    if (user != null && user.attributes.isSuperAdmin) {
      OneSignal.sendTag('admin', "superAdmin");
    }
  }, [isAuthenticated])

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false)

  return (
    // <div className="w-full flex items-center h-20 px-3 text-center shrink-0 navbar-zindex">
    //    <div>        
 
    //     <img src="/assets/swapWagonLogo.png" alt="no image" className="h-[80px]" />
    //   </div>

    //   <div className="flex h-full w-full items-center justify-end">
    //     <div className="relative items-center hidden lg:flex lg:gap-x-8">
    //       <Link key={1} href="/"><span className="flex text-[18px] text-[#ffffff] decoration-[#3985F5]">Swap</span></Link>
    //       <Link kye={2} href="/"><span className="flex text-[18px] text-[#ffffff] decoration-[#3985F5]">How it works</span></Link>
    //       <Link kye={3} href="/"><span className="flex text-[18px] text-[#ffffff] decoration-[#3985F5]">FAQ</span></Link>
    //       <Link kye={3} href="/"><span className="flex text-[18px] text-[#ffffff] decoration-[#3985F5]">$ATK</span></Link>
    //       {/* <img src="/assets/marketplace.svg" alt="menu" className="h-[80px]" /> */}
    //        <div>        
  
    //   </div>
     
          // <Account
          //   setIsLoading={setIsLoading}
          //   openEventsModal={eventsModalOpenHandler}
          //   onAuth={authUser}
          // />
    //     </div>
    //   </div>
    //   <ToastContainer />
    // </div >

    <div className="w-full text-white ">  
        {/* <Buttons title="login"/> */}
        <nav className="w-full text-white ">
            <div className="flex items-center font-medium justify-between p-4">
            <div className="z-50 p-0 sm:w-auto flex justify-between">
            <img src="/assets/swapWagonLogo.png" alt="no image" className="h-[80px]" />
               <div className="text-3xl lg:hidden flex justify-items-end" onClick={() => setOpen(!open)}>
                 {/* <image src={`${open ? busd: busd}`}  alt="dj"/> */}
                 {
                  open ?  <img src="/assets/link.png" alt="no image" className="h-[80px]" /> :
                  <img src="/assets/lines.png" alt="no image" className="h-[80px]" />
                 }
                
                
                </div>
              </div>
              <ul className="md:flex hidden uppercase items-center gap-8 mr-10">
          <li>
          <Link key={1} href="/"><span className="flex text-[18px] text-[#ffffff] decoration-[#3985F5]">Swap</span></Link>
          </li>
          <li>
          <Link kye={2} href="/"><span className="flex text-[18px] text-[#ffffff] decoration-[#3985F5]">How it works</span></Link>
          </li>
          <li>
          <Link kye={3} href="/"><span className="flex text-[18px] text-[#ffffff] decoration-[#3985F5]">FAQ</span></Link>
          </li>

          <li>
          <Link kye={3} href="/"><span className="flex text-[18px] text-[#ffffff] decoration-[#3985F5]">$ATK</span></Link>
          </li>
       
          <li>
         <Account
            setIsLoading={setIsLoading}
            openEventsModal={eventsModalOpenHandler}
            onAuth={authUser}
          />
          </li>
        
       
        </ul>
        <ul
          className={`
        md:hidden bg-black z-10 fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4 text-white
        duration-500 ${open ? "right-0" : "right-[-100%]"}
        `}
        >
          <li>
            <a href="/" className="py-7 px-3 inline-block">
            <Link key={1} href="/"><span className="flex text-[18px] text-[#ffffff] decoration-[#3985F5]">Swap</span></Link>
            </a>
          </li>

          <li>
            <a href="/services" className="py-7 px-3 inline-block">
            <Link kye={2} href="/"><span className="flex text-[18px] text-[#ffffff] decoration-[#3985F5]">How it works</span></Link>
            </a>
          </li>
          <li>
            <a href="/about" className="py-7 px-3 inline-block">
            <Link kye={3} href="/"><span className="flex text-[18px] text-[#ffffff] decoration-[#3985F5]">FAQ</span></Link>
            </a>
          </li>
          <li>
            <a href="/membership" className="py-7 px-3 inline-block">
            <Link kye={3} href="/"><span className="flex text-[18px] text-[#ffffff] decoration-[#3985F5]">$ATK</span></Link>
            </a>
          </li>

          <li>
         <Account
            setIsLoading={setIsLoading}
            openEventsModal={eventsModalOpenHandler}
            onAuth={authUser}
          />
          </li>

        </ul>
            </div>
            
        </nav>
    </div>

  );
};
