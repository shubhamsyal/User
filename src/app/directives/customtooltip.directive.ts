import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appCustomtooltip]'
})
export class CustomtooltipDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.CustomtooltipDirective();
  }

  private CustomtooltipDirective(): void {
    const element = this.el.nativeElement;

    if (element.scrollWidth > element.clientWidth) {
      // Overflow detected, apply ellipsis and tooltip
      this.renderer.setStyle(element, 'overflow', 'hidden');
      this.renderer.setStyle(element, 'text-overflow', 'ellipsis');

      // Tooltip
      const tooltipText = element.innerText;
      this.renderer.setAttribute(element, 'title', tooltipText);
    }
  }
}
