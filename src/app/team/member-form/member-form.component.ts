import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormGroupDirective,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { Member } from 'src/app/shared/models';
import { RequestService } from 'src/app/shared/request.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {
  memberForm!: FormGroup;
  @Input() member!: Member;
  @Output() memberAction = new EventEmitter<any>(); // ???

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    const {
      id,
      firstName,
      lastName,
      email,
      avatar,
      bio,
      occupation,
      projects,
      fullAddress,
      city,
      postCode,
      phones,
    } = this.member;

    this.memberForm = new FormGroup({
      id: new FormControl(id),
      firstName: new FormControl(firstName, [Validators.required]),
      lastName: new FormControl(lastName, [Validators.required]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      avatar: new FormControl(avatar),
      bio: new FormControl(bio),
      occupation: new FormControl(occupation),
      projects: new FormControl(projects),
      fullAddress: new FormControl(fullAddress, [Validators.required]),
      city: new FormControl(city, [Validators.required]),
      postCode: new FormControl(postCode, [Validators.required]),
      country: new FormControl('', [Validators.required]),
      phones: new FormArray([], [Validators.required]),
    });

    if (phones && phones.length > 0) {
      phones.forEach((phone) => {
        (<FormArray>this.memberForm.controls['phones']).push(
          new FormControl(phone)
        );
      });
    }
  }

  onAddPhoneNumber() {
    const control = new FormControl('', [Validators.required]);
    (<FormArray>this.memberForm.controls['phones']).push(control);
  }

  onRemovePhoneNumber(index: number) {
    (<FormArray>this.memberForm.controls['phones']).removeAt(index);
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

  onSubmit() {
    if (this.memberForm.invalid) {
      return;
    }

    const formValue: Member = this.memberForm.getRawValue();

    this.memberAction.emit(formValue);

    this.formGroupDirective.resetForm();
  }
}

// "id": "1",
// "firstName": "Jake",
// "lastName": "Chambers",
// "email": "jchambers@midwordls@.io",
// "avatar": "https://i.pravatar.cc/300?img=3",
// "bio": "Passionate about design and creativity. Enjoys solving complex problems. Experienced in team management.",
// "occupation": "manager",
// "projects": ["1", "2", "3"],
//  "fullAddress": "123 Main St",
//  "city": "fictional city",
//  "postCode": "12345",
//  "phones": ["000000000000", "000000000000"]
