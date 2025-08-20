"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { ArrowLeft, Clock, MapPin, Star } from "lucide-react"
import axiosInstance from "../../aixos/axiosInstance"

interface Package {
  id: number
  name: string
  description: string
  price: number
  durationMonths: number
  isActive: boolean
  createdAt: string
  centerId: number
  centerName: string
}

const PackagePlan = () => {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true)
        setError("")
        
        // Gọi API qua proxy
        const response = await axiosInstance.get("/api/package-plans")
        
        console.log("API Response:", response.data)
        
        // Kiểm tra và set data
        if (response.data && Array.isArray(response.data)) {
          setPackages(response.data)
        } else {
          console.warn("API response is not an array:", response.data)
          setPackages([])
          setError("Định dạng dữ liệu từ API không đúng")
        }
      } catch (error: any) {
        console.error("Error fetching packages:", error)
        setPackages([])
        
        // Thử với fetch API nếu axios fail
        try {
          console.log("Trying with fetch API...")
          const fetchResponse = await fetch("/api/package-plans", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true"
            }
          })
          
          if (fetchResponse.ok) {
            const data = await fetchResponse.json()
            if (Array.isArray(data)) {
              setPackages(data)
              setError("")
              return
            }
          }
        } catch (fetchError) {
          console.error("Fetch also failed:", fetchError)
        }
        
        // Xử lý lỗi chi tiết hơn
        if (error.response) {
          setError(`Lỗi từ server: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`)
        } else if (error.request) {
          setError("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc CORS policy.")
        } else {
          setError(`Lỗi: ${error.message}`)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const getPackageType = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes("gym") && lowerName.includes("bowling")) return "combo"
    if (lowerName.includes("gym")) return "gym"
    if (lowerName.includes("bowling")) return "bowling"
    return "combo"
  }

  const getPackageColor = (type: string) => {
    switch (type) {
      case "gym":
        return "bg-red-500"
      case "bowling":
        return "bg-blue-500"
      default:
        return "bg-green-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">GB</span>
              </div>
              <span className="text-white text-xl font-bold">GymBow</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link to="/packages" className="text-blue-400 hover:text-blue-300 transition-colors">
              Packages
            </Link>
            <Link to="/services" className="text-white hover:text-gray-300 transition-colors">
              Services
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-300 transition-colors">
              Contact
            </Link>
          </nav>

          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black bg-transparent">
            Sign Up
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="text-green-400">Packages</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose from our premium fitness and bowling packages designed to fit your lifestyle and goals.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
            <p className="text-white ml-4">Đang tải packages...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-400 text-lg mb-4">Có lỗi xảy ra:</p>
              <p className="text-red-300 text-sm">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-red-500 hover:bg-red-600"
              >
                Thử lại
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => {
              const packageType = getPackageType(pkg.name)
              const colorClass = getPackageColor(packageType)

              return (
                <Card
                  key={pkg.id}
                  className="bg-gray-800/50 backdrop-blur-sm border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${colorClass} text-white capitalize`}>{packageType}</Badge>
                      {pkg.isActive && (
                        <Badge variant="outline" className="border-green-400 text-green-400">
                          <Star className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-white text-xl">{pkg.name}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">{pkg.description}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {pkg.durationMonths} month{pkg.durationMonths > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{pkg.centerName}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-600 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-white">{formatPrice(pkg.price)}</p>
                          <p className="text-sm text-gray-400">
                            for {pkg.durationMonths} month{pkg.durationMonths > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        {packageType === "gym" && (
                          <Link to="/gym-package" className="flex-1">
                            <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Book Gym</Button>
                          </Link>
                        )}

                        {packageType === "bowling" && (
                          <Link to="/bowling-package" className="flex-1">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Book Bowling</Button>
                          </Link>
                        )}

                        {packageType === "combo" && (
                          <>
                            <Link to="/gym-package" className="flex-1">
                              <Button className="w-full bg-red-500 hover:bg-red-600 text-white text-xs">Book Gym</Button>
                            </Link>
                            <Link to="/bowling-package" className="flex-1">
                              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs">Book Bowling</Button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {!loading && !error && packages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Hiện tại chưa có packages nào.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default PackagePlan