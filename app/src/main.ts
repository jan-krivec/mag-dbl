import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Manager } from "@thatopen/ui"
import { AppModule } from './app/app.module';

Manager.init()
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
