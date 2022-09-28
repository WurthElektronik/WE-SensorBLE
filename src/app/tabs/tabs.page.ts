import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  maintab:string = "scan";

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        switch(e.url.split("?")[0]){
          case "/tabs/attributegraph":
            this.maintab = "attributegraph";
            break;
          case "/tabs/featherwing":
            this.maintab = "featherwing";
            break;
          case "/tabs/sensormodel":
            this.maintab = "sensormodel";
            break;
          case "/tabs/scan":
            this.maintab = "scan";
            break;
          default:
            break;
        }
      }
    })
  }

}
