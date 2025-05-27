import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from '../../services/site.service';


@Component({
  selector: 'app-upload-site',
  templateUrl: './upload-site.component.html',
  styleUrls: ['./upload-site.component.css']
})
export class UploadSiteComponent {
  siteData: any = {
    siteName: '',
    location: '',
    price: 0,
    service: '',
    image: '' // store only the image name
  };

  constructor(private siteService: SiteService, private router: Router) {}

  onFileSelected(event: any): void {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.siteData.image = file.name;
    } else {
      console.error('No file selected');
    }
  }

  submitSite(): void {
    const formData = new FormData();
    formData.append('siteName', this.siteData.siteName);
    formData.append('location', this.siteData.location);
    formData.append('price', this.siteData.price.toString());
    formData.append('service', this.siteData.service);
    formData.append('image', this.siteData.image); // send only the image name
    console.log(this.siteData);

    this.siteService.uploadSite(formData).subscribe(
      (response) => {
        alert('Site uploaded successfully!');
        this.router.navigate(['/homepage']);
      },
      (error) => {
        console.error('Error uploading site:', error);
      }
    );
  }
}
