import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientService } from '../../../services/http-client.service';
import { firstValueFrom } from 'rxjs';
import { Company } from '../../../store/company/company.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SaveButtonComponent } from '../../../shared/components/save-button/save-button.component';

@Component({
  selector: 'app-company-setup',
  standalone: true,
  imports: [
    CommonModule,
    PageLayoutComponent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatLabel,
    MatSelectModule,
    MatCheckboxModule,
    SaveButtonComponent,
  
  ],
  templateUrl: './company-setup.component.html',
  styleUrl: './company-setup.component.scss',
})
export class CompanySetupComponent implements OnInit {
  viewDetails = false;
  company: Company;
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  email: string;
  website: string;
  TIN: string;
  VRN: string;
  costUpdateMethod: string;
  forceAccounting = false;
  logo: string;
  efdSettings: string;
  originalCompany: Company;
  loadCompany = false;
  savingCompany = false;
  constructor(private httpService: HttpClientService) {}
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('accounting-user'));
    this.getCompany(user?.companyId).then();
  }

  async getCompany(id: string) {
    this.loadCompany = true;
    try {
      const company = await firstValueFrom(
        this.httpService.get(`companies/${id}`)
      );
      this.originalCompany = { ...company };
      this.name = this.originalCompany.name;
      this.description = this.originalCompany.description;
      this.address = this.originalCompany.address;
      this.phoneNumber = this.originalCompany.phoneNumber;
      this.email = this.originalCompany.email;
      this.website = this.originalCompany.website;
      this.TIN = this.originalCompany.TIN;
      this.VRN = this.originalCompany.VRN;
      this.costUpdateMethod = this.originalCompany.costUpdateMethod;
      this.forceAccounting = this.originalCompany.forceAccounting;
      this.logo = this.originalCompany.logo;
      console.log('Company', company);
    } catch (e) {
      console.error('Failed to load company', e);
    }
    this.loadCompany = false;
  }

  async saveCompany() {
    this.savingCompany = true;
    try {
      const companyPayload = {
        ...this.originalCompany,
        name: this.name,
        description: this.description,
        address: this.address,
        phoneNumber: this.phoneNumber,
        email: this.email,
        website: this.website,
        TIN: this.TIN,
        VRN: this.VRN,
        costUpdateMethod: this.costUpdateMethod,
        forceAccounting: this.forceAccounting,
        logo: this.logo,
      };
      console.log('company payload', companyPayload);
      await firstValueFrom(this.httpService.put('companies', companyPayload));
    } catch (e) {
      console.error('Failed to save company', e);
    }
    await this.getCompany(this.originalCompany.id)
    this.savingCompany = false;
  }

  get showSaveButton() {
    return (
      this.name !== this.originalCompany?.name ||
      this.description !== this.originalCompany?.description ||
      this.address !== this.originalCompany?.address ||
      this.phoneNumber !== this.originalCompany?.phoneNumber ||
      this.email !== this.originalCompany?.email ||
      this.website !== this.originalCompany?.website ||
      this.TIN !== this.originalCompany?.TIN ||
      this.VRN !== this.originalCompany?.VRN ||
      this.costUpdateMethod !== this.originalCompany?.costUpdateMethod ||
      this.forceAccounting !== this.originalCompany?.forceAccounting
    );
  }
}
