import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'searchProduct',
})
export class SearchProductPipe implements PipeTransform {
  transform(products: Product[], searchByName: string): Product[] {
    if (!products || !searchByName) {
      return products;
    }

    searchByName = searchByName.toLowerCase();

    return products.filter((product) => {
      const productName = product.name.toLowerCase();

      return productName.includes(searchByName);
    });
  }
}
