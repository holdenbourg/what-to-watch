import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-streaming-service-template',
  standalone: true,
  imports: [],
  templateUrl: './streaming-service-template.component.html',
  styleUrl: './streaming-service-template.component.scss'
})
export class StreamingServiceTemplateComponent {
  @Input()
  public streamingService: string = '';
}
