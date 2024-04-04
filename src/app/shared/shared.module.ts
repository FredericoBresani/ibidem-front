import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequestService } from "./services/request.service";
import { ReactiveFormsModule } from "@angular/forms";
import { StringToDirectoryNameService } from "./services/string-to-directory-name.service";
import { StringToDirectoryNamePipe } from './pipes/string-to-directory-name.pipe';
import { RemoveSingleQuotePipe } from "./pipes/remove-single-quote.pipe";
import { IframeToHtml } from "./pipes/iframe-to-html.pipe";
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { SafePasswordComponent } from './components/safe-password/safe-password.component';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { ScrollableContentComponent } from './components/scrollable-content/scrollable-content.component';
import { InitialsPipe } from "./pipes/initials.pipe";
import { WeekAgePipe } from "./pipes/week-age.pipe";
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { BulletPointComponent } from './components/bullet-point/bullet-point.component';
import { CharacterLimiterPipe } from "./pipes/character-limiter.pipe";

const customComponents = [
  BackToTopComponent,
  AgreementComponent,
  SafePasswordComponent,
  FormErrorsComponent,
  ScrollableContentComponent,
  RatingStarsComponent,
  BulletPointComponent
];
const services = [RequestService, StringToDirectoryNameService];
const pipes = [
  StringToDirectoryNamePipe,
  RemoveSingleQuotePipe,
  IframeToHtml,
  InitialsPipe,
  WeekAgePipe,
  CharacterLimiterPipe
];
@NgModule({
    declarations: [
      ...pipes,
      ...customComponents,
  ],
    imports: [
      ReactiveFormsModule,
      CommonModule,
    ],
    exports: [
      ...pipes,
      ...customComponents
    ],
    providers: [...services]
})
export class SharedModule {}
