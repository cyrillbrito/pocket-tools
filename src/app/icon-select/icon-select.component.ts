import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { icons } from './data';

@Component({
  selector: 'app-icon-select',
  templateUrl: './icon-select.component.html',
  styleUrls: ['./icon-select.component.scss'],
})
export class IconSelectComponent implements OnInit {

  public icons = icons;

  @Output()
  public selected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  public search(search: string): void {
    this.icons = icons.filter(icon => icon.name.includes(search) || icon.tags.some(t => t.includes(search)));
  }
}
