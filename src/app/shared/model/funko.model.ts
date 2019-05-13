import { Exclusivity } from './exclusivity.enum';
import { Rarity } from './rarity.enum';

export interface Funko {
  name: string;
  popCategory?: string;
  category: string;
  collection: string;
  number: string;
  picture: string[];
  description: string;
  tag: string[];
  owned?: boolean;
  wanted?: boolean; // deprecated
  rarity?: Rarity[];
  exclusivity?: Exclusivity[];
}
