import { Component, OnInit } from '@angular/core';
import { SupabaseService, Customer } from '../services/supabase.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-customer-list',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css'
})
export class CustomerList implements OnInit {
  customers: Customer[] = [];

  constructor(private supabaseService: SupabaseService) {
  }

  async ngOnInit() {
    try {
      this.customers = await this.supabaseService.getCustomers();
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  }
}
