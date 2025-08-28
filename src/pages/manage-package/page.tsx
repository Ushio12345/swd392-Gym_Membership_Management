import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Users,
  Package,
  BarChart3,
  Store,
  Search,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  Eye,
  X,
} from "lucide-react";
import {
  fetchPackages,
  createPackage,
  updatePackage,
  deletePackage,
  toggleStatus,
  fetchCenters,
  fetchServicesByCenter,
  type PackageCreateData,
} from "../../api/staff-manage";
import OrderList from "./patials/OrderList";

interface PackageData {
  id: number;
  name: string;
  description: string;
  price: number;
  durationMonths: number;
  centerId: number;
  serviceIds: number[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  center?: {
    id: number;
    name: string;
  };
  services?: Array<{
    id: number;
    name: string;
  }>;
}

interface Center {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
}

const ManagePackage = () => {
  const [activeTab, setActiveTab] = useState("packages");
  const [showForm, setShowForm] = useState(false);
  const [showPackageDetail, setShowPackageDetail] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(
    null
  );
  const [editingPackage, setEditingPackage] = useState<PackageData | null>(
    null
  );
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [centers, setCenters] = useState<Center[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    durationMonths: "",
    centerId: "",
    serviceIds: [] as number[],
    isActive: true,
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (form.centerId) {
      loadServicesByCenter(Number(form.centerId));
    }
  }, [form.centerId]);

  const loadInitialData = async () => {
    await Promise.all([loadPackages(), loadCenters()]);
  };

  const loadPackages = async () => {
    try {
      setApiLoading(true);
      const response = await fetchPackages();
      console.log("API Response:", response);

      let packagesData = [];
      if (Array.isArray(response)) {
        packagesData = response;
      } else if (response?.data && Array.isArray(response.data)) {
        packagesData = response.data;
      } else if (response?.packages && Array.isArray(response.packages)) {
        packagesData = response.packages;
      } else if (response?.result && Array.isArray(response.result)) {
        packagesData = response.result;
      } else {
        console.warn("Unexpected API response structure:", response);
        packagesData = [];
      }

      setPackages(packagesData);
    } catch (error) {
      console.error("Error loading packages:", error);
      showMessage("Không thể tải danh sách packages!", "error");
      setPackages([]);
    } finally {
      setApiLoading(false);
    }
  };
  const loadCenters = async () => {
    try {
      const response = await fetchCenters();

      const centersData = Array.isArray(response) ? response : [];

      setCenters(centersData);
    } catch (error) {
      console.error("Error loading centers:", error);
      showMessage("Không thể tải danh sách centers!", "error");
    }
  };

  const loadServicesByCenter = async (centerId: number) => {
    try {
      const response = await fetchServicesByCenter(centerId);
      const servicesData = Array.isArray(response) ? response : [];
      setServices(servicesData);
    } catch (error) {
      console.error("Error loading services:", error);
      setServices([]);
    }
  };

  const showMessage = (msg: string, type: "success" | "error" = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 5000); // Auto hide after 5 seconds
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    if (name === "serviceIds") {
      // Handle multiple service selection
      const serviceId = Number(value);
      setForm((prev) => ({
        ...prev,
        serviceIds: prev.serviceIds.includes(serviceId)
          ? prev.serviceIds.filter((id) => id !== serviceId)
          : [...prev.serviceIds, serviceId],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? target.checked : value,
      }));
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      durationMonths: "",
      centerId: "",
      serviceIds: [],
      isActive: true,
    });
    setEditingPackage(null);
    setShowForm(false);
    setServices([]);
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload: PackageCreateData = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        durationMonths: Number(form.durationMonths),
        centerId: Number(form.centerId),
        serviceIds: form.serviceIds,
        isActive: Boolean(form.isActive),
      };

      let result;
      if (editingPackage) {
        result = await updatePackage(editingPackage.id, payload);
        showMessage("Cập nhật package thành công!", "success");
      } else {
        result = await createPackage(payload);
        showMessage("Tạo package thành công!", "success");

        if (result) {
          const newPackage = result.package || result.data || result;
          if (newPackage && newPackage.id) {
            setSelectedPackage(newPackage);
            setShowPackageDetail(true);
          }
        }
      }

      await loadPackages();
      resetForm();
    } catch (error: any) {
      console.error("Error saving package:", error);
      const errorMessage =
        error?.message ||
        (editingPackage
          ? "Cập nhật package thất bại!"
          : "Tạo package thất bại!");
      showMessage(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg: PackageData) => {
    setEditingPackage(pkg);
    setForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price.toString(),
      durationMonths: pkg.durationMonths.toString(),
      centerId: pkg.centerId.toString(),
      serviceIds: pkg.serviceIds || [],
      isActive: pkg.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number, packageName: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa package "${packageName}"?`))
      return;

    try {
      setApiLoading(true);
      await deletePackage(id);
      showMessage("Xóa package thành công!", "success");
      await loadPackages();
    } catch (error: any) {
      console.error("Error deleting package:", error);
      const errorMessage = error?.message || "Xóa package thất bại!";
      showMessage(errorMessage, "error");
    } finally {
      setApiLoading(false);
    }
  };

  const handleToggleStatus = async (
    id: number,
    currentStatus: boolean,
    packageName: string
  ) => {
    const action = currentStatus ? "vô hiệu hóa" : "kích hoạt";
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn ${action} package "${packageName}"?`
      )
    )
      return;

    try {
      setApiLoading(true);
      await toggleStatus(id);
      showMessage(
        `${currentStatus ? "Vô hiệu hóa" : "Kích hoạt"} package thành công!`,
        "success"
      );
      await loadPackages();
    } catch (error: any) {
      console.error("Error toggling status:", error);
      const errorMessage = error?.message || "Thay đổi trạng thái thất bại!";
      showMessage(errorMessage, "error");
    } finally {
      setApiLoading(false);
    }
  };

  const handleViewDetails = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setShowPackageDetail(true);
  };

  const filteredPackages = Array.isArray(packages)
    ? packages.filter(
        (pkg) =>
          pkg?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg?.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm b<Store />-b b<Store />-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">PM</span>
              </div>
              <span className="text-white text-xl font-bold">
                Package Management
              </span>
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
            { id: "order", label: "Order Management", icon: Store },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
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
              <h2 className="text-white text-2xl font-bold">
                Package Management
              </h2>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => setShowForm((prev) => !prev)}
                disabled={apiLoading}
              >
                <Plus className="w-4 h-4 mr-2" />
                {editingPackage ? "Edit Package" : "Create Package"}
              </Button>
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg flex items-center space-x-2 ${
                  messageType === "success"
                    ? "bg-green-500/20 text-green-400 b<Store /> b<Store />-green-500/30"
                    : "bg-red-500/20 text-red-400 b<Store /> b<Store />-red-500/30"
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                <span>{message}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setMessage("")}
                  className="ml-auto text-xs"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}

            {showForm && (
              <Card className="bg-gray-800/50 b<Store />-gray-700 mb-6">
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
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        placeholder="Package Name"
                        value={form.name}
                        onChange={handleChange}
                        className="bg-gray-700 b<Store />-gray-600 text-white"
                        required
                      />
                      <Input
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="bg-gray-700 b<Store />-gray-600 text-white"
                        required
                      />
                      <Input
                        name="price"
                        type="number"
                        placeholder="Price (VND)"
                        value={form.price}
                        onChange={handleChange}
                        className="bg-gray-700 b<Store />-gray-600 text-white"
                        required
                        min={0}
                      />
                      <Input
                        name="durationMonths"
                        type="number"
                        placeholder="Duration (months)"
                        value={form.durationMonths}
                        onChange={handleChange}
                        className="bg-gray-700 b<Store />-gray-600 text-white"
                        required
                        min={0}
                      />

                      <select
                        name="centerId"
                        value={form.centerId}
                        onChange={handleChange}
                        className="bg-gray-700 b<Store />-gray-600 text-white rounded-md px-3 py-2"
                        required
                      >
                        <option value="">Select Center</option>
                        {centers.map((center) => (
                          <option key={center.id} value={center.id}>
                            {center.name}
                          </option>
                        ))}
                      </select>

                      <div className="space-y-2">
                        <label className="text-white text-sm">Services:</label>
                        <div className="max-h-32 overflow-y-auto bg-gray-700 b<Store /> b<Store />-gray-600 rounded-md p-2">
                          {services.length > 0 ? (
                            services.map((service) => (
                              <label
                                key={service.id}
                                className="flex items-center space-x-2 text-white text-sm"
                              >
                                <input
                                  type="checkbox"
                                  name="serviceIds"
                                  value={service.id}
                                  checked={form.serviceIds.includes(service.id)}
                                  onChange={handleChange}
                                  className="w-4 h-4"
                                />
                                <span>{service.name}</span>
                              </label>
                            ))
                          ) : (
                            <span className="text-gray-400 text-sm">
                              {form.centerId
                                ? "Loading services..."
                                : "Select a center first"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={form.isActive}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-700 b<Store />-gray-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="isActive" className="text-white">
                        Active Package
                      </label>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-white"
                        type="submit"
                        disabled={loading}
                      >
                        {loading
                          ? "Processing..."
                          : editingPackage
                          ? "Update Package"
                          : "Create Package"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="b<Store />-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Package List */}
            <Card className="bg-gray-800/50 b<Store />-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search packages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 b<Store />-gray-600 text-white placeholder-gray-400"
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
                      <tr className="b<Store />-b b<Store />-gray-700">
                        <th className="text-left text-gray-400 font-medium py-3">
                          ID
                        </th>
                        <th className="text-left text-gray-400 font-medium py-3">
                          Package Name
                        </th>
                        <th className="text-left text-gray-400 font-medium py-3">
                          Description
                        </th>
                        <th className="text-left text-gray-400 font-medium py-3">
                          Price
                        </th>
                        <th className="text-left text-gray-400 font-medium py-3">
                          Duration
                        </th>
                        <th className="text-left text-gray-400 font-medium py-3">
                          Center ID
                        </th>
                        <th className="text-left text-gray-400 font-medium py-3">
                          Status
                        </th>
                        <th className="text-left text-gray-400 font-medium py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPackages.length > 0 ? (
                        filteredPackages.map((pkg) => (
                          <tr
                            key={pkg.id}
                            className="b<Store />-b b<Store />-gray-700/50 hover:bg-gray-700/30"
                          >
                            <td className="py-4 text-gray-300">#{pkg.id}</td>
                            <td className="py-4 text-white font-medium">
                              {pkg.name}
                            </td>
                            <td className="py-4 text-gray-300 max-w-xs truncate">
                              {pkg.description}
                            </td>
                            <td className="py-4 text-green-400 font-medium">
                              {pkg.price.toLocaleString("vi-VN")} VND
                            </td>
                            <td className="py-4 text-gray-300">
                              {pkg.durationMonths} tháng
                            </td>
                            <td className="py-4 text-gray-300">
                              {pkg.centerId}
                            </td>
                            <td className="py-4">
                              <Badge
                                variant={pkg.isActive ? "default" : "secondary"}
                                className={
                                  pkg.isActive
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-500 text-white"
                                }
                              >
                                {pkg.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </td>
                            <td className="py-4">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-purple-400 hover:text-purple-300"
                                  onClick={() => handleViewDetails(pkg)}
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-blue-400 hover:text-blue-300"
                                  onClick={() => handleEdit(pkg)}
                                  disabled={apiLoading}
                                  title="Edit Package"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className={
                                    pkg.isActive
                                      ? "text-yellow-400 hover:text-yellow-300"
                                      : "text-green-400 hover:text-green-300"
                                  }
                                  onClick={() =>
                                    handleToggleStatus(
                                      pkg.id,
                                      pkg.isActive,
                                      pkg.name
                                    )
                                  }
                                  disabled={apiLoading}
                                  title={
                                    pkg.isActive ? "Deactivate" : "Activate"
                                  }
                                >
                                  {pkg.isActive ? "🔴" : "🟢"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-400 hover:text-red-300"
                                  onClick={() => handleDelete(pkg.id, pkg.name)}
                                  disabled={apiLoading}
                                  title="Delete Package"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={8}
                            className="py-8 text-center text-gray-400"
                          >
                            {apiLoading
                              ? "Đang tải..."
                              : "Không có packages nào"}
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

        {activeTab === "order" && (
          <div className="w-full">
            <OrderList />
          </div>
        )}

        <Dialog open={showPackageDetail} onOpenChange={setShowPackageDetail}>
          <DialogContent className="bg-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Package Details
              </DialogTitle>
            </DialogHeader>
            {selectedPackage && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Package ID</label>
                    <p className="text-white font-medium">
                      #{selectedPackage.id}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <div className="mt-1">
                      <Badge
                        variant={
                          selectedPackage.isActive ? "default" : "secondary"
                        }
                        className={
                          selectedPackage.isActive
                            ? "bg-green-500 text-white"
                            : "bg-gray-500 text-white"
                        }
                      >
                        {selectedPackage.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">
                      Package Name
                    </label>
                    <p className="text-white font-medium">
                      {selectedPackage.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Price</label>
                    <p className="text-green-400 font-medium">
                      {selectedPackage.price.toLocaleString("vi-VN")} VND
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Duration</label>
                    <p className="text-white">
                      {selectedPackage.durationMonths} months
                    </p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Center ID</label>
                    <p className="text-white">{selectedPackage.centerId}</p>
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Description</label>
                  <p className="text-white mt-1">
                    {selectedPackage.description}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Service IDs</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedPackage.serviceIds?.map((serviceId) => (
                      <Badge
                        key={serviceId}
                        variant="outline"
                        className="b<Store />-gray-600 text-gray-300"
                      >
                        Service #{serviceId}
                      </Badge>
                    ))}
                  </div>
                </div>
                {selectedPackage.createdAt && (
                  <div>
                    <label className="text-gray-400 text-sm">Created At</label>
                    <p className="text-white">
                      {new Date(selectedPackage.createdAt).toLocaleString(
                        "vi-VN"
                      )}
                    </p>
                  </div>
                )}
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowPackageDetail(false)}
                    className="b<Store />-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      handleEdit(selectedPackage);
                      setShowPackageDetail(false);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Package
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ManagePackage;
