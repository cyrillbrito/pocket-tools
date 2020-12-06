

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Chain } from '../models';


@Component({
  selector: 'app-chains',
  templateUrl: 'chains.page.html',
  styleUrls: ['chains.page.scss']
})
export class ChainsPage implements OnInit {

  public chains: Chain[] = [];

  public minute: number;

  constructor(
    private storage: Storage,
    private router: Router,
    public platform: Platform
  ) { }

  ngOnInit(): void {

    this.storage.get('chains').then(chains => {
      if (!chains) {
        this.storage.set('chains', []);
      } else {
        this.chains = chains;
      }
    });
  }

  create(): void {
    this.router.navigate(['/chain']);
  }

  edit(chain: Chain): void {
    this.router.navigate(['/chain', chain.id]);
  }

  deleteAll() {
    this.chains = [];
    this.storage.set('chains', []);
  }

  public switchTheme(): void {
    document.body.classList.toggle('dark');
  }
}
