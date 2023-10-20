import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevsuModalComponent } from './devsu-modal.component';
import { DevsuButtonModule } from '../devsu-button/devsu-button.module';

@NgModule({
  declarations: [DevsuModalComponent],
  exports: [DevsuModalComponent],
  imports: [CommonModule, DevsuButtonModule],
})
export class DevsuModalModule {}
