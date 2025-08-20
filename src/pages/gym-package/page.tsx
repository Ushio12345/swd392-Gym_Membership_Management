"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem,SelectTrigger, SelectValue } from "../../components/ui/select"
import { ArrowLeft } from "lucide-react"

const centerData = {
  "center-a": {
    name: "Center A",
    hours: "6:00 - 22:00",
    pricePerHour: 50000,
  },
  "center-b": {
    name: "Center B",
    hours: "5:30 - 23:00",
    pricePerHour: 60000,
  },
  "center-c": {
    name: "Center C",
    hours: "7:00 - 21:00",
    pricePerHour: 45000,
  },
  "center-d": {
    name: "Center D",
    hours: "6:30 - 22:30",
    pricePerHour: 55000,
  },
}

const GymPackagePage = () => {
  const [selectedCenter, setSelectedCenter] = useState("")
  const [usageHours, setUsageHours] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  })

  const selectedCenterData = selectedCenter ? centerData[selectedCenter as keyof typeof centerData] : null
  const totalPrice = selectedCenterData ? selectedCenterData.pricePerHour * usageHours : 0

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Gym package booking:", {
      ...formData,
      center: selectedCenter,
      hours: usageHours,
      totalPrice,
    })
    alert("Đặt gói gym thành công!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-gray-300">
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </Link>

          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">GB</span>
            </div>
            <span className="text-white text-xl font-bold">GymBow</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center">Đặt Gói Gym</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-semibold">Thông tin khách hàng</h3>

                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-300">
                      Họ và tên
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">
                      Số điện thoại
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Nhập email"
                      required
                    />
                  </div>
                </div>

                {/* Center Selection */}
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-semibold">Chọn trung tâm</h3>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Tên Center</Label>
                    <Select value={selectedCenter} onValueChange={setSelectedCenter}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Chọn center" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="center-a" className="text-white">
                          Center A
                        </SelectItem>
                        <SelectItem value="center-b" className="text-white">
                          Center B
                        </SelectItem>
                        <SelectItem value="center-c" className="text-white">
                          Center C
                        </SelectItem>
                        <SelectItem value="center-d" className="text-white">
                          Center D
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedCenterData && (
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-gray-300">
                        <span className="font-semibold">Khung thời gian hoạt động:</span> {selectedCenterData.hours}
                      </p>
                      <p className="text-gray-300">
                        <span className="font-semibold">Giá:</span>{" "}
                        {selectedCenterData.pricePerHour.toLocaleString("vi-VN")} VNĐ/giờ
                      </p>
                    </div>
                  )}
                </div>

                {/* Usage Hours */}
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-semibold">Thời gian sử dụng</h3>

                  <div className="space-y-2">
                    <Label htmlFor="hours" className="text-gray-300">
                      Số giờ sử dụng
                    </Label>
                    <Select
                      value={usageHours.toString()}
                      onValueChange={(value) => setUsageHours(Number.parseInt(value))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                          <SelectItem key={hour} value={hour.toString()} className="text-white">
                            {hour} giờ
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Total Price */}
                {totalPrice > 0 && (
                  <div className="bg-green-500/20 border border-green-500 p-4 rounded-lg">
                    <p className="text-green-400 text-xl font-bold text-center">
                      Tổng tiền: {totalPrice.toLocaleString("vi-VN")} VNĐ
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3"
                  disabled={!selectedCenter || !formData.fullName || !formData.phone || !formData.email}
                >
                  Đặt Gói Gym
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default GymPackagePage
