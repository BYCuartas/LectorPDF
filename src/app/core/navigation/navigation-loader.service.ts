import { Injectable } from '@angular/core';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { NavigationItem } from './navigation-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationLoaderService {
  private readonly _items: BehaviorSubject<NavigationItem[]> =
    new BehaviorSubject<NavigationItem[]>([]);

  get items$(): Observable<NavigationItem[]> {
    return this._items.asObservable();
  }

  constructor(private readonly layoutService: VexLayoutService) {
    this.loadNavigation();
  }

  loadNavigation(): void {
    this._items.next([
      {
        type: 'subheading',
        label: 'Dashboards',
        children: [
          {
            type: 'link',
            label: 'Lector PDF',
            route: '/lector-pdf',
            icon: 'mat:note_add',
            routerLinkActiveOptions: { exact: true }
          }
        ]
      },
      {
        type: 'subheading',
        label: 'APPS',
        children: [
          {
            type: 'link',
            label: 'All-In-One Table',
            route: '/',
            icon: 'mat:assignment',
            routerLinkActiveOptions: { exact: true }
          }
        ]
      },
      {
        type: 'dropdown',
        label: 'Help Centwer',
        icon: 'mat:help_outline',
        children: [
          {
            type: 'link',
            label: 'Getting Started',
            route: '/',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Pricing & Plans',
            route: '/',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'FAQ',
            route: '/',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Guides',
            route: '/',
            routerLinkActiveOptions: { exact: true }
          }
        ]
      },
      {
        type: 'link',  
        label: 'Calendar',
        route: '/',
        icon: 'mat:calendar_today',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',  
        label: 'Chat',
        route: '/',
        icon: 'mat:chat',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',  
        label: 'Mailbox',
        route: '/',
        icon: 'mat:email',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'dropdown',
        label: 'Social',
        icon: 'mat:perm_identity',
        children: [
          {
            type: 'link',
            label: 'Profile',
            route: '/',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Timeline',
            route: '/',
            routerLinkActiveOptions: { exact: true }
          },
        ]
      },
      {
        type: 'link',  
        label: 'WYSIWYG Editor',
        route: '/',
        icon: 'mat:chrome_reader_mode',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'dropdown',
        label: 'Contacts',
        icon: 'mat:contacts',
        children: [
          {
            type: 'link',
            label: 'List - Grid',
            route: '/',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'List - Table',
            route: '/',
            routerLinkActiveOptions: { exact: true }
          },
        ]
      },
      {
        type: 'link',  
        label: 'Scrumboard',
        route: '/',
        icon: 'mat:equalizer',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'subheading',
        label: 'PAGES',
        children: [
          {
            type: 'link',
            label: 'Authentication',
            route: '/',
            icon: 'mat:https',
            routerLinkActiveOptions: { exact: true }
          }
        ]
      },
      {
        type: 'link',  
        label: 'Comming Soon',
        route: '/',
        icon: 'mat:alarm',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',  
        label: 'Errors',
        route: '/',
        icon: 'mat:error',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',  
        label: 'Pricing',
        route: '/',
        icon: 'mat:attach_money',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',  
        label: 'Invoice',
        route: '/',
        icon: 'mat:receipt',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',  
        label: 'FAQ',
        route: '/',
        icon: 'mat:help_outline', 
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',  
        label: 'Guides',
        route: '/',
        icon: 'mat:book', 
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'subheading',
        label: 'UI ELEMENTS',
        children: [
          {
            type: 'link',
            label: 'Components',
            route: '/',
            icon: 'mat:bubble_chart',
            routerLinkActiveOptions: { exact: true }
          }
        ]
      },
      {
        type: 'link',
        label: 'Forms',
        route: '/',
        icon: 'mat:format_color_text',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',
        label: 'Icons',
        route: '/',
        icon: 'mat:star',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',
        label: 'Page Layouts',
        route: '/',
        icon: 'mat:star',
        routerLinkActiveOptions: { exact: true }
      },
    ]);
  }
}
