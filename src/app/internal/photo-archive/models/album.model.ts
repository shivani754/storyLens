export interface Album {
  id: number;
  title: string;
  userId?: number; // Optional if your API includes the user who created the album
}
