import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profile-pic',
  imports: [NgStyle, NgClass],
  templateUrl: './profile-pic.component.html',
  styleUrl: './profile-pic.component.css',
})
export class ProfilePicComponent implements OnChanges {
  @Input() name = '';
  @Input() imageUrl: string | null = null;
  @Input() size = 'xs'; // Default size
  sizeClass = 'circle-';
  bgColor = '';
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

  /**
   * @description Getting background color randomly from array
   * @param key
   * @returns
   */
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

  /**
   * @description Getting initials if profile image is not there
   */
  get initials(): string {
    if (!this.name) return '';
    const nameParts = this.name.trim().split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (
      nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  }
}
