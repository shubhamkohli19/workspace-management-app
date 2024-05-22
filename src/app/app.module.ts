import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { FeaturesComponent } from './components/features/features.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from './services/signup.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { SelectServiceComponent } from './pages/select-service/select-service.component';
import { RentWorkspaceComponent } from './pages/rent-workspace/rent-workspace.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SelectLocationComponent } from './pages/select-location/select-location.component';
import { BillPaymentComponent } from './pages/bill-payment/bill-payment.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CancelPaymentComponent } from './components/cancel-payment/cancel-payment.component';
import { SuccessPaymentComponent } from './components/success-payment/success-payment.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    IntroductionComponent,
    FeaturesComponent,
    FooterComponent,
    SelectServiceComponent,
    RentWorkspaceComponent,
    SelectLocationComponent,
    BillPaymentComponent,
    CheckoutComponent,
    CancelPaymentComponent,
    SuccessPaymentComponent,
    ShowcaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SignupService,
    LoginService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
