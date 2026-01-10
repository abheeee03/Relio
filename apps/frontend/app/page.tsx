"use client"

import Link from "next/link"
import { Activity, Bell, BarChart3, Globe, Zap, Lock, Clock, Github } from "lucide-react"

import localFont from 'next/font/local';
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { IoIosArrowRoundForward, IoLogoGithub } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import Marquee from "@/components/Marquee";
import FeatureCards from "@/components/features";
import { useRouter } from "next/navigation";


const Ros = localFont({
  src: './RoslindaleDisplay.ttf',
  weight: "400",
  style: "normal"
})

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
            <Button onClick={()=>{
              router.push('/login')
            }} size={"sm"}>
              Login
            </Button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="text-white h-screen w-full bg-[#000000]">
        <div className="absolute flex flex-col items-center justify-center bottom-0 left-0 right-0 top-0 bg-[radial-gradient(110%_120%_at_45%_0%,rgba(255,255,255,0)_45%,rgba(102,51,238,1)_100%)]">
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
      <div className="relative h-screen w-full bg-[#fafafa]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:2rem_1.5rem] "></div>
        <div className="absolute px-10 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(0deg,_rgba(244,244,244,0)_23%,_rgba(68,51,204,0.7)_80%,_rgba(94,47,218,1)_94%)]">
         <div className="mt-20 text-white">
           <h4 className="text-lg font-medium">What Relio Actually Does</h4>
          <h1 className={`text-5xl ${Ros.className}`}>Everything Your Site Needs.</h1>
          <div className="">
            <FeatureCards/>
          </div>
        </div>
        </div>
        
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need to Stay Online
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Powerful monitoring tools designed to give you peace of mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border border-blue-100 dark:border-blue-900">
              <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Real-Time Monitoring
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Monitor your websites every 30 seconds from multiple global locations with instant status updates.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border border-purple-100 dark:border-purple-900">
              <div className="h-12 w-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Instant Alerts
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Get notified immediately via email, SMS, Slack, or webhook when your site goes down.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-100 dark:border-green-900">
              <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Detailed Analytics
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Track response times, uptime percentage, and performance metrics with beautiful dashboards.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 border border-orange-100 dark:border-orange-900">
              <div className="h-12 w-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Global Coverage
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Monitor from 10+ locations worldwide to ensure your site is accessible everywhere.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/50 dark:to-amber-950/50 border border-yellow-100 dark:border-yellow-900">
              <div className="h-12 w-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Performance Metrics
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Track response times, DNS resolution, SSL certificate expiry, and more.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 border border-indigo-100 dark:border-indigo-900">
              <div className="h-12 w-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Secure & Reliable
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Enterprise-grade security with encrypted data and 99.9% uptime SLA for monitoring infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              How Relio Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Built on modern, scalable infrastructure for reliable monitoring
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Distributed Monitoring System
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Worker Pool</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Multiple workers continuously check your websites from different global locations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Redis Stream</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Fast message queue processes check results and triggers alerts in real-time.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Pusher Integration</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      WebSocket connections provide instant updates to your dashboard without refreshing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Data Storage</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      PostgreSQL database stores historical data for detailed analytics and reporting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-slate-900 dark:text-white">Your Website</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="h-8 w-0.5 bg-slate-300 dark:bg-slate-700"></div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border-2 border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    <Activity className="h-6 w-6 text-green-600" />
                    <span className="font-semibold text-slate-900 dark:text-white">Worker Pool (30s checks)</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="h-8 w-0.5 bg-slate-300 dark:bg-slate-700"></div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-purple-600" />
                    <span className="font-semibold text-slate-900 dark:text-white">Redis Stream Queue</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="h-8 w-0.5 bg-slate-300 dark:bg-slate-700"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border-2 border-orange-200 dark:border-orange-800">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Bell className="h-6 w-6 text-orange-600" />
                      <span className="font-semibold text-sm text-slate-900 dark:text-white">Alerts</span>
                    </div>
                  </div>
                  <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg border-2 border-cyan-200 dark:border-cyan-800">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <BarChart3 className="h-6 w-6 text-cyan-600" />
                      <span className="font-semibold text-sm text-slate-900 dark:text-white">Dashboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Fast Response</h4>
              <p className="text-slate-600 dark:text-slate-400">
                Detect downtime within 30 seconds and alert you in under a minute
              </p>
            </div>
            <div className="text-center p-6">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Highly Secure</h4>
              <p className="text-slate-600 dark:text-slate-400">
                All data encrypted in transit and at rest with enterprise-grade security
              </p>
            </div>
            <div className="text-center p-6">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Scalable</h4>
              <p className="text-slate-600 dark:text-slate-400">
                Monitor from 1 to 10,000+ websites with the same reliability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Monitoring Your Websites Today
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of developers and businesses who trust Relio for uptime monitoring
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/home" className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition text-lg font-semibold shadow-xl">
              Get Started for Free
            </Link>
            <a href="#features" className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition text-lg font-semibold">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold text-white">Relio</span>
              </div>
              <p className="text-sm text-slate-400">
                Reliable website uptime monitoring for modern teams.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
                <li><a href="#architecture" className="hover:text-blue-400 transition">Architecture</a></li>
                <li><Link href="/home" className="hover:text-blue-400 transition">Dashboard</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Security</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400">
              © 2026 Relio. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                Twitter
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                GitHub
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}