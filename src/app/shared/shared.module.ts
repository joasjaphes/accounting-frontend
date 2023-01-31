import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MaterialModule } from '../modules/material/material.module';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { SingleMenuCardComponent } from './components/single-menu-card/single-menu-card.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { RouterModule } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DialogLayoutComponent } from './components/dialog-layout/dialog-layout.component';
import { SaveComponent } from './components/save/save.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';



@NgModule({
  declarations: [
    PageHeaderComponent,
    PageLayoutComponent,
    SingleMenuCardComponent,
    MenuListComponent,
    DataTableComponent,
    DialogLayoutComponent,
    SaveComponent,
    LoadingComponent,
    CustomFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports:[
    PageHeaderComponent,
    PageLayoutComponent,
    SingleMenuCardComponent,
    MenuListComponent,
    DataTableComponent,
    DialogLayoutComponent,
    SaveComponent,
    LoadingComponent,
    CustomFormComponent
  ]
})
export class SharedModule { }
