import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category';
import {Product} from '../../model/product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product/product.service';
import {CategoryService} from '../../service/category/category.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];
  product: Product = {
    category: null
  };
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private notificationService: NotificationService,
              private router: Router
              ) { }

  ngOnInit() {
    this.getCategories();
  }

  createProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name').value);
      formData.append('price', this.productForm.get('price').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('image', this.productForm.get('image').value);
      formData.append('category', this.productForm.get('category').value);
      this.productService.saveProduct(formData).subscribe(() => {
          this.notificationService.showMessage('success', 'Tạo mới thành công!');
          this.router.navigate(['/product/list']);
        }, error => {
          this.notificationService.showMessage('error', 'Tạo mới lỗi!');
        }
      );
      this.productForm.reset();
    } else {
      this.notificationService.showMessage('error', 'Tạo mới lỗi!');
    }
  }

  get nameCreate() {
    return this.productForm.get('name');
  }

  get priceCreate() {
    return this.productForm.get('price');
  }

  get imageCreate() {
    return this.productForm.get('image');
  }

  get descriptionCreate() {
    return this.productForm.get('description');
  }

  getCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  onFileSelect($event) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files[0];
      this.productForm.get('image').setValue(file);
    }
  }
}
