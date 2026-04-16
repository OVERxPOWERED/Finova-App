"use client";
import Test from "@/component/test";
import Splash from "@/component/splash";
import { SplashScreen } from "@capacitor/splash-screen";
import { Capacitor } from "@capacitor/core";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
// import { useRouter } from "next/navigation";

export default function Home() {

  const isWeb = Capacitor.getPlatform() === 'web';

  const [isLoading, setIsLoading] = useState(isWeb);

  // const router = useRouter();


  useEffect(() => {
    const initializeApp = async () => {

      if (isWeb) {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        try {
          await SplashScreen.hide();
          redirect('/login');
          // router.push('/login');
        } catch (error) {
          console.error("SplashScreen hide failed (likely running in standard browser):", error);
        }
      }


    }

    initializeApp();
  }, [isWeb]);

  if (isLoading) {
    return <Splash />
  } else {
    redirect('/login');
    // router.push('/login');
  }

  return (
    <div className='h-screen w-screen bg-[linear-gradient(to_bottom_right,#FFFFFF_42%,#D2FAE6_100%)] flex justify-center items-center'>
      <Test />
    </div>
  );
}
