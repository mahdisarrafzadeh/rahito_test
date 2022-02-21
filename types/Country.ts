export interface allCountry {
  cioc: string;
  name: string;
  clicks: boolean;
}

export interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
    svg: string;
  };
}
