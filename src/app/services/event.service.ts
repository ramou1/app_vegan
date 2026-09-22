import { Injectable } from '@angular/core';
import { EVENTS, USERS } from 'src/app/constants/mock.const';
import { OrganizationService } from './organization.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private organizationService: OrganizationService) {}

  public getAll(): any[] {
    return EVENTS;
  }

  public getById(id: number | string): any | undefined {
    return EVENTS.find((event) => Number(event.id) === Number(id));
  }

  public getAttendees(event: any): any[] {
    const confirmed = event?.confirmed || [];
    return confirmed
      .map((entry: any) => {
        const userId = typeof entry === 'object' ? Number(entry.user_id || entry.id) : Number(entry);
        return USERS.find((user) => user.id === userId);
      })
      .filter(Boolean);
  }

  public getPreviewAttendees(event: any, limit = 3): any[] {
    return this.getAttendees(event).slice(0, limit);
  }

  public enrich(event: any): any {
    const organization = this.organizationService.getById(event.organization_id);
    return {
      ...event,
      organization,
      attendees: this.getAttendees(event),
    };
  }

  public add(event: any): any {
    const nextId = EVENTS.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
    const created = {
      ...event,
      id: nextId,
      confirmed: event.confirmed || [],
      comments: event.comments || [],
    };
    EVENTS.unshift(created);
    return created;
  }

  public parseDate(dateStr: string): Date | null {
    if (!dateStr) {
      return null;
    }

    if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
    }

    const [day, month, year] = dateStr.split('/').map(Number);
    if (!day || !month || !year) {
      return null;
    }
    return new Date(year, month - 1, day);
  }

  public getWeekday(dateStr: string): string {
    const date = this.parseDate(dateStr);
    if (!date) {
      return '';
    }
    return date.toLocaleDateString('pt-BR', { weekday: 'long' });
  }

  public getDateBadge(event: any): string {
    const start = this.parseDate(event.startingDate);
    if (!start) {
      return event.startingDate || '';
    }

    const startDay = start.getDate();
    const month = start.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
    const year = start.getFullYear();

    const end = this.parseDate(event.endingDate);
    if (end && end.getTime() !== start.getTime()) {
      return `${startDay} - ${end.getDate()} de ${month} de ${year}`;
    }

    return `${startDay} de ${month} de ${year}`;
  }

  public getFullDateLabel(event: any): string {
    const date = this.parseDate(event.startingDate);
    if (!date) {
      return `${event.startingDate || ''} ${event.startingHour || ''}`.trim();
    }

    const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });
    const full = date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return `${weekday}, ${full}${event.startingHour ? ` às ${event.startingHour}` : ''}`;
  }

  public getCalendarParts(event: any): { month: string; day: string; weekday: string } {
    const date = this.parseDate(event.startingDate);
    if (!date) {
      return { month: '--', day: '--', weekday: '--' };
    }

    return {
      month: date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
      day: String(date.getDate()),
      weekday: date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
    };
  }
}
