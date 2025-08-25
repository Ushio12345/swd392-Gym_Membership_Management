"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Users, Package, BarChart3, Search, Plus, Edit, Trash2, ArrowLeft, AlertCircle } from "lucide-react"
import { 
  fetchPackages, 
  createPackage, 
  updatePackage, 
  deletePackage, 
  toggleStatus 
} from "../../api/staff-manage"

interface PackageData {
  id: number
  name: string
  description: string
  price: number
  durationMonths: number
  centerId: number
  serviceIds: number[]
  isActive: boolean
  createdAt?: string
  updatedAt?: string
  center?: {
    id: number
    name: string
  }
  services?: Array<{
    id: number
    name: string
  }>
}

const ManagePackage = () => {
  const [activeTab, setActiveTab] = useState("packages")
  const [showForm, setShowForm] = useState(false)
  const [editingPackage, setEditingPackage] = useState<PackageData | null>(null)
  const [packages, setPackages] = useState<PackageData[]>([])
  const [loading, setLoading] = useState(false)
  const [apiLoading, setApiLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    durationMonths: "",
    centerId: "",
    serviceIds: "",
    isActive: true,
  })

  // Load packages when component mounts
  useEffect(() => {
    loadPackages()
  }, [])

  const loadPackages = async () => {
    try {
      setApiLoading(true)
      const response = await fetchPackages()
      console.log("API Response:", response) // Debug log
      
      // Handle different response structures
      let packagesData = []
      if (Array.isArray(response)) {
        packagesData = response
      } else if (response?.data && Array.isArray(response.data)) {
        packagesData = response.data
      } else if (response?.packages && Array.isArray(response.packages)) {
        packagesData = response.packages
      } else if (response?.result && Array.isArray(response.result)) {
        packagesData = response.result
      } else {
        console.warn("Unexpected API response structure:", response)
        packagesData = []
      }
      
      setPackages(packagesData)
    } catch (error) {
      console.error("Error loading packages:", error)
      setMessage("Không thể tải danh sách packages!")
      setPackages([]) // Ensure packages is always an array
    } finally {
      setApiLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, type } = target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value,
    }))
  }

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      durationMonths: "",
      centerId: "",
      serviceIds: "",
      isActive: true,
    })
    setEditingPackage(null)
    setShowForm(false)
    setMessage("")
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

      if (editingPackage) {
        // Update existing package
        await updatePackage(editingPackage.id, payload)
        setMessage("Cập nhật package thành công!")
      } else {
        // Create new package
        await createPackage(payload)
        setMessage("Tạo package thành công!")
      }
      
      await loadPackages() // Reload packages
      resetForm()
    } catch (error) {
      console.error("Error saving package:", error)
      setMessage(editingPackage ? "Cập nhật package thất bại!" : "Tạo package thất bại!")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (pkg: PackageData) => {
    setEditingPackage(pkg)
    setForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price.toString(),
      durationMonths: pkg.durationMonths.toString(),
      centerId: pkg.centerId.toString(),
      serviceIds: pkg.serviceIds.join(", "),
      isActive: pkg.isActive,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa package này?")) return

    try {
      setApiLoading(true)
      await deletePackage(id)
      setMessage("Xóa package thành công!")
      await loadPackages()
    } catch (error) {
      console.error("Error deleting package:", error)
      setMessage("Xóa package thất bại!")
    } finally {
      setApiLoading(false)
    }
  }

  const handleToggleStatus = async (id: number) => {
    try {
      setApiLoading(true)
      await toggleStatus(id)
      setMessage("Thay đổi trạng thái thành công!")
      await loadPackages()
    } catch (error) {
      console.error("Error toggling status:", error)
      setMessage("Thay đổi trạng thái thất bại!")
    } finally {
      setApiLoading(false)
    }
  }

  // Filter packages based on search term - Add safety check
  const filteredPackages = Array.isArray(packages) ? packages.filter(pkg =>
    pkg?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : []

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
                disabled={apiLoading}
              >
                <Plus className="w-4 h-4 mr-2" />
                {editingPackage ? "Edit Package" : "Create Package"}
              </Button>
            </div>

            {/* Status Messages */}
            {message && (
              <div className={`p-4 rounded-lg flex items-center space-x-2 ${
                message.includes("thành công") || message.includes("success") 
                  ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}>
                <AlertCircle className="w-4 h-4" />
                <span>{message}</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setMessage("")}
                  className="ml-auto text-xs"
                >
                  ✕
                </Button>
              </div>
            )}

            {/* Form tạo/sửa package */}
            {showForm && (
              <Card className="bg-gray-800/50 border-gray-700 mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-lg font-semibold">
                      {editingPackage ? "Edit Package" : "Create New Package"}
                    </h3>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={resetForm}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        placeholder="Package Name"
                        value={form.name}
                        onChange={handleChange}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                      <Input
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                      <Input
                        name="price"
                        type="number"
                        placeholder="Price (VND)"
                        value={form.price}
                        onChange={handleChange}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                      <Input
                        name="durationMonths"
                        type="number"
                        placeholder="Duration (months)"
                        value={form.durationMonths}
                        onChange={handleChange}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                      <Input
                        name="centerId"
                        type="number"
                        placeholder="Center ID"
                        value={form.centerId}
                        onChange={handleChange}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                      <Input
                        name="serviceIds"
                        placeholder="Service IDs (e.g: 1,2,3)"
                        value={form.serviceIds}
                        onChange={handleChange}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={form.isActive}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="isActive" className="text-white">Active Package</label>
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-white"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : (editingPackage ? "Update Package" : "Create Package")}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Package List */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search packages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <Button 
                    onClick={loadPackages} 
                    disabled={apiLoading}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {apiLoading ? "Loading..." : "Refresh"}
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left text-gray-400 font-medium py-3">ID</th>
                        <th className="text-left text-gray-400 font-medium py-3">Package Name</th>
                        <th className="text-left text-gray-400 font-medium py-3">Description</th>
                        <th className="text-left text-gray-400 font-medium py-3">Price</th>
                        <th className="text-left text-gray-400 font-medium py-3">Duration</th>
                        <th className="text-left text-gray-400 font-medium py-3">Center ID</th>
                        <th className="text-left text-gray-400 font-medium py-3">Status</th>
                        <th className="text-left text-gray-400 font-medium py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPackages.length > 0 ? (
                        filteredPackages.map((pkg) => (
                          <tr key={pkg.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                            <td className="py-4 text-gray-300">#{pkg.id}</td>
                            <td className="py-4 text-white font-medium">{pkg.name}</td>
                            <td className="py-4 text-gray-300 max-w-xs truncate">{pkg.description}</td>
                            <td className="py-4 text-green-400 font-medium">
                              {pkg.price.toLocaleString('vi-VN')} VND
                            </td>
                            <td className="py-4 text-gray-300">{pkg.durationMonths} tháng</td>
                            <td className="py-4 text-gray-300">{pkg.centerId}</td>
                            <td className="py-4">
                              <Badge 
                                variant={pkg.isActive ? "default" : "secondary"}
                                className={pkg.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}
                              >
                                {pkg.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </td>
                            <td className="py-4">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-blue-400 hover:text-blue-300"
                                  onClick={() => handleEdit(pkg)}
                                  disabled={apiLoading}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-yellow-400 hover:text-yellow-300"
                                  onClick={() => handleToggleStatus(pkg.id)}
                                  disabled={apiLoading}
                                  title="Toggle Status"
                                >
                                  {pkg.isActive ? "🔴" : "🟢"}
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-red-400 hover:text-red-300"
                                  onClick={() => handleDelete(pkg.id)}
                                  disabled={apiLoading}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-gray-400">
                            {apiLoading ? "Đang tải..." : "Không có packages nào"}
                          </td>
                        </tr>
                      )}
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