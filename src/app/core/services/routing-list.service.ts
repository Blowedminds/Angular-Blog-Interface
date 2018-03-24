import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs';

@Injectable()
export class RoutingListService {
  routes: any = {
    article: { url: 'reader/',
      'article': { url: '{}/article/',
      },
      'most-viewed': { url: '{}/most-viewed' },
      'latest': { url: '{}/latest' },
      'category': { url: '{}/category/' }
    },
    image: { url: 'image/',
      'image': { url: 'image/' },
      'thumb': { url: 'thumb/' },
    },
    user: { url: 'reader/',
      'menus': { url: '{}/menus/' },
      'languages': { url: 'languages/' },
      'categories': { url: 'categories/' },
    },
    public: { url: '',
      'image': { url: 'images/',
        'author': { url: 'author/' }
      }
    },
    search: { url: 'reader/{}/search/',
    }
  };

  constructor() { }

  getUrl(key: string): string
  {
    let parsedKey = this.parseKey(key);

    let route = this.routes;

    let url: string = '';

    for(let i = 0; i < parsedKey.length; i++) {

      url += route[parsedKey[i]].url;

      route = route[parsedKey[i]];
    }

    return url;
  }

  private parseKey(key: string): Array<string>
  {
    let parsedKey = [];

    for(let i = 0; i < key.length; i++) {

      let index = key.indexOf('.');

      if(index === -1) {

        parsedKey.push(key);

        break;
      }
      else if(index != 0) {

        parsedKey.push(key.slice(0, index));
      }

      key = key.slice(index + 1);
    }

    return parsedKey;
  }
}
