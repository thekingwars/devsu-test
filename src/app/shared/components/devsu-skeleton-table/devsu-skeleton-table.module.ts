import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevsuSkeletonTableComponent } from './devsu-skeleton-table.component';

@NgModule({
  declarations: [DevsuSkeletonTableComponent],
  exports: [DevsuSkeletonTableComponent],
  imports: [CommonModule],
})
export class DevsuSkeletonTableModule {}
