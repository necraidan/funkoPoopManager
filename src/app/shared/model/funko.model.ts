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
  tags: string[];
  owned?: boolean;
  wanted?: boolean; // deprecated
  rarities?: Rarity[];
  exclusivities?: Exclusivity[];
}
