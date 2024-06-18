export interface IChildren {
  children: React.ReactNode;
}

export type IFormData = {
  trucksCapacities: string;
  packagesInfo: string;
  citiesDistances: string;
};
export interface IError {
  reset: () => void;
  error: string;
  // error: Error;
}
export interface IPackages {
  [key: string]: unknown[];
}

export type GraphType = {
  [city: string]: { [dest: string]: number };
};
export interface IAllInfo {
  graph: GraphType;
  packages: IPackages;
  trucks: number[];
}
