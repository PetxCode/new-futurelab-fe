export type PixelColor = 'bg-purple-500' | 'bg-sky-500' | 'bg-slate-800' | 'bg-yellow-400' | 'bg-orange-500' | 'bg-red-500' | 'bg-green-500' | 'bg-pink-400' | 'bg-white' | null;

export interface PixelLevel {
  id: number;
  name: string;
  grid: PixelColor[][];
}

const _ = null;
const P = 'bg-purple-500';
const B = 'bg-sky-500';
const D = 'bg-slate-800'; // Dark
const Y = 'bg-yellow-400';
const O = 'bg-orange-500';
const R = 'bg-red-500';
const G = 'bg-green-500';
const K = 'bg-pink-400';
const W = 'bg-white';

export const PIXEL_ART_LEVELS: PixelLevel[] = [
  {
    id: 1,
    name: "Easter Chick",
    grid: [
      [_, _, _, _, _, _, _, _],
      [_, _, _, Y, Y, _, _, _],
      [_, _, Y, Y, Y, Y, _, _],
      [_, Y, D, Y, Y, D, Y, _],
      [_, Y, Y, O, O, Y, Y, _],
      [_, Y, Y, Y, Y, Y, Y, _],
      [_, _, Y, Y, Y, Y, _, _],
      [_, _, O, _, _, O, _, _],
    ]
  },
  {
    id: 2,
    name: "Red Heart",
    grid: [
      [_, _, _, _, _, _, _, _],
      [_, R, R, _, _, R, R, _],
      [R, R, R, R, R, R, R, R],
      [R, R, R, R, R, R, R, R],
      [R, R, R, R, R, R, R, R],
      [_, R, R, R, R, R, R, _],
      [_, _, R, R, R, R, _, _],
      [_, _, _, R, R, _, _, _],
    ]
  },
  {
    id: 3,
    name: "Smiley Face",
    grid: [
      [_, _, Y, Y, Y, Y, _, _],
      [_, Y, Y, Y, Y, Y, Y, _],
      [Y, Y, D, Y, Y, D, Y, Y],
      [Y, Y, Y, Y, Y, Y, Y, Y],
      [Y, D, Y, Y, Y, Y, D, Y],
      [Y, Y, D, D, D, D, Y, Y],
      [_, Y, Y, Y, Y, Y, Y, _],
      [_, _, Y, Y, Y, Y, _, _],
    ]
  },
  {
    id: 4,
    name: "Apple",
    grid: [
      [_, _, _, _, G, _, _, _],
      [_, _, _, G, D, _, _, _],
      [_, _, R, R, R, R, _, _],
      [_, R, R, R, R, R, R, _],
      [_, R, R, R, R, R, R, _],
      [_, R, R, R, R, R, R, _],
      [_, R, R, R, R, R, R, _],
      [_, _, R, R, R, R, _, _],
    ]
  },
  {
    id: 5,
    name: "Watermelon",
    grid: [
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [R, R, R, R, R, R, R, R],
      [_, R, D, R, R, D, R, _],
      [_, _, R, R, R, R, _, _],
      [_, _, G, G, G, G, _, _],
      [_, _, _, _, _, _, _, _],
    ]
  },
  {
    id: 6,
    name: "Mushroom",
    grid: [
      [_, _, _, R, R, _, _, _],
      [_, _, R, W, R, R, _, _],
      [_, R, R, R, W, R, R, _],
      [R, W, R, R, R, R, R, R],
      [R, R, R, W, R, W, R, R],
      [_, _, W, W, W, W, _, _],
      [_, _, W, D, D, W, _, _],
      [_, _, W, W, W, W, _, _],
    ]
  },
  {
    id: 7,
    name: "Sword",
    grid: [
      [_, _, _, _, _, _, _, B],
      [_, _, _, _, _, _, B, _],
      [_, _, _, _, _, B, _, _],
      [_, _, _, _, B, _, _, _],
      [_, _, O, B, _, _, _, _],
      [_, O, D, O, _, _, _, _],
      [_, D, O, _, _, _, _, _],
      [D, _, _, _, _, _, _, _],
    ]
  },
  {
    id: 8,
    name: "Space Invader",
    grid: [
      [_, _, G, _, _, G, _, _],
      [_, _, G, _, _, G, _, _],
      [_, G, G, G, G, G, G, _],
      [G, G, _, G, G, _, G, G],
      [G, G, G, G, G, G, G, G],
      [_, _, G, _, _, G, _, _],
      [_, G, _, _, _, _, G, _],
      [G, _, _, _, _, _, _, G],
    ]
  },
  {
    id: 9,
    name: "Pac Ghost",
    grid: [
      [_, _, P, P, P, P, _, _],
      [_, P, P, P, P, P, P, _],
      [P, W, B, P, P, W, B, P],
      [P, W, W, P, P, W, W, P],
      [P, P, P, P, P, P, P, P],
      [P, P, P, P, P, P, P, P],
      [P, P, P, P, P, P, P, P],
      [P, _, P, _, _, P, _, P],
    ]
  },
  {
    id: 10,
    name: "House",
    grid: [
      [_, _, _, R, R, _, _, _],
      [_, _, R, R, R, R, _, _],
      [_, R, R, R, R, R, R, _],
      [R, R, R, R, R, R, R, R],
      [_, O, O, O, O, O, O, _],
      [_, O, B, O, O, B, O, _],
      [_, O, O, D, D, O, O, _],
      [_, O, O, D, D, O, O, _],
    ]
  },
  {
    id: 11,
    name: "Tree",
    grid: [
      [_, _, _, G, G, _, _, _],
      [_, _, G, G, G, G, _, _],
      [_, G, G, G, G, G, G, _],
      [_, G, G, G, G, G, G, _],
      [_, _, G, G, G, G, _, _],
      [_, _, _, D, D, _, _, _],
      [_, _, _, D, D, _, _, _],
      [_, _, D, D, D, D, _, _],
    ]
  },
  {
    id: 12,
    name: "Pokeball",
    grid: [
      [_, _, D, D, D, D, _, _],
      [_, D, R, R, R, R, D, _],
      [D, R, R, R, R, R, R, D],
      [D, R, R, D, D, R, R, D],
      [D, W, W, D, D, W, W, D],
      [D, W, W, W, W, W, W, D],
      [_, D, W, W, W, W, D, _],
      [_, _, D, D, D, D, _, _],
    ]
  },
  {
    id: 13,
    name: "Rubber Duck",
    grid: [
      [_, _, _, Y, Y, _, _, _],
      [_, _, Y, Y, Y, Y, _, _],
      [_, O, O, Y, D, Y, _, _],
      [_, _, _, Y, Y, Y, _, _],
      [_, _, Y, Y, Y, Y, Y, _],
      [_, Y, Y, Y, Y, Y, Y, _],
      [_, _, Y, Y, Y, Y, _, _],
      [_, B, B, B, B, B, B, B],
    ]
  },
  {
    id: 14,
    name: "Checkmark",
    grid: [
      [_, _, _, _, _, _, _, G],
      [_, _, _, _, _, _, G, G],
      [_, _, _, _, _, G, G, _],
      [_, _, _, _, G, G, _, _],
      [G, _, _, G, G, _, _, _],
      [G, G, _, G, G, _, _, _],
      [_, G, G, G, _, _, _, _],
      [_, _, G, _, _, _, _, _],
    ]
  },
  {
    id: 15,
    name: "Pizza Slice",
    grid: [
      [_, _, _, _, _, _, _, O],
      [_, _, _, _, _, _, O, D],
      [_, _, _, _, _, O, R, D],
      [_, _, _, _, O, Y, Y, D],
      [_, _, _, O, Y, R, Y, D],
      [_, _, O, Y, Y, Y, _, _],
      [_, O, R, Y, Y, _, _, _],
      [O, Y, Y, _, _, _, _, _],
    ]
  },
  {
    id: 16,
    name: "Flower",
    grid: [
      [_, _, P, _, P, _, _, _],
      [_, P, P, P, P, P, _, _],
      [P, P, Y, Y, Y, P, P, _],
      [_, P, Y, Y, Y, P, _, _],
      [_, P, P, P, P, P, _, _],
      [_, _, P, G, P, _, _, _],
      [_, _, _, G, _, _, _, _],
      [_, _, G, G, G, _, _, _],
    ]
  },
  {
    id: 17,
    name: "Diamond",
    grid: [
      [_, _, _, B, B, _, _, _],
      [_, _, B, B, B, B, _, _],
      [_, B, B, W, B, B, B, _],
      [B, B, B, W, B, B, B, B],
      [_, B, B, B, B, B, B, _],
      [_, _, B, B, B, B, _, _],
      [_, _, _, B, B, _, _, _],
      [_, _, _, _, _, _, _, _],
    ]
  },
  {
    id: 18,
    name: "Car",
    grid: [
      [_, _, _, _, _, _, _, _],
      [_, _, B, B, B, B, _, _],
      [_, B, W, B, B, W, B, _],
      [B, B, B, B, B, B, B, B],
      [B, B, B, B, B, B, B, B],
      [_, D, D, _, _, D, D, _],
      [_, D, D, _, _, D, D, _],
      [_, _, _, _, _, _, _, _],
    ]
  },
  {
    id: 19,
    name: "Sun",
    grid: [
      [O, _, _, Y, _, _, O, _],
      [_, O, _, Y, _, O, _, _],
      [_, _, Y, Y, Y, _, _, _],
      [Y, Y, Y, Y, Y, Y, Y, _],
      [_, _, Y, Y, Y, _, _, _],
      [_, O, _, Y, _, O, _, _],
      [O, _, _, Y, _, _, O, _],
      [_, _, _, _, _, _, _, _],
    ]
  },
  {
    id: 20,
    name: "Crown",
    grid: [
      [Y, _, _, Y, _, _, Y, _],
      [Y, _, _, Y, _, _, Y, _],
      [Y, Y, _, Y, _, Y, Y, _],
      [Y, R, Y, Y, Y, R, Y, _],
      [Y, Y, Y, Y, Y, Y, Y, _],
      [Y, R, R, R, R, R, Y, _],
      [Y, Y, Y, Y, Y, Y, Y, _],
      [_, _, _, _, _, _, _, _],
    ]
  }
];
