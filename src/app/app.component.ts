import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalInputsParentComponent } from './signal-inputs.component';
import { OutputParentComponent } from './output.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignalInputsParentComponent, OutputParentComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'new-angular-stuff-demo-v18';
}
