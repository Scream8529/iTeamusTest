import { FilterValues, IVacancy } from "models";

export const getArrayForFilter = (array: any[], filterValue: FilterValues) =>
  array
    .map((item: IVacancy) => item[filterValue])
    .reduce(
      (unique: any[], item) =>
        unique.includes(item) ? unique : [...unique, item],
      []
    );
