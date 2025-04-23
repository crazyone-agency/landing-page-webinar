import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { brandColors } from "@/lib/course-utils";

interface CountdownProps {
  className?: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function OfferCountdown({ className = "" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 48, minutes: 0, seconds: 0 });
  
  // Set the end date to 48 hours after the webinar end (May 10, 2025 at 11:30)
  const calculateEndTime = () => {
    const webinarEndDate = new Date(2025, 4, 10, 11, 30); // May 10, 2025 at 11:30
    const offerEndDate = new Date(webinarEndDate);
    offerEndDate.setHours(offerEndDate.getHours() + 48); // Add 48 hours to webinar end
    return offerEndDate;
  };
  
  const calculateTimeLeft = () => {
    const difference = +calculateEndTime() - +new Date();
    
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 48),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format with leading zeros
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };
  
  const { hours, minutes, seconds } = timeLeft;
  
  return (
    <div className={`${className}`}>
      <motion.div 
        className="bg-blue-900/40 backdrop-blur-sm border border-yellow-400/30 rounded-lg p-4 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <h3 className="text-white font-semibold mb-2">L'offerta scade tra:</h3>
          
          <div className="flex justify-center space-x-3 mb-2">
            <div className="flex flex-col items-center">
              <div className="bg-blue-950 border border-blue-800 rounded-lg px-3 py-2 w-16 text-center">
                <span className="text-2xl font-bold text-yellow-400">{formatNumber(hours)}</span>
              </div>
              <span className="text-xs text-gray-300 mt-1">ORE</span>
            </div>
            
            <div className="text-yellow-400 text-2xl font-bold self-center pb-4">:</div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-950 border border-blue-800 rounded-lg px-3 py-2 w-16 text-center">
                <span className="text-2xl font-bold text-yellow-400">{formatNumber(minutes)}</span>
              </div>
              <span className="text-xs text-gray-300 mt-1">MINUTI</span>
            </div>
            
            <div className="text-yellow-400 text-2xl font-bold self-center pb-4">:</div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-950 border border-blue-800 rounded-lg px-3 py-2 w-16 text-center">
                <span className="text-2xl font-bold text-yellow-400">{formatNumber(seconds)}</span>
              </div>
              <span className="text-xs text-gray-300 mt-1">SECONDI</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-300">
            Lo sconto del 50% è disponibile solo per 48 ore dopo la fine del webinar
          </p>
        </div>
      </motion.div>
    </div>
  );
}