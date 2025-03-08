import { ListItem } from "../typings/models/news";

function getItemSize(index: number, items: ListItem[]): number {
    const item = items[index];
    if (item.type === "date") {
      return 36; 
    } else {
      return 170; 
    {}}
  }
export default getItemSize  