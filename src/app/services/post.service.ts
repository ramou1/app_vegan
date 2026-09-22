import { Injectable } from '@angular/core';
import { POSTS, USER, USERS } from 'src/app/constants/mock.const';
import { formatRelativeTime } from 'src/app/utils/relative-time.util';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public getAll(): any[] {
    return POSTS.map((post) => this.enrich(this.withFreshDemoDate(post)));
  }

  public getById(id: number | string): any | undefined {
    const found = POSTS.find((post) => Number(post.post_id) === Number(id));
    return found ? this.enrich(this.withFreshDemoDate(found)) : undefined;
  }

  public getByUser(userId: number): any[] {
    return POSTS
      .filter((post) => Number(post.creator_id) === Number(userId))
      .map((post) => this.enrich(this.withFreshDemoDate(post)));
  }

  private withFreshDemoDate(post: any): any {
    if (Number(post.post_id) !== 20011) {
      return post;
    }
    return {
      ...post,
      registerDate: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
    };
  }

  public enrich(post: any): any {
    const user =
      USERS.find((item) => item.id === Number(post.creator_id)) ||
      (USER.id === Number(post.creator_id) ? USER : null);

    return {
      ...post,
      creator: post.creator || user?.name || 'usuário',
      creator_image: post.creator_image || user?.image || 'default-user.png',
      creator_username: post.creator_username || user?.username || 'usuario',
      reposts: post.reposts ?? 0,
      saved: !!post.saved,
      relativeTime: formatRelativeTime(post.registerDate),
    };
  }

  public toggleSave(post: any): boolean {
    post.saved = !post.saved;
    const source = POSTS.find((item) => Number(item.post_id) === Number(post.post_id));
    if (source) {
      source.saved = post.saved;
    }
    return post.saved;
  }

  public repost(post: any): number {
    post.reposts = (post.reposts || 0) + 1;
    const source = POSTS.find((item) => Number(item.post_id) === Number(post.post_id));
    if (source) {
      source.reposts = post.reposts;
    }
    return post.reposts;
  }
}
