import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category/category.service';
import {NotificationService} from '../../service/notification/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
  });

  constructor(private categoryService: CategoryService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  get idCreate() {
    return this.categoryForm.get('id');
  }

  get nameCreate() {
    return this.categoryForm.get('name');
  }

  createCategory() {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      this.categoryService.saveCategory(category).subscribe(() => {
        this.categoryForm.reset();
        this.notificationService.showMessage('success', 'Tạo mới thành công!');
        this.router.navigate(['/category/list']);
      }, e => {
        console.log(e);
      });
    } else {
      this.notificationService.showMessage('error', 'Tạo mới lỗi!');
    }
  }
}
