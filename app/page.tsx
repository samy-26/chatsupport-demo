"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, BarChart3, Zap, Shield, Globe } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      icon: MessageCircle,
      title: "Real-Time Chat",
      description: "Instant messaging with typing indicators and read receipts",
      color: "bg-blue-500",
    },
    {
      icon: Users,
      title: "Agent Management",
      description: "Smart queue assignment and agent performance tracking",
      color: "bg-green-500",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and performance metrics",
      color: "bg-purple-500",
    },
    {
      icon: Globe,
      title: "Omnichannel Support",
      description: "Web chat with SMS fallback for seamless communication",
      color: "bg-orange-500",
    },
  ]

  const stats = [
    { label: "Active Chats", value: "24", change: "+12%" },
    { label: "Response Time", value: "1.2m", change: "-8%" },
    { label: "Satisfaction", value: "98%", change: "+5%" },
    { label: "Agents Online", value: "8", change: "+2" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ChatSupport Pro
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/chat">
                <Button variant="ghost" className="hover:bg-blue-50">
                  Customer Chat
                </Button>
              </Link>
              <Link href="/agent">
                <Button variant="ghost" className="hover:bg-green-50">
                  Agent Portal
                </Button>
              </Link>
              <Link href="/admin">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Admin Dashboard
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
              <Zap className="w-3 h-3 mr-1" />
              Real-Time Support Platform
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
              Transform Your Customer Support Experience
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Deliver exceptional customer service with our modern chat support system featuring real-time messaging,
              smart agent routing, and comprehensive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                >
                  Start Live Chat
                  <MessageCircle className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
                >
                  View Dashboard
                  <BarChart3 className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Powerful Features for Modern Support</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to deliver exceptional customer support experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                  hoveredCard === index ? "scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 ${
                      hoveredCard === index ? "rotate-12 scale-110" : ""
                    }`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Customer Support?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses already using ChatSupport Pro to deliver exceptional customer experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
                >
                  Try Live Chat Now
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200"
              >
                <Shield className="mr-2 w-4 h-4" />
                Enterprise Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">ChatSupport Pro</span>
              </div>
              <p className="text-gray-400">Modern chat support platform for exceptional customer experiences.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/chat" className="hover:text-white transition-colors">
                    Live Chat
                  </Link>
                </li>
                <li>
                  <Link href="/agent" className="hover:text-white transition-colors">
                    Agent Portal
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-white transition-colors">
                    Admin Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Real-time Messaging</li>
                <li>SMS Fallback</li>
                <li>Analytics</li>
                <li>Ticket Management</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Contact Support</li>
                <li>Status Page</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ChatSupport Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
