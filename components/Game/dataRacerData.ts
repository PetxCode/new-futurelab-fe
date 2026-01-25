
export type DataType = 'String' | 'Number' | 'Boolean' | 'List' | 'None';

export interface RacerLevel {
  id: number;
  title: string;
  targetType: DataType;
  description: string;
  speed: number;
  spawnRate: number;
}

export const RACER_LEVELS: RacerLevel[] = [
  {
    id: 1,
    title: "String Street",
    targetType: 'String',
    description: "Collect only STRINGS! Avoid numbers and booleans.",
    speed: 5,
    spawnRate: 1500
  },
  {
    id: 2,
    title: "Number Highway",
    targetType: 'Number',
    description: "Grab the NUMBERS! Watch out for text.",
    speed: 6,
    spawnRate: 1400
  },
  {
    id: 3,
    title: "Boolean Boulevard",
    targetType: 'Boolean',
    description: "True or False? Collect the BOOLEANS.",
    speed: 7,
    spawnRate: 1300
  },
  {
    id: 4,
    title: "List Lane",
    targetType: 'List',
    description: "Find the LISTS [ ]! Dodge the rest.",
    speed: 8,
    spawnRate: 1200
  },
  {
    id: 5,
    title: "Chaos Crossing",
    targetType: 'String', // Switches dynamically in hard mode? For now static.
    description: "High speed challenge! Focus on STRINGS.",
    speed: 10,
    spawnRate: 1000
  }
];

export const DATA_ITEMS = {
  String: ['"Hello"', "'Code'", '"Data"', '"Race"', "'Car'", '"Py"', '"Web"', "'10'"],
  Number: ['42', '3.14', '0', '-5', '100', '2025', '99', '7'],
  Boolean: ['True', 'False', 'True', 'False'],
  List: ['[1,2]', '[]', '["a"]', '[0]', '[1, 2, 3]'],
  None: ['None', 'null', 'undefined']
};
