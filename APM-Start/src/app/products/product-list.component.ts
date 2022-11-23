import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductsService } from './products.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  private _listFilter: string = '';
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productsService: ProductsService) {}

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
    this.filteredProducts = this.products;
  }

  performFilter(value: string): IProduct[] {
    return this.products.filter((product) => {
      value = value.toLocaleLowerCase();
      let productName = product.productName.toLocaleLowerCase();
      return productName.includes(value);
    });
  }

  onClickRating(rating: string): void {
    this.pageTitle = 'Product List ' + rating;
  }
}
