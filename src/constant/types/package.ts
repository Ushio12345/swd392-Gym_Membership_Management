export interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  durationMonths: number;
  isActive: boolean;
  createdAt: string;
  centerId: number;
  centerName: string;
}
