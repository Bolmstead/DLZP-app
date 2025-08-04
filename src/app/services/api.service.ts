import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  // Base URL for your API - replace with your actual API base URL
  private freebayBaseURL = 'https://freebay-backend-310a33634097.herokuapp.com';
  private aiBackendURL = 'https://dlzp-app-backend-3f9d0e934ad7.herokuapp.com/';

  // Example: Get user data
  getProductsBySubCategory(category: string): Observable<any> {
    // Encode the subCategory string to handle spaces and special characters in the URL
    category = encodeURIComponent(category);
    const result = this.http.get(
      `${this.freebayBaseURL}/products/?category=${category}`
    );
    console.log('result:: ', result);
    return result;
  }

  // Example: Get posts
  searchProducts(searchQuery: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.freebayBaseURL}/products/?name=${searchQuery}`
    );
  }

  // AI Chat method
  sendAIMessages(messages: any, products: any): Observable<any> {
    const productsJSON = JSON.stringify(products);
    const system =
      'You are an AI chatbot for a fake shopping website I (Berkley) created to display my Angular skills to the company, DLZP. You are given a message by the user and you need to respond to it. The user is on a product page with products displayed. Please help them with their question and answer any questions they have with the products that they are viewing. You cant help them with any other products the site has that isnt listed on the page. That feature is coming. Here are the displayed products that the user can view: ' +
      productsJSON;

    const payload = { system, messages };
    const response = this.http.post<any>(
      `${this.aiBackendURL}/api/chat`,
      payload
    );
    console.log('response:: ', response);
    return response;
  }
}
