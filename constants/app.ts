export const PAGE_SIZE_LIMIT = 20

export enum LANGUAGE_SUPPORT {
  EN = 'en',
  CN = 'cn',
  JP = 'jp',
}

export enum THEME_MODE {
  Dark = 'dark',
  Light = 'light',
}

export enum INFO_CONTACT {
  SDT = '0392225405',
  Mail = 'hodiencong2000@gmail.com',
  Face = 'Hồ Diên Công',
}

export enum LINK_CONTACT {
  Zalo = 'https://zalo.me/0344798392',
  HoDieCong = 'https://hdcong.vercel.app/',
  FaceBook = 'https://www.facebook.com/ho.dien.cong.2024',
  Github = 'https://github.com/CongSofwareEngineer',
  SDT = 'tel:+84392225405',
  Mail = 'mailto:hodiencong2000@gmail.com',
  CV = 'https://www.topcv.vn/xem-cv/UFNWCwJVXldaBg5XVAQPDAQBAQxVD1RRAAUAAAedeb',
  GGMap = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d245.27946055157543!2d104.47439031761917!3d10.38408607257531!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109db6752fd6d67%3A0xfdc817d347739de1!2zTmjDoCB0cuG7jSBiw6xuaCBkw6JuIFRoYW5oIER1eQ!5e0!3m2!1sen!2s!4v1750173449168!5m2!1sen!2s',
}

export enum REQUEST_TYPE {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
export enum OBSERVER_KEY {
  'LogOut' = 'LogOut',
  'ReLogin' = 'ReLogin',
  'RoutePage' = 'RoutePage',
  'FirstLoadPage' = 'FirstLoadPage',
  'UpdateCookieAuth' = 'UpdateCookieAuth',
}

export enum COOKIE_KEY {
  'Auth' = 'Auth',
  'AuthRefresh' = 'AuthRefresh',

  'Token' = 'Token',
  'TokenRefresh' = 'TokenRefresh',
}

export enum PATH_IMG {
  MyService = 'my-services',
  Users = 'users',
  Comment = 'comment',
  Products = 'products',
  ContactMe = 'contact-me',
  Category = 'category',
  About = 'About',
}

export const MAX_PIXEL_REDUCE = 300 as number
