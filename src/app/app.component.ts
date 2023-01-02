import { Component, OnInit, ErrorHandler } from '@angular/core';
import { HttpServiceService } from './servizi/http-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from './servizi/notifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'http-request';
  loadedProducts: any = [];
  productForm!: FormGroup;
  myErrorMessage: any;
  loginForm!: FormGroup;

  constructor(
    private httpService: HttpServiceService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService
  ) {}
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      titolo: ['', Validators.required],
      prezzo: ['', Validators.required],
    });

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  onGetProducts() {
    this.httpService.getUrl().subscribe({
      next: (response) => {
        this.notifierService.showNotification(
          'Richiesta effettuata con successo!',
          'ok',
          'success'
        );
        console.log(response);
      },
      error: (error) => {
        this.myErrorMessage = error;
      },
    });
  }

  onCreateProduct(productData: { titolo: string; prezzo: string }) {
    this.httpService.postUrl(productData).subscribe({
      next: (response) => {
        this.loadedProducts = response;
        this.notifierService.showNotification(
          'Prodotto aggiunto con successo',
          'ok',
          'success'
        );
        this.productForm.reset();
      },
      error: (error) => {
        this.myErrorMessage = error;
      },
    });
  }

  onDelete(productData: { id: any }) {
    this.httpService.deleteUrl(productData.id);
  }
}
