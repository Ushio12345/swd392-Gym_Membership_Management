"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "lucide-react"
import { CheckCircle, User, Clock, Dumbbell } from "lucide-react"
import { Link } from "react-router-dom"

interface GymPackage {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
  popular?: boolean
}

const GymPackagePage = () => {
  const [packages, setPackages] = useState<GymPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // Mock API call to fetch gym packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockPackages: GymPackage[] = [
          {
            id: "1",
            name: "Gói Cơ Bản",
            price: 500000,
            duration: "1 tháng",
            features: ["Sử dụng thiết bị gym", "Phòng tập chung", "Tư vấn cơ bản"],
          },
          {
            id: "2",
            name: "Gói Tiêu Chuẩn",
            price: 1200000,
            duration: "3 tháng",
            features: ["Tất cả tính năng gói cơ bản", "PT hỗ trợ 2 buổi/tuần", "Phòng tập riêng", "Đánh giá thể lực"],
            popular: true,
          },
          {
            id: "3",
            name: "Gói Premium",
            price: 2000000,
            duration: "6 tháng",
            features: [
              "Tất cả tính năng gói tiêu chuẩn",
              "PT riêng 1-1",
              "Chế độ dinh dưỡng",
              "Massage thư giãn",
              "Ưu tiên đặt lịch",
            ],
          },
        ]

        setPackages(mockPackages)
      } catch (error) {
        console.error("Error fetching packages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()

    // Check authentication status (mock)
    const checkAuth = () => {
      const token = localStorage.getItem("authToken")
      setIsAuthenticated(!!token)
    }

    checkAuth()
  }, [])

  const handleBookPackage = async (packageId: string) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }

    try {
      // Mock API call to book package
      const response = await fetch("/api/book-gym-package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ packageId }),
      })

      if (response.ok) {
        alert("Đặt gói thành công!")
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại!")
      }
    } catch (error) {
      console.error("Error booking package:", error)
      alert("Có lỗi xảy ra, vui lòng thử lại!")
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Dumbbell className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold text-white">
              <span className="text-green-500">GymBow</span> - Gói Tập Gym
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Chọn Gói Tập Phù Hợp</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Khám phá các gói tập gym đa dạng với thiết bị hiện đại và huấn luyện viên chuyên nghiệp
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative bg-white/10 backdrop-blur-sm border-gray-600 text-white ${pkg.popular ? "ring-2 ring-green-500" : ""}`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                  Phổ Biến Nhất
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                <CardDescription className="text-gray-300">
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Clock className="h-4 w-4" />
                    {pkg.duration}
                  </div>
                </CardDescription>
                <div className="text-3xl font-bold text-green-500 mt-4">{formatPrice(pkg.price)}</div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleBookPackage(pkg.id)}
                  className={`w-full ${pkg.popular ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white font-semibold`}
                >
                  Đặt Gói Ngay
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-white max-w-md mx-4">
            <CardHeader className="text-center">
              <User className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle className="text-black">Đăng Nhập Để Tiếp Tục</CardTitle>
              <CardDescription className="text-black">Bạn cần đăng nhập để đặt gói tập gym</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link 
              to="/auth"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white">Đăng Nhập
              </Link>
              <Button variant="outline" className="w-full bg-transparent text-black" onClick={() => setShowLoginPrompt(false)}>
                Hủy
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default GymPackagePage
