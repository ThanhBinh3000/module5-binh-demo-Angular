import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category/category.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)])
  });
  id: number;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getCategory();
    });
  }

  ngOnInit() {
  }

  getCategory() {
    return this.categoryService.findById(this.id).subscribe(category => {
      this.idEdit.setValue(category.id);
      this.nameEdit.setValue(category.name);
    });
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      this.categoryService.updateCategory(this.id, category).subscribe(() => {
        this.notificationService.showMessage('success', 'Sửa thành công!');
        this.router.navigate(['/category/list']);
      }, error => {
        console.log(error);
      });
    } else {
      this.notificationService.showMessage('error', 'Sửa lỗi!');
    }
  }

  get idEdit() {
    return this.categoryForm.get('id');
  }

  get nameEdit() {
    return this.categoryForm.get('name');
  }

}
