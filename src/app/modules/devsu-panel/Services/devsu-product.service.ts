import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../../../@core/models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DevsuProductService {
  private api: string = environment.apiUrl;
  product$ = new BehaviorSubject<Product | null>(null);

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }
  createProduct(body: Product): Observable<Product> {
    return this.http.post<Product>(this.api, body);
  }

  updateProduct(body: Product) {
    return this.http.put<Product>(this.api, body);
  }
  deleteProduct(productID: string): Observable<string> {
    const params = new HttpParams().set('id', productID);

    return this.http.delete<string>(this.api, { params });
  }

  formProduct() {
    const form: FormGroup = this.fb.group({
      id: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: new FormControl(null, [Validators.required]),
      date_release: new FormControl(null, [Validators.required]),
      date_revision: new FormControl(null, [Validators.required]),
    });

    form.get('date_revision')?.disable();

    return form;
  }
}
