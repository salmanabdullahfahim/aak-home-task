export type TResult = {
  date: string;
  value: number;
};

export type TApiResponse = {
  [year: string]: {
    [month: string]: Array<{
      [date: string]: number;
    }>;
  }[];
}[];
