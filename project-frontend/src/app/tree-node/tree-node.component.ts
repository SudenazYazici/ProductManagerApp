import { Component, Input } from '@angular/core';
import { ProductCategory } from '../productCategory';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent {
  @Input() node: ProductCategory | undefined;
  nodeExpanded: boolean = false;

  toggleChildren(): void {
    this.nodeExpanded = !this.nodeExpanded;
  }
}
