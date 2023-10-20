import { TestBed } from '@angular/core/testing';

import { AuthorIdInterceptor } from './author-id.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

describe('AuthorIdInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const mockData: Product[] = [
    {
      id: 'asdasdee',
      name: 'asdasdasd',
      description: 'asdasdasdasdas',
      logo: 'asdasd',
      date_release: new Date(),
      date_revision: new Date(),
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthorIdInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(httpClient).toBeDefined();
    expect(httpMock).toBeDefined();
  });

  it('should pass the authorId', () => {
    httpClient.get(environment.apiUrl).subscribe((response) => {
      expect(response).toEqual(mockData);
    });

    const httpRequest = httpMock.expectOne(environment.apiUrl);

    expect(httpRequest.request.headers.has('authorId')).toBeTruthy();

    httpRequest.flush(mockData);
  });

  it('should have authorId the value 2', () => {
    httpClient.get(environment.apiUrl).subscribe((response) => {
      expect(response).toEqual(mockData);
    });

    const httpRequest = httpMock.expectOne(environment.apiUrl);

    expect(httpRequest.request.headers.get('authorId')).toEqual('2');

    httpRequest.flush(mockData);
  });
});
