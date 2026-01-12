"use client"

import Link from "next/link"
import { Activity, Bell, BarChart3, Globe, Zap, Lock, Clock, Github, Monitor, Server } from "lucide-react"
import localFont from 'next/font/local';
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { IoIosArrowRoundForward, IoLogoGithub } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import FeatureCards from "@/components/features";
import { useRouter } from "next/navigation";
import ArchCard from "@/components/ArchCard";
import { EffectScene } from "@/components/ascii-scene";

export const Ros = localFont({
  src: './RoslindaleDisplay.ttf',
  weight: "400",
  style: "normal"
})


const ArchInfo = [
  {
    title: "You Add It",
    description: "Drop your website link into Relio. No tech stress, no setup drama. Just add the URL and you’re good to go. We handle the rest behind the scenes."
  },
  {
    title: "We Check It",
    description: "Our global workers from different regions keep pinging your site to make sure it’s online, fast, and not acting weird. If your site blinks, we notice."
  },
  {
    title: "We Save It",
    description: "All the uptime, speed, and status data gets stored safely so you can track performance, spot issues, and stay in control like a pro."
  },
  {
    title: "We Alert You",
    description: "If something breaks, you’ll know instantly. Email, Slack, SMS — we make sure you’re never the last one to find out."
  }
];


export default function Landing() {

  const router = useRouter()
  return (
    <>
      <nav className="w-full z-50 fixed px-60 py-10">
        <div className="w-full border border-gray-800/25 rounded-xl px-2 py-2 backdrop-blur-sm flex items-center justify-between">
          <Logo />
          <div className="flex gap-3">
            <Button>
              <Link target="_blank" href={"https://github.com/abheeee03"}>
                <IoLogoGithub />
              </Link>
            </Button>
            <Button>
              <Link href={"https://x.com/_AbhayHere"}>
                <FaXTwitter />
              </Link>
            </Button>
            <Button onClick={() => {
              router.push('/login')
            }} size={"sm"}>
              Login
            </Button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="relative text-white h-screen w-full bg-[#000000]">
        <div className="absolute flex items-center justify-center flex-col bottom-0 left-0 right-0 top-0 bg-[radial-gradient(180%_130%_at_45%_10%,rgba(255,255,255,0)_20%,rgba(94,47,218,1)_100%)]">
          <div className="flex flex-col items-center justify-center gap-10">
            <span className={`text-center ${Ros.className} text-8xl`}>
              <h1 className="text-white">
                Stay Online.
              </h1>
              <h1>
                Stay Winning.
              </h1>
            </span>
            <p className="text-xl text-center">Real-time uptime monitoring so <br /> you can chill while we watch your servers.</p>
          </div>
          <div className="flex gap-5 mt-15">
            <Button size={"lg"} className="bg-white text-black hover:bg-white/90">
              Get Started <IoIosArrowRoundForward />
            </Button>
            <Button size={"lg"}>
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <div className="h-screen w-full flex items-center text-black bg-[#412097] justify-center px-3">
        <div className="h-full w-full flex flex-col items-center justify-center border rounded-lg bg-white px-10">
          <div className="flex flex-col w-full items-center justify-center mb-5">
            <h4 className="text-2xl">What Relio Actually Does</h4>
            <h1 className={`text-6xl ${Ros.className}`}>Everything Your Site Needs.</h1>
          </div>
          <FeatureCards />
        </div>

      </div>

      <div className={`bg-[#412097] w-full text-center h-full py-10 ${Ros.className} text-7xl`}>How This Works?</div>
      <section className="bg-[#412097] w-full">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-screen hidden md:sticky top-0 md:flex items-center justify-center bg-[#412097]">
            <EffectScene />
          </div>

          <div className="min-h-[300vh] py-50 px-10 flex flex-col justify-between items-start z-10 bg-[#412097]">
            {ArchInfo.map((option, index) => (
              <ArchCard
                key={index}
                title={option.title}
                description={option.description}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="h-screen w-full"></div>
    </>
  )
}