import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Item} from './model/item';
import {AppService} from './app.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('input', { read: false, static: true }) private elementRef: ElementRef;
  list: Item[] = [];
  newItem: Item = new Item();

  constructor(private appService: AppService) {}

  ngOnInit() {
    // to avoid stocking the list in this file
    this.appService.get().subscribe((response: Item[]) => this.list = response);
    this.elementRef.nativeElement.focus();
  }

  onEnter() {
    if (this.newItem && this.newItem.name.trim() !== '') {
      (this.newItem.id) ? this.updateItem() : this.addItem();
    }
  }

  selectItem(item: Item) {
    this.newItem = item;
    this.elementRef.nativeElement.focus();
  }

  sortItem(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
  }

  addItem() {
    this.newItem.id = this.list.length + 1;
    this.list.push(this.newItem);
    this.newItem = new Item();
  }

  updateItem() {
    const index = this.list.indexOf(this.newItem);
    if (index > -1) {
      this.list[index].name = this.newItem.name;
      this.newItem = new Item();
    }
  }

  removeItem(item: Item) {
    const index = this.list.indexOf(item);
    if (index > -1) {
      this.list.splice(index, 1);
      this.newItem = new Item();
    }
  }

}
