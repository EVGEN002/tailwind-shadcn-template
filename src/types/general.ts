export interface UploadResponse {
  code: string;
  date_created: string;
  ext: string;
  login_created: string;
  name: string;
  obj: string;
  obj_code: string;
  size: number;
  tip: string
  title: string;
};

export interface DistrictLocation {
  guid: string;
  id: number;
  name: string;
  fullName: string;
}

export interface NaslegLocation {
  districtID: number;
  guid: string;
  id: number;
  name: string;
}

export interface TownLocation {
  guid: string;
  id: number;
  name: string;
  naslegID: number;
}

export interface LocationDictionary {
  districts: DistrictLocation[];
  naslegs: NaslegLocation[];
  towns: TownLocation[];
}
