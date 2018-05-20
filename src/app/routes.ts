export const routes: any = {
    article: { url: 'reader/',
      'article': { url: '{}/article/',
      },
      // 'most-viewed': { url: '{}/most-viewed' },
      // 'latest': { url: '{}/latest' },
      'sections': { url: '{}/sections'},
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