"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Users, Package, BarChart3, Search, Plus, Edit, Trash2, ArrowLeft } from "lucide-react"
import axiosInstance from "../../aixos/axiosInstance"

const ManagePackage = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    durationMonths: "",
    centerId: "",
    serviceIds: "",
    isActive: true,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const recentPackages = [
    { id: 1, name: "Center A Fitness Combo", price: "₫1,500,000", status: "Active", center: "Center A" },
    { id: 2, name: "Center B Premium Gym", price: "₫3,000,000", status: "Active", center: "Center B" },
    { id: 3, name: "Center C Bowling Package", price: "₫800,000", status: "Inactive", center: "Center C" },
    { id: 4, name: "Center D Combo Deal", price: "₫2,200,000", status: "Active", center: "Center D" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, type } = target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        durationMonths: Number(form.durationMonths),
        centerId: Number(form.centerId),
        serviceIds: form.serviceIds
          .split(",")
          .map((id) => Number(id.trim()))
          .filter((id) => !isNaN(id)),
        isActive: Boolean(form.isActive),
      }
      await axiosInstance.post(
        "https://ae332185633a.ngrok-free.app/api/staff/packages",
        payload
      )
      setMessage("Tạo package thành công!")
      setForm({
        name: "",
        description: "",
        price: "",
        durationMonths: "",
        centerId: "",
        serviceIds: "",
        isActive: true,
      })
      setShowForm(false)
    } catch (err) {
      setMessage("Tạo package thất bại!")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">GB</span>
              </div>
              <span className="text-white text-xl font-bold">Staff Management</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-white text-sm">Admin</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800/50 p-1 rounded-lg w-fit">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "packages", label: "Package Management", icon: Package },
            { id: "users", label: "Service Management", icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Package Management Tab */}
        {activeTab === "packages" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-2xl font-bold">Package Management</h2>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => setShowForm((prev) => !prev)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Package
              </Button>
            </div>

            {/* Form tạo package */}
            {showForm && (
              <Card className="bg-gray-800/50 border-gray-700 mb-6">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        name="durationMonths"
                        type="number"
                        placeholder="Duration (months)"
                        value={form.durationMonths}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        name="centerId"
                        type="number"
                        placeholder="Center ID"
                        value={form.centerId}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        name="serviceIds"
                        placeholder="Service IDs (vd: 1,2,3)"
                        value={form.serviceIds}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mt-2 flex items-center">
                      <label className="text-white mr-2">Active:</label>
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={form.isActive}
                        onChange={handleChange}
                      />
                    </div>
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white mt-4"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Đang tạo..." : "Tạo Package"}
                    </Button>
                    {message && (
                      <div className="mt-2 text-white">{message}</div>
                    )}
                  </form>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search packages..."
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                    Filter
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left text-gray-400 font-medium py-3">Package Name</th>
                        <th className="text-left text-gray-400 font-medium py-3">Center</th>
                        <th className="text-left text-gray-400 font-medium py-3">Price</th>
                        <th className="text-left text-gray-400 font-medium py-3">DurationMonth</th>
                        <th className="text-left text-gray-400 font-medium py-3">Status</th>
                        <th className="text-left text-gray-400 font-medium py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPackages.map((pkg) => (
                        <tr key={pkg.id} className="border-b border-gray-700/50">
                          <td className="py-4 text-white">{pkg.name}</td>
                          <td className="py-4 text-gray-300">{pkg.center}</td>
                          <td className="py-4 text-white font-medium">{pkg.price}</td>
                          <td className="py-4 text-gray-300">1 month</td>
                          <td className="py-4">
                            <Badge variant={pkg.status === "Active" ? "default" : "secondary"}>{pkg.status}</Badge>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManagePackage