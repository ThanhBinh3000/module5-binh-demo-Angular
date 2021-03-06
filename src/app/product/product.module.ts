import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDeleteComponent} from './product-delete/product-delete.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductCreateComponent} from './product-create/product-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProductListComponent, ProductCreateComponent, ProductEditComponent, ProductDeleteComponent],
  exports: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductModule { }
