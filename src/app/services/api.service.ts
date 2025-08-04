import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  // Base URL for your API - replace with your actual API base URL
  private baseUrl = 'https://freebay-backend-310a33634097.herokuapp.com';

  // Example: Get user data
  getProductsBySubCategory(category: string): Observable<any> {
    // Encode the subCategory string to handle spaces and special characters in the URL
    category = encodeURIComponent(category);
    const result = this.http.get(
      `${this.baseUrl}/products/?category=${category}`
    );
    console.log('result:: ', result);
    return result;
  }

  // Example: Get posts
  searchProducts(searchQuery: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/products/?name=${searchQuery}`
    );
  }
}
