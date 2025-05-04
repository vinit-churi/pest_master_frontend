import { object, string} from "zod"
 
export const signInSchema = object({
  email: string().email("Invalid email address"),
  password: string().min(1, "Password is required")
});