export interface Course {
  id?: string
  title?: string
  description?: string
  image?: string
  price?: number
  benefit?: string
  time?: string
  minAge?: number
  maxAge?: number
  star?: number
}

export interface ListCourse {
  page?: number
  data: Course[]
}

export interface RegisterCurse {
  id?: string
  name?: string
  email?: string
  sdt?: string
  idCourse?: string
  age?: number
}
