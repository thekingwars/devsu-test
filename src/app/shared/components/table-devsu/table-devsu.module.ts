import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDevsuComponent } from './table-devsu.component';
import { SearchProductPipe } from '../../../@core/Pipes/search-product.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TableDevsuComponent, SearchProductPipe],
  imports: [CommonModule, FormsModule],
  exports: [TableDevsuComponent, SearchProductPipe],
})
export class TableDevsuModule {}
