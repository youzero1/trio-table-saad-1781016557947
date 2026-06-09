export type Row = {
  id: number;
  col1: string;
  col2: string;
  col3: string;
};

export type SortDirection = 'asc' | 'desc' | null;

export type SortState = {
  column: keyof Row | null;
  direction: SortDirection;
};
