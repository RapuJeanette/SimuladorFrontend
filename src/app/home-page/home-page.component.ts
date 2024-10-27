import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { FeaturesComponent } from "./features/features.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, HeroSectionComponent, FeaturesComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent { }
