export type UserRole = "admin" | "user"

export type User = {
  user_id: string
  email: string
  password: string
  role: UserRole
  is_active: boolean
  created_at: Date
  deleted_at?: Date 
}

export type UserInsert = Omit<User, "created_at" | "deleted_at">