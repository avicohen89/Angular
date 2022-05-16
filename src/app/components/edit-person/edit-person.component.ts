import { Component, OnInit } from '@angular/core';
import {Child, Person} from 'src/app/models/person.model'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { combineLatest} from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss'],
})

export class EditPersonComponent implements OnInit {

  personToEdit: Person =
  {id:1, firstName:'Avi',lastName:'Cohen', email:'avi@gmail.com',
  address: {city:'tel aviv', street:'levontin'},
  children:[
    {name:'mika', age:9},
    {name:'mika2', age:10}
  ]
};
  //firstNameControl!: FormControl;
  personForm: FormGroup;


  get childrenFormArray(){
    const formArray: FormArray = this.personForm.get('children') as FormArray;
    return formArray.controls;
  }

  get childrenFormArray(){
    return this.personForm.get('children') as FormArray;
    }


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //this.firstNameControl = this.formBuilder.control(this.personToEdit.firstName, [Validators.required, Validators.maxLength(12)]);

    this.personForm = this.formBuilder.group({
      id: [this.personToEdit.id],
      firstName: [this.personToEdit.firstName, [Validators.required, this.myValidation]],
      lastName: [this.personToEdit.lastName , [Validators.required]],
      email: [this.personToEdit.email, [Validators.email]],
      address: this.createAddressForm(),
      children: this.createChildrenArray()
    });


    this.personForm.valueChanges.pipe(filter(p => this.personForm.valid),
    debounceTime(500)).subscribe(p=>{ this.save();
    });

    combineLatest(
      [this.personForm.get('firstName').valueChanges, this.personForm.get('lastName').valueChanges])
      .pipe(debounceTime(500))
      .subscribe(p=>console.log("name changed", p));

  }

  createChildrenArray(){
    const childrenGroups = [];
    for (const child of this.personToEdit.children) {
      const g = this.createChildForm(child);
      childrenGroups.push(g);
    }
    return this.formBuilder.array(childrenGroups);
  }

  createChildForm(c: Child): any{
    return this.formBuilder.group({
      name: [c.name],
      age:[c.age, [Validators.min(1)]]
    });
  }

  createAddressForm(): any{
    return this.formBuilder.group({
      city: [this.personToEdit.address.city],
      street: [this.personToEdit.address.street]
    })
  }

  myValidation(control: FormControl): ValidationErrors | null{
    const currentValue: string = control.value
    if(currentValue.length === 6){
      return null;
    }
    return{
      'my6LengthValidation' : {
        currentLength: currentValue.length
      }
    }
  }

  save(){
    this.personToEdit = this.personForm.value;
  }

}
