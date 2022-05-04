import { Component, OnInit } from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category/category.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {
  category: Category;
  id: number;
  categoryForm: any;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
    this.getCategory();
  }

  ngOnInit() {
  }

  private getCategory() {
    return this.categoryService.findById(this.id).subscribe(category => {
      this.category = category;
    });
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.id).subscribe(() => {
      this.router.navigate(['/category/list']);
      this.notificationService.showMessage('success', 'Xóa thành công!');
    }, e => {
      this.notificationService.showMessage('error', 'Xóa lỗi!');
    });
  }
}
