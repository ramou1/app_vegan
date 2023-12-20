import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { USERS, RECENT_SEARCH } from 'src/app/constants/mock.const';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {

  pesquisa: any;
  searching: boolean = false;
  listaFiltrada: any[];
  usersList: any = USERS;
  recentSearch: any = RECENT_SEARCH;

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.listaFiltrada = this.usersList;
  }

  public goBack(): void {
    this.modalCtrl.dismiss().catch((err) => {
      // console.log(err);
    });
  }

  public filtrar(pesquisa: any): void {
    if (pesquisa.length > 0) {
      this.searching = true;
    }
    else {
      this.searching = false;
    }

    this.listaFiltrada = this.usersList.filter((user: any) => {
      return (user.first_name.toLowerCase().indexOf(pesquisa.toLowerCase()) > -1);
    });
  }

  public openProfile(user: any): void {
    //TODO OPEN USER PROFILE
    // this.router.navigate[(APP_ROUTES.MAIN, APP_ROUTES.PROFILE)];
  }

  public deleteRecent(user: any, i: any): void {
    //TODO DELETE RECENT
    console.log("delete recent search: ", user);
    this.recentSearch.splice(i,1);    
  }

}
