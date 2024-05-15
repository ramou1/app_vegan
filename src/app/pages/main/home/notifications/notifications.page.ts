import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NOTIFICATIONS } from 'src/app/constants/mock.const';
// import { formatDistanceToNow } from 'date-fns'; // função de formatação de datas

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public notifications = NOTIFICATIONS;

  //   type: 'follower',
  //   icon: 'person-add'

  //   type: 'like',
  //   icon: 'heart'

  //   type: 'comment',
  //   icon: 'chatbubble'

  //   type: 'mention',
  //   icon: 'at'

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  getUserAvatar(userId: number): string {
    // return `../assets/images/${userId.creator_image} ? ${userId.creator_image} : 'default-user.png'`;
    return '../assets/images/default-user.png';
  }

  // Função para calcular a diferença de tempo entre a data atual e a data da notificação
  public getTimeDifference(notificationDate: string): string {
    const dateObj = new Date(notificationDate); // Converter a string para um objeto Date
    const currentDate = new Date(); // Data atual
    const timeDifference = currentDate.getTime() - dateObj.getTime(); // Diferença de tempo em milissegundos

    // Calcular a diferença em anos
    const yearsDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
    if (yearsDifference > 0) {
      return `${yearsDifference} ano${yearsDifference !== 1 ? 's' : ''} atrás`;
    }

    // Calcular a diferença em dias
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (daysDifference > 0) {
      return `${daysDifference} dia${daysDifference !== 1 ? 's' : ''} atrás`;
    }

    // Calcular a diferença em horas
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    if (hoursDifference > 0) {
      return `${hoursDifference} hora${hoursDifference !== 1 ? 's' : ''} atrás`;
    }

    // Calcular a diferença em minutos
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    return `${minutesDifference} minuto${minutesDifference !== 1 ? 's' : ''} atrás`;

    //   return formatDistanceToNow(dateObj, { addSuffix: true });
  }

  public followUser(user: any): void {
    //TODO FOLLOW USER
    console.log("follow user: ", user);
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }
}
