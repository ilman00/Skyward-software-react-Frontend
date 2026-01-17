export interface SmdTableItem {
  smd_id: string;
  smd_code: string;
  title: string;
  purchase_price: number;
  installed_at: string;
}

export interface SmdDetails {
  smd_id: string;
  smd_code: string;
  title: string;
  owner_name: string;
  sold_by: string;
  sell_price: number;
  purchase_price: number;
  monthly_rent: number;
  marketer_name: string;
  installed_at: string;
}
