declare module "@vaadin/vaadin-grid";

declare class RowData {
  index: number;
  item: unknown;
  level: number;
  expanded: boolean;
  selected: boolean;
  detailsOpened: boolean;
}

declare class GridColumn {
  renderer(root: HTMLElement, column: GridColumn, rowData: RowData): void;
}

declare class GridElement extends HTMLElement {
  columns: GridColumn[];
}
