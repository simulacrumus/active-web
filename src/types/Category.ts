import { Selectable } from "@types/UI";
import { Activity } from "./Activity";

export interface Category extends Selectable {
  id: number;
  title: string;
  icon: string;
  activities: Activity[];
}
