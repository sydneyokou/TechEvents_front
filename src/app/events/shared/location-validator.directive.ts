import { Directive } from "@angular/core";
import { Validator, FormGroup, NG_VALIDATORS } from "@angular/forms";

@Directive({
  selector: "[validateLocation]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true }
  ] // NG_VALIDATORS is a list og angular validators and we add our customed one LOcationValidator to it by setting "multi" to true
})
export class LocationValidator implements Validator {
  validate(formGroup: FormGroup): { [key: string]: any } {
    let addressControl = formGroup.controls["address"];
    let cityControl = formGroup.controls["city"];
    let countryControl = formGroup.controls["country"];
    let onlineUrlControl = (<FormGroup>formGroup.root).controls["onlineUrl"];

    if (
      (addressControl &&
        addressControl.value &&
        cityControl &&
        cityControl.value &&
        countryControl &&
        countryControl.value) ||
      (onlineUrlControl && onlineUrlControl.value)
    ) {
      return null; //means that there is no problem
    } else {
      return { validateLocation: false }; //validator failing -> we get a validation error
    }
  }
}
