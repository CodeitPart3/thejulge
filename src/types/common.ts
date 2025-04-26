export interface LinkItem {
  rel: string;
  description: string;
  method: string;
  href: string;
}

export interface ApiWrapper<T> {
  item: T;
  links: LinkItem[];
}

export interface ApiWithHref<T> {
  item: T;
  href: string;
}

export interface ApiPaged<T> {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: ApiWrapper<T>[];
  links: LinkItem[];
}

export const SeoulDistricts = [
  "서울시 종로구",
  "서울시 중구",
  "서울시 용산구",
  "서울시 성동구",
  "서울시 광진구",
  "서울시 동대문구",
  "서울시 중랑구",
  "서울시 성북구",
  "서울시 강북구",
  "서울시 도봉구",
  "서울시 노원구",
  "서울시 은평구",
  "서울시 서대문구",
  "서울시 마포구",
  "서울시 양천구",
  "서울시 강서구",
  "서울시 구로구",
  "서울시 금천구",
  "서울시 영등포구",
  "서울시 동작구",
  "서울시 관악구",
  "서울시 서초구",
  "서울시 강남구",
  "서울시 송파구",
  "서울시 강동구",
] as const;
export type SeoulDistrict = (typeof SeoulDistricts)[number];

export const ShopCategories = [
  "한식",
  "중식",
  "일식",
  "양식",
  "분식",
  "카페",
  "편의점",
  "기타",
] as const;
export type ShopCategory = (typeof ShopCategories)[number];
