export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  src: string;
  description?: string;
  info?: string;
  type: 'image' | 'video';
}

export type Category = string;

export interface AppState {
  categories: Category[];
  items: PortfolioItem[];
}

export const STORAGE_KEY = 'portfolio_items_v2';
export const ADMIN_PASSWORD = '1234';

export const INITIAL_CATEGORIES = [
  "All",
  "Interiors",
  "Exhibitions",
  "Concepts",
  "Designer Profile",
];

export const INITIAL_ITEMS: PortfolioItem[] = [
  { 
    id: 1, 
    title: "Calm Living Room", 
    category: "Interiors", 
    src: "https://picsum.photos/seed/p1/800/600", 
    description: "고요한 거실 공간 디자인",
    info: "2023 · Residential",
    type: "image"
  },
  { 
    id: 2, 
    title: "Gallery Pop-up", 
    category: "Exhibitions", 
    src: "https://picsum.photos/seed/p2/800/600", 
    description: "전시 팝업 부스 디자인",
    info: "2022 · Exhibition",
    type: "image"
  },
  { 
    id: 3, 
    title: "Minimal Studio", 
    category: "Concepts", 
    src: "https://picsum.photos/seed/p3/800/600", 
    description: "미니멀 스튜디오 컨셉",
    info: "2024 · Concept",
    type: "image"
  }
];