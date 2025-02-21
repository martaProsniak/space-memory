import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GameHeaderComponent} from '../game/game-header/game-header.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    GameHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('intro', {static: false}) introEl: ElementRef | undefined;
  startPosition: number = 0;
  pixelsPerFrame = 2;
  animationId: number | null = null;
  maxTop = 0;
  maxPixelsPerFrame = 16;

  ngAfterViewInit() {
    this.setStartPosition();
    this.animationId = window.requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy() {
    this.cancelAnimation();
  }

  speedUpAnimation() {
    if (this.pixelsPerFrame === this.maxPixelsPerFrame) {
      return;
    }
    this.pixelsPerFrame = this.maxPixelsPerFrame;
  }

  setStartPosition() {
    this.startPosition = this.introEl?.nativeElement.offsetTop;
  }

  cancelAnimation() {
    if (!!this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  animate = () => {
    if (!this.startPosition) {
      this.animationId = window.requestAnimationFrame(() => this.animate());
    } else if (this.startPosition >= this.maxTop) {
      this.startPosition = this.startPosition - this.pixelsPerFrame;
      if (this.introEl) {
        this.introEl.nativeElement.style.top = `${this.startPosition}px`;
      }
      this.animationId = window.requestAnimationFrame(() => this.animate());
    } else {
      this.cancelAnimation();
    }
  };
}
