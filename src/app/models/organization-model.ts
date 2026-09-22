export interface OrganizationMember {
  user_id: number;
  role: 'owner' | 'admin' | 'member';
}

export interface Organization {
  id: number;
  name: string;
  description: string;
  image: string;
  owner_id: number;
  members: OrganizationMember[];
  city?: string;
  created_at: string;
}
