// random-color.directive.ts
import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandomColor]'
})
export class RandomColorDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setRandomColor();
  }

  private setRandomColor(): void {
    const randomColor = this.generateRandomColor();
    this.renderer.setStyle(this.el.nativeElement, 'background-color', randomColor);
  }

  private generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
