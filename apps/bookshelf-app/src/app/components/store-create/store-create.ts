import { Component , inject} from '@angular/core';
import { Router  } from '@angular/router'
import { FormsModule} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core'
import { StoreService } from '../../services/store'
import st from '@angular/common/locales/st';

@Component({
  imports: [ FormsModule ],
  selector: 'app-store-create',
  styleUrl: './store-create.css',
  templateUrl: './store-create.html',
})
export class StoreCreateComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);
  storeService = inject(StoreService);
  name = '';
  description = '';
  isCorrect = true;
  cancel() {
    this.router.navigate(['/bookshelf']);
  }
  getStore() {
    const storeToCreate = {
      name: this.name,
      description: this.description,
    }
    return storeToCreate;
  }
  submit() {
    const store = this.getStore();
    this.storeService.createStore(store).subscribe(() =>{
        console.log('store created :'+ JSON.stringify(store));
        this.router.navigate(['/bookshelf']);
      });
  }
}





