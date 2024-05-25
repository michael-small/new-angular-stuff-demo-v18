import { AsyncPipe } from '@angular/common';
import {
  Component,
  afterNextRender,
  inject,
  output,
  viewChild,
} from '@angular/core';
import {
  outputFromObservable,
  outputToObservable,
} from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-output-child',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form>
      <label for="ctrl"
        >Control that dictates valueChangedFromObservable
      </label>
      <input type="text" id="ctrl" [formControl]="ctrl" />
    </form>
    <button (click)="valueChangedSimple.emit('valueChanged')">
      Update valueSimple
    </button>
  `,
})
export class OutputChildComponent {
  ctrl = inject(FormBuilder).control('');

  valueChangedSimple = output<string>();
  valueChangedFromObservable = outputFromObservable(this.ctrl.valueChanges);
}

@Component({
  selector: 'app-output-parent',
  standalone: true,
  imports: [OutputChildComponent, AsyncPipe],
  template: `
    <h2>output</h2>
    <p>
      See component class to see commented out equivalents and notes on
      advantages of each type.
    </p>
    <p>
      Note: this new 'output' is NOT a signal. The lowercase naming is just
      consistent with other alternatives to {{ at }} decorator naming
    </p>
    <app-output-child
      (valueChangedSimple)="valueSimple = $event"
      (valueChangedFromObservable)="valueFromObservable = $event"
    />
    <p>valueFromObservable: {{ valueFromObservable }}</p>
    <p>valueSimple: {{ valueSimple }}</p>

    <p>Check the console for the outputToObservable</p>
  `,
})
export class OutputParentComponent {
  // Note: this new `output` is NOT a signal. The lowercase naming is just consistent with other alternatives to `@` decorator naming

  // Benefits over @Output
  //    1) No decorator - decorators in Angular have drifted from Typescript and were always experimental
  //    2) Making outputs from observables in a child, and making observables from a child output in the parent
  //    3) No notion of instantiating a new `EventEmitter`

  // @Output() valueSimple = new EventEmitter<string>();
  valueSimple: string = '';

  // Gets its value from the child's output which is derived from an observable stream
  valueFromObservable: string | null = '';

  // This signal based `viewChild` and the `afterNextRender` hook is is its own new thing,
  //     but all this is doing is console logging the child's output from an observable event
  childComponentRef =
    viewChild.required<OutputChildComponent>(OutputChildComponent);
  constructor() {
    afterNextRender(() => {
      outputToObservable(this.childComponentRef().valueChangedSimple)
        .pipe(tap((v) => console.log('outputToObservable', v)))
        .subscribe();
    });
  }

  // Just for escaping this this character in the template
  at = '@';
}
