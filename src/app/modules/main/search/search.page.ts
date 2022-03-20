import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { USERS, RECENT_SEARCH } from 'src/app/constants/mock.const';
import { APP_ROUTES } from 'src/app/constants/routes/routes.const';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

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

  public filtrar(pesquisa): void {
    if (pesquisa.length > 0) {
      this.searching = true;
    }
    else {
      this.searching = false;
    }

    this.listaFiltrada = this.usersList.filter(user => {
      return (user.first_name.toLowerCase().indexOf(pesquisa.toLowerCase()) > -1);
    });
  }

  public openProfile(user): void {
    //TODO OPEN USER PROFILE
    // this.router.navigate[(APP_ROUTES.MAIN, APP_ROUTES.PROFILE)];
  }

  public deleteRecent(user, i): void {
    //TODO DELETE RECENT
    console.log("delete recent search: ", user);
    this.recentSearch.splice(i,1);    
  }

}
