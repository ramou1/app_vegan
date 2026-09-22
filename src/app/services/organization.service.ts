import { Injectable } from '@angular/core';
import { ORGANIZATIONS, USER, USERS } from 'src/app/constants/mock.const';
import { Organization } from 'src/app/models/organization-model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  public getAll(): Organization[] {
    return ORGANIZATIONS;
  }

  public getById(id: number | string | null | undefined): Organization | undefined {
    if (id === null || id === undefined || id === '') {
      return undefined;
    }
    return ORGANIZATIONS.find((org) => org.id === Number(id));
  }

  public getByOwner(userId: number): Organization[] {
    return ORGANIZATIONS.filter((org) =>
      org.owner_id === userId || org.members.some((member: { user_id: number }) => member.user_id === userId)
    );
  }

  public getCurrentUserOrganizations(): Organization[] {
    return this.getByOwner(USER.id);
  }

  public hasOrganization(userId: number = USER.id): boolean {
    return this.getByOwner(userId).length > 0;
  }

  public create(data: { name: string; description: string; city?: string; image?: string }): Organization {
    const nextId = ORGANIZATIONS.reduce((max, org) => Math.max(max, org.id), 0) + 1;
    const organization: Organization = {
      id: nextId,
      name: data.name.trim(),
      description: data.description.trim(),
      image: data.image || '',
      owner_id: USER.id,
      city: data.city || USER.city || '',
      created_at: new Date().toLocaleDateString('pt-BR'),
      members: [
        { user_id: USER.id, role: 'owner' },
      ],
    };

    ORGANIZATIONS.push(organization);
    USER.organization_ids = [...(USER.organization_ids || []), organization.id];
    return organization;
  }

  public getMembers(organization: Organization) {
    return (organization.members || [])
      .map((member) => {
        const user = USERS.find((item) => item.id === member.user_id) ||
          (USER.id === member.user_id ? USER : null);
        if (!user) {
          return null;
        }
        return {
          ...user,
          role: member.role,
        };
      })
      .filter(Boolean);
  }
}
