export interface Post {
  id?:number,
  name:string,
  body?:string,
  firstName?: string,
  lastName?: string,
  email?: string,
  phone?:string,
  isActive?: boolean,
  status?:string,
  address?: {
    street?: string,
    city?: string,
    state?: string
  }
}