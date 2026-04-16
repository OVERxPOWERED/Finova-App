"use client";
import Splash from "@/component/splash";
import { SplashScreen } from "@capacitor/splash-screen";
import { Capacitor } from "@capacitor/core";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';

export default function Home() {

  const isWeb = Capacitor.getPlatform() === 'web';

  const [isLoading, setIsLoading] = useState(isWeb);

  const [isLogged, setLogged] = useState(true);


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
    if(!isLogged) {
      redirect('/login');
    } else {
      redirect('/home');
    }
  }

  return null;
}
