import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, IonSearchbar, ModalController } from '@ionic/angular';
import { ReportPostsComponent } from 'src/app/components/report-posts/report-posts.component';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { EventService } from 'src/app/services/event.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { ToastService } from 'src/app/services/toast.service';
import { NewOrganizationPage } from '../organization/new-organization/new-organization.page';
import { NewEventPage } from './new-event/new-event.page';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  @ViewChild('eventsSearchbar') searchbar: IonSearchbar;

  public events: any[] = [];
  public filteredEvents: any[] = [];
  public selectedCategory = '';
  public categories: string[] = [];
  private searchTerm = '';

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private eventService: EventService,
    private organizationService: OrganizationService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.reloadEvents();
  }

  ionViewWillEnter() {
    this.reloadEvents();
  }

  private reloadEvents(): void {
    this.events = this.eventService.getAll().map((event) => this.eventService.enrich(event));
    this.categories = Array.from(
      new Set(
        this.events
          .map((event) => String(event.category || '').trim().toLowerCase())
          .filter(Boolean)
      )
    ).sort();
    this.searchTerm = ((this.searchbar as any)?.value || this.searchTerm || '').toString();
    this.applyFilters();
  }

  public filterList(evt: any): void {
    this.searchTerm = (evt?.detail?.value ?? evt?.target?.value ?? '').toString();
    this.applyFilters();
  }

  private applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    const category = this.selectedCategory.trim().toLowerCase();

    this.filteredEvents = this.events.filter((event) => {
      const matchesTitle = !term || String(event.title || '').toLowerCase().includes(term);
      const matchesCategory = !category || String(event.category || '').toLowerCase() === category;
      return matchesTitle && matchesCategory;
    });
  }

  public async openCategoryFilter(): Promise<void> {
    const buttons = [
      {
        text: 'todos os tipos',
        handler: () => {
          this.selectedCategory = '';
          this.applyFilters();
        },
      },
      ...this.categories.map((category) => ({
        text: category,
        handler: () => {
          this.selectedCategory = category;
          this.applyFilters();
        },
      })),
      {
        text: 'cancelar',
        role: 'cancel' as const,
      },
    ];

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'filtrar por tipo',
      buttons,
    });

    await actionSheet.present();
  }

  public clearCategoryFilter(): void {
    this.selectedCategory = '';
    this.applyFilters();
  }

  public getDateBadge(event: any): string {
    return this.eventService.getDateBadge(event);
  }

  public getPreviewAttendees(event: any): any[] {
    return this.eventService.getPreviewAttendees(event, 4);
  }

  public getAttendeeImage(user: any): string {
    if (!user?.image) {
      return '../assets/images/default-user.png';
    }
    return `../assets/images/${user.image}`;
  }

  public openEvent(event: any): void {
    this.router.navigate([
      '/',
      APP_ROUTES.MAIN,
      APP_ROUTES.EVENTS,
      APP_ROUTES.EVENT_DETAILS,
      event.id,
    ]);
  }

  public openShare(domEvent: Event): void {
    domEvent.stopPropagation();
  }

  async presentEventActions(domEvent: Event, eventDetail: any) {
    domEvent.stopPropagation();
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'copiar link do evento',
          handler: () => {
            this.copyEventLink(eventDetail);
          },
        },
        {
          text: 'denunciar evento',
          handler: () => {
            this.reportEvent(eventDetail);
          },
        },
        {
          text: 'favoritar evento',
        },
        {
          text: 'convidar amigos',
        },
        {
          text: 'cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  private async copyEventLink(event: any): Promise<void> {
    const link = `${window.location.origin}/main/events/event-details/${event.id}`;
    try {
      await navigator.clipboard.writeText(link);
      await this.toast.showToast('link do evento copiado');
    } catch {
      await this.toast.showToast(link);
    }
  }

  async reportEvent(event: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ReportPostsComponent,
      cssClass: 'report-posts-modal',
      componentProps: {
        post_id: event.id,
      },
    });

    return await modal.present();
  }

  async newEvent(): Promise<void> {
    if (!this.organizationService.hasOrganization()) {
      const alert = await this.alertCtrl.create({
        header: 'organização necessária',
        message: 'para criar um evento, você precisa ter uma organização.',
        buttons: [
          { text: 'cancelar', role: 'cancel' },
          {
            text: 'criar organização',
            handler: () => {
              this.openNewOrganization();
            },
          },
        ],
      });
      await alert.present();
      return;
    }

    const modal = await this.modalCtrl.create({
      component: NewEventPage,
      cssClass: 'event-modal',
    });

    await modal.present();
    await modal.onDidDismiss();
    this.reloadEvents();
  }

  async openNewOrganization(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: NewOrganizationPage,
      cssClass: 'event-modal',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      await this.newEvent();
    }
  }
}
