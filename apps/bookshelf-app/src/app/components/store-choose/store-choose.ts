import { Component } from '@angular/core';
import { StoreService } from '../../services/store'
import { Store } from '@org/storelib'
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  imports: [],
  selector: 'app-store-choose',
  styleUrl: './store-choose.css',
  templateUrl: './store-choose.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreChoose {
  stores: Store[] = [];

  constructor(private storeService: StoreService, private cdr: ChangeDetectorRef, private router: Router) {}

  getStoreID(event: Event) {
    const storeId = (event.target as HTMLSelectElement).value;
    if (!storeId){
      return;
    }

    if (storeId === 'create-store') {
      this.router.navigate(['/storeForm']);
      return;
    }
    console.log('Store selected:', storeId);
    this.router.navigate(['/bookshelf'],{queryParams: {storeId: Number(storeId)}});
}
  ngOnInit() {
    this.storeService.getStores().subscribe((storesResponse) =>{
      this.stores = storesResponse;
      this.cdr.detectChanges();
    });
  }
}
