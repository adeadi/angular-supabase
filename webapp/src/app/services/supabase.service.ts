import { Injectable } from '@angular/core';
import { supabase } from '../config/supabase.config';

export interface Customer {
  id: number;
  name: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  async getCustomers(): Promise<Customer[]> {
    const { data, error } = await supabase
      .from('customer')
      .select('id, name, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}
