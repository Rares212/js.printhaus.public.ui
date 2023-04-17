export enum MaterialType {
  PLA='PLA',
  PETG='PETG'
}

export const DENSITY_MAP: {[key in MaterialType]: number} = {
  [MaterialType.PLA]: 1.24, // density of PLA in g/cm^3
  [MaterialType.PETG]: 1.27, // density of PETG in g/cm^3
};
