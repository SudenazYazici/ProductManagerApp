import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project-frontend';

  items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            { label: 'Products', routerLink: [''] },
            { label: 'New Product', routerLink: ['newproduct'] },
            { label: 'Buy', routerLink: ['buyproduct'] },
            { label: 'Sell', routerLink: ['sellproduct'] },
            { label: 'Report', routerLink: ['operation'] },
            { label: 'Product Categories', routerLink: ['category']},
            { label: 'New Product Category', routerLink: ['newcategory']},
            { label: 'Cash Registers', routerLink: ['cashregister']},
            { label: 'New Cash Register', routerLink: ['newcashregister']}
        ];

        this.activeItem = this.items[0];
    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event;
    }

    /* activateLast() {
        this.activeItem = (this.items as MenuItem[])[(this.items as MenuItem[]).length - 1];
    } */
}
