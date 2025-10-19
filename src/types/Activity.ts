import { Selectable } from "@types/UI";

export interface Activity extends Selectable {
  id: number;
  title: string;
  icon: string;
}
