import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { EventAttendeesComponent } from 'src/app/components/event-attendees/event-attendees.component';
import { ReportPostsComponent } from 'src/app/components/report-posts/report-posts.component';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { EventService } from 'src/app/services/event.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  public event: any;
  public organization: any;
  public organizationMembers: any[] = [];
  public attendees: any[] = [];
  public previewAttendees: any[] = [];
  public calendar = { month: '--', day: '--', weekday: '--' };
  public fullDateLabel = '';
  public showFullDescription = false;
  public going = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private eventService: EventService,
    private organizationService: OrganizationService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.loadEvent();
  }

  ionViewWillEnter() {
    this.loadEvent();
  }

  private loadEvent(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const found = id ? this.eventService.getById(id) : null;

    if (!found) {
      this.toast.showToast('evento não encontrado', true);
      setTimeout(() => this.goBack(), 1200);
      return;
    }

    this.event = this.eventService.enrich(found);
    this.attendees = this.event.attendees || [];
    this.previewAttendees = this.attendees.slice(0, 4);
    this.organization = this.event.organization || this.organizationService.getById(this.event.organization_id);
    this.organizationMembers = this.organization
      ? this.organizationService.getMembers(this.organization)
      : [];
    this.calendar = this.eventService.getCalendarParts(this.event);
    this.fullDateLabel = this.eventService.getFullDateLabel(this.event);
  }

  public get truncatedDescription(): string {
    const text = this.event?.description || '';
    if (this.showFullDescription || text.length <= 180) {
      return text;
    }
    return `${text.slice(0, 180).trim()}...`;
  }

  public get canToggleDescription(): boolean {
    return (this.event?.description || '').length > 180;
  }

  public getImage(user: any): string {
    if (!user?.image) {
      return '../assets/images/default-user.png';
    }
    return `../assets/images/${user.image}`;
  }

  public toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  public async openAttendees(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EventAttendeesComponent,
      cssClass: 'attendees-modal',
      componentProps: {
        attendees: this.attendees,
        title: 'quem vai',
      },
    });
    await modal.present();
  }

  public async openMembers(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EventAttendeesComponent,
      cssClass: 'attendees-modal',
      componentProps: {
        attendees: this.organizationMembers,
        title: 'membros da organização',
      },
    });
    await modal.present();
  }

  public async confirmPresence(): Promise<void> {
    this.going = !this.going;
    await this.toast.showToast(this.going ? 'presença confirmada' : 'presença removida');
  }

  public async copyLink(): Promise<void> {
    const link = `${window.location.origin}/main/events/event-details/${this.event.id}`;
    try {
      await navigator.clipboard.writeText(link);
      await this.toast.showToast('link do evento copiado');
    } catch {
      await this.toast.showToast(link);
    }
  }

  async presentEventActions() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'copiar link do evento',
          handler: () => {
            this.copyLink();
          },
        },
        {
          text: 'denunciar evento',
          handler: () => {
            this.reportEvent();
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

  async reportEvent(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ReportPostsComponent,
      cssClass: 'report-posts-modal',
      componentProps: {
        post_id: this.event.id,
      },
    });

    return await modal.present();
  }

  public openShare(): void {
    this.copyLink();
  }

  public goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate([APP_ROUTES.MAIN, APP_ROUTES.EVENTS]);
    }
  }
}
