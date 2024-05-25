// Handmade router to load pages
export class Router {
  static location = null
  constructor(paths) {
    this.paths = paths
    this.initRouter()
    this.location = this.location
  }
  
  // TODO refactor for allow one players and get that info from URL
  initRouter() {
    this.location = new URL(window.location)
    const URI = this.location.pathname.replace('/', '')
    const searchParam = this.location.searchParams.get('player') || 1
    this.load(URI)
  }


  load(page = 'home') {
    const players = page.split('=')[1]
    const { paths } = this
    const {path, component} = paths[page.split('?')[0]] || paths['home']
    document.querySelector('#app').innerHTML = component
    window.history.pushState({player: players}, 'done', path)
  }
}