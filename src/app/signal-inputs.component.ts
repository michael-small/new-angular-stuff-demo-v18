import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-signal-inputs',
  standalone: true,
  imports: [],
  template: `
    <p>
      See component class to see commented out equivalents and notes on
      advantages of each type.
    </p>
    <p>$valueOptionalUndefined: {{ $valueOptionalUndefined() }}</p>
    <p>$valueOptionalDefault: {{ $valueOptionalDefault() }}</p>
    <p>$valueOptionaPassedValue: {{ $valueOptionalPassedValue() }}</p>
    <p>$valueRequired: {{ $valueRequired() }}</p>
  `,
  styles: ``,
})
export class SignalInputsComponent {
  // All of these inherantly have the benefits over the old `@` decorator based inputs
  //     1) Is signal - can used `computed` to derive other state from this input or `effect` to run side effects from them.
  //     2) No decorator - Angular always used decorators in an experimental fashion that has now diverged from standard Typescript

  // Benefits over the old convention
  //     1) The `| undefined` is infered
  // @Input() valueOptionalUndefined: string | undefined;
  $valueOptionalUndefined = input<string>();

  // @Input() valueOptionalDefault: string = 'default';
  $valueOptionalDefault = input<string>('default');

  // @Input() valueOptionalPassedValue: string | undefined'
  $valueOptionalPassedValue = input<string>();

  // Benefits over the old convention
  //     1) Less verbose way to mark as `required`
  //     2) No non null assertion `!` required
  // @Input({required:true}) valueRequired!: string;
  $valueRequired = input.required<string>();
}

@Component({
  selector: 'app-signal-inputs-parent',
  standalone: true,
  imports: [SignalInputsComponent],
  template: `
    <h2>Signal inputs</h2>
    <app-signal-inputs
      [$valueRequired]="'value'"
      [$valueOptionalPassedValue]="'value'"
    />
  `,
})
export class SignalInputsParentComponent {}
