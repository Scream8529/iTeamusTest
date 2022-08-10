export interface IVacancy {
  address: string;
  baseindex: number;
  clientid: number;
  clientname: string;
  directionid: number;
  directiontitle: string;
  flghot: number;
  flgstemmer: number;
  is_active: number;
  latitude: number;
  longitude: number;
  numentries: null | string | number;
  numgeoentries: null | string | number;
  placeid: number;
  placetitle: string;
  profid: number;
  proftitle: string;
  region_id: number;
  regionname: string;
  salary_day: number;
  salary_hour: null | string | number;
  salary_month: null | string | number;
  salary_type: number;
  salary_type_title: string;
  salary_volume: string;
  salary_volume_ex: string;
  salary_week: null | string | number;
  search_desc: string;
  search_geo: string;
  stafftype: number;
  stationname: null | string | number;
  vacancy_id: number;
  vacplacement_id: number;
  vdescription: string;
  websitevacancynum: string;
}

export type FilterValues = "placetitle" | "regionname" | "clientname";

export interface IFilterValue {
  region?: string;
  city?: string;
  company?: string;
}

export type IFilterValues = {
  region: string;
  citys: {
    city: string;
    companys: string[];
  }[];
}[];
