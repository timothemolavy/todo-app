import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {Item} from './model/item';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
        MatCheckboxModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  }));

  describe('Compilation', () => {

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });

  });

  describe('UI Element', () => {

    it('should render title in a h1 tag', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('My todo-list');
    });

  });

  describe('functions', () => {

    it('should select an item',() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      const item = new Item(1, 'Item 1', false);

      app.list = [item];
      app.selectItem(item);
      expect(app.newItem).toEqual(item);
    });

    describe('onEnter()', () => {

      it('should call addItem if item is new',() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        spyOn(app, 'addItem').and.callThrough();
        app.newItem = { name: 'Item', complete: false };
        app.onEnter();

        expect(app.addItem).toHaveBeenCalled();
      });

      it('should call updateItem if item already exist',() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        spyOn(app, 'updateItem').and.callThrough();
        app.newItem = { id: 1, name: 'Item', complete: false };
        app.onEnter();

        expect(app.updateItem).toHaveBeenCalled();
      });

      it('should call nothing if item message is empty',() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        spyOn(app, 'updateItem').and.callThrough();
        spyOn(app, 'addItem').and.callThrough();
        app.newItem = new Item(1, '',false);
        app.onEnter();

        expect(app.updateItem).not.toHaveBeenCalled();
        expect(app.addItem).not.toHaveBeenCalled();
      });

    });

    it('should add an item',() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      const newItem = new Item(1, 'Item 1', false);

      app.newItem = newItem;
      expect(app.list).toEqual([]);

      app.addItem();
      expect(app.list).toEqual([newItem]);
    });

    it('should update an item',() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      const item: Item = new Item(1, 'Item 1', true);
      const updatedItem: Item = item;

      app.list = [item];
      expect(app.list[0].name).toEqual('Item 1');

      updatedItem.name = 'Item 1 updated';
      app.newItem = updatedItem;

      app.updateItem();
      expect(app.list[0].name).toEqual('Item 1 updated');
    });

    it('should remove an item',() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      const item1: Item = new Item(1, 'Item 1', true);
      const item2: Item = new Item(2, 'Item 2', false);

      app.list = [item1, item2];
      expect(app.list).toEqual([item1, item2]);

      app.removeItem(item2);
      expect(app.list).toEqual([item1]);
    });

  });

});
