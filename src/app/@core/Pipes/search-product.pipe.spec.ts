import { SearchProductPipe } from './search-product.pipe';
import { Product } from '../models/product.model';

describe('SearchProductPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchProductPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return a empty array', () => {
    const pipe = new SearchProductPipe();

    const result = pipe.transform([], '');

    expect(result).toEqual([]);
  });

  it('should return a product array', () => {
    const pipe = new SearchProductPipe();

    const mockProduct: Product[] = [
      {
        id: 'asdasdee',
        name: 'asdasdasd',
        description: 'asdasdasdasdas',
        logo: 'asdasd',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];

    const result = pipe.transform(mockProduct, '');

    expect(result).toEqual(mockProduct);
  });

  it('should search product by name', () => {
    const pipe = new SearchProductPipe();

    const mockProduct: Product[] = [
      {
        id: 'asdasdee',
        name: 'asdasdasd',
        description: 'asdasdasdasdas',
        logo: 'asdasd',
        date_release: new Date(),
        date_revision: new Date(),
      },
      {
        id: '123',
        name: 'asdasdasd12',
        description: 'asdasdasdasdas',
        logo: 'asdasd',
        date_release: new Date(),
        date_revision: new Date(),
      },
      {
        id: '1234',
        name: 'asdasdasd123',
        description: 'asdasdasdasdas',
        logo: 'asdasd',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];

    const result = pipe.transform(mockProduct, 'asdasdasd12');

    expect(result).toEqual(result);
  });
});
