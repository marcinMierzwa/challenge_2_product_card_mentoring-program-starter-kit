import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

export interface Product {
  readonly category: string;
  readonly image: string;
  readonly id: number;
  readonly price: number;
  readonly title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mentoring-program-starter-kit';
  private httpClient: HttpClient = inject(HttpClient);
  colors = ['primary', 'secondary', 'success', 'danger'];
  categories$: Observable<string[]> = this.httpClient.get<string[]>(
    'https://fakestoreapi.com/products/categories'
  );
  products$: Observable<Product[]> = this.httpClient
    .get<any[]>('https://fakestoreapi.com/products')
    .pipe(
      map((products) =>
        products.map((product) => ({
          category: product.category,
          image: product.image,
          id: product.id,
          price: product.price,
          title: product.title,
        }))
      )
    );
}
