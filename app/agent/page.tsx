"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { MessageCircle, Clock, User, Search, Filter, MoreHorizontal, Phone, Mail, MapPin, Star } from "lucide-react"
import Link from "next/link"

interface ChatSession {
  id: string
  customer: {
    name: string
    email: string
    avatar?: string
    location: string
    rating: number
  }
  lastMessage: string
  timestamp: Date
  status: "active" | "waiting" | "closed"
  unreadCount: number
  priority: "low" | "medium" | "high"
}

export default function AgentPortal() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [agentStatus, setAgentStatus] = useState<"online" | "away" | "busy">("online")

  const chatSessions: ChatSession[] = [
    {
      id: "1",
      customer: {
        name: "John Smith",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "New York, USA",
        rating: 5,
      },
      lastMessage: "I need help with my recent order",
      timestamp: new Date(Date.now() - 120000),
      status: "active",
      unreadCount: 2,
      priority: "high",
    },
    {
      id: "2",
      customer: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        location: "London, UK",
        rating: 4,
      },
      lastMessage: "Thank you for your help!",
      timestamp: new Date(Date.now() - 300000),
      status: "waiting",
      unreadCount: 0,
      priority: "medium",
    },
    {
      id: "3",
      customer: {
        name: "Mike Chen",
        email: "mike@example.com",
        location: "Tokyo, Japan",
        rating: 5,
      },
      lastMessage: "Can you help me with billing?",
      timestamp: new Date(Date.now() - 600000),
      status: "active",
      unreadCount: 1,
      priority: "medium",
    },
  ]

  const getStatusColor = (status: typeof agentStatus) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: ChatSession["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
    }
  }

  const getChatStatusColor = (status: ChatSession["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "waiting":
        return "bg-yellow-500"
      case "closed":
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">Agent Portal</h1>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(agentStatus)} rounded-full border-2 border-white`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Sarah Anderson</p>
                  <p className="text-xs text-gray-500 capitalize">{agentStatus}</p>
                </div>
              </div>

              <select
                value={agentStatus}
                onChange={(e) => setAgentStatus(e.target.value as typeof agentStatus)}
                className="text-sm border rounded-md px-2 py-1"
              >
                <option value="online">Online</option>
                <option value="away">Away</option>
                <option value="busy">Busy</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          {/* Chat List Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Active Chats</CardTitle>
                  <Badge variant="secondary">{chatSessions.length}</Badge>
                </div>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search chats..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className="space-y-1 p-3">
                    {chatSessions.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                          selectedChat === chat.id ? "bg-blue-50 border-l-4 border-blue-500" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={chat.customer.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {chat.customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 ${getChatStatusColor(chat.status)} rounded-full border-2 border-white`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">{chat.customer.name}</p>
                              <div className="flex items-center space-x-1">
                                <Badge className={`text-xs ${getPriorityColor(chat.priority)}`}>{chat.priority}</Badge>
                                {chat.unreadCount > 0 && (
                                  <Badge className="bg-blue-500 text-white text-xs">{chat.unreadCount}</Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 truncate mt-1">{chat.lastMessage}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {chat.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            {selectedChat ? (
              <Card className="h-full">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={chatSessions.find((c) => c.id === selectedChat)?.customer.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {chatSessions
                            .find((c) => c.id === selectedChat)
                            ?.customer.name.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {chatSessions.find((c) => c.id === selectedChat)?.customer.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {chatSessions.find((c) => c.id === selectedChat)?.customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <div className="flex-1 flex">
                  {/* Chat Messages */}
                  <div className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 p-4">
                      <div className="text-center text-gray-500 py-8">
                        <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Select a chat to start messaging</p>
                      </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Input placeholder="Type your message..." className="flex-1" />
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info Sidebar */}
                  <div className="w-80 border-l bg-gray-50">
                    <div className="p-4">
                      <h4 className="font-semibold mb-4">Customer Information</h4>

                      {selectedChat && (
                        <div className="space-y-4">
                          <div className="text-center">
                            <Avatar className="w-16 h-16 mx-auto mb-2">
                              <AvatarImage
                                src={
                                  chatSessions.find((c) => c.id === selectedChat)?.customer.avatar || "/placeholder.svg"
                                }
                              />
                              <AvatarFallback>
                                {chatSessions
                                  .find((c) => c.id === selectedChat)
                                  ?.customer.name.split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <h5 className="font-medium">
                              {chatSessions.find((c) => c.id === selectedChat)?.customer.name}
                            </h5>
                            <div className="flex items-center justify-center mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < (chatSessions.find((c) => c.id === selectedChat)?.customer.rating || 0)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span>{chatSessions.find((c) => c.id === selectedChat)?.customer.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{chatSessions.find((c) => c.id === selectedChat)?.customer.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>Local time: {new Date().toLocaleTimeString()}</span>
                            </div>
                          </div>

                          <div className="pt-4 border-t">
                            <h6 className="font-medium mb-2">Quick Actions</h6>
                            <div className="space-y-2">
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                <User className="w-4 h-4 mr-2" />
                                View Profile
                              </Button>
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                <Clock className="w-4 h-4 mr-2" />
                                Chat History
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No Chat Selected</h3>
                  <p>Choose a chat from the sidebar to start helping customers</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
