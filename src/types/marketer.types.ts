export interface MarketerDetailSmd {
  smd_closing_id: string;
  smd_id: string;
  smd_code: string;
  monthly_rent: number;
  sell_price: number;
  status: string;
  total_paid_to_customer: number;
}

export interface MarketerDetailCustomer {
  customer_id: string;
  full_name: string;
  smds: MarketerDetailSmd[];
}

export interface MarketerDetail {
  marketer_id: string;
  full_name: string;
  email: string;
  commission_type: "percentage" | "fixed";
  commission_value: number;
  status: string;
  total_revenue: number;
  total_rent_paid: number;
  customers: MarketerDetailCustomer[];
  total_commission_paid: number;
  total_commission_pending: number;
}