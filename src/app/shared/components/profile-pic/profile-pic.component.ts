import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profile-pic',
  imports: [NgStyle, NgClass],
  templateUrl: './profile-pic.component.html',
  styleUrl: './profile-pic.component.css',
})
export class ProfilePicComponent {
  @Input() name: string = '';
  @Input() imageUrl: string | null = null;
  @Input() size: string = 'xs'; // Default size
  sizeClass: string = 'circle-';
  bgColor: string = '';
  private readonly bgColors = [
    '#FFCDD2',
    '#F8BBD0',
    '#E1BEE7',
    '#D1C4E9',
    '#BBDEFB',
    '#B2EBF2',
    '#C8E6C9',
    '#FFF9C4',
    '#FFE0B2',
    '#D7CCC8',
  ];

  private getRandomColor(key: string): string {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % this.bgColors.length;
    return this.bgColors[index];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['imageUrl']) {
      this.sizeClass = this.sizeClass + this.size;
      this.bgColor = this.getRandomColor(this.name);
    }
  }

  get initials(): string {
    if (!this.name) return '';
    const nameParts = this.name.trim().split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  }
}
