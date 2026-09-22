export interface InterestOption {
  icon: string;
  color: string;
  description: string;
}

export const INTEREST_OPTIONS: InterestOption[] = [
  { icon: 'leaf-outline', color: 'primary', description: 'receitas' },
  { icon: 'restaurant-outline', color: 'secondary', description: 'restaurantes' },
  { icon: 'bicycle-outline', color: 'tertiary', description: 'esporte' },
  { icon: 'walk-outline', color: 'success', description: 'trilhas' },
  { icon: 'wine-outline', color: 'warning', description: 'nightlife' },
  { icon: 'videocam-outline', color: 'dark', description: 'filmes' },
  { icon: 'musical-notes-outline', color: 'primary', description: 'música' },
  { icon: 'book-outline', color: 'tertiary', description: 'leitura' },
  { icon: 'airplane-outline', color: 'secondary', description: 'viagens' },
  { icon: 'paw-outline', color: 'danger', description: 'animais' },
  { icon: 'fitness-outline', color: 'success', description: 'yoga' },
  { icon: 'camera-outline', color: 'medium', description: 'fotografia' },
  { icon: 'basket-outline', color: 'primary', description: 'feira orgânica' },
  { icon: 'people-outline', color: 'tertiary', description: 'ativismo' },
  { icon: 'cafe-outline', color: 'warning', description: 'cafés veganos' },
  { icon: 'flower-outline', color: 'secondary', description: 'jardinagem' },
];
