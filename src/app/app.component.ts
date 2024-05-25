import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalInputsParentComponent } from './signal-inputs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignalInputsParentComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'new-angular-stuff-demo-v18';
}
