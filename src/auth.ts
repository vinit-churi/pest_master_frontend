import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod"
import { signInSchema } from "./lib/zod/auth"
// Your own logic for dealing with plaintext password strings; be careful!
 
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}

type Role = "admin" | "sales" | "agent";

interface DemoUser {
  id: string;
  name: string;
  email: string;
  password: string;      // plain‑text for demo
  role: Role;
  address: string;
}


const DEMO_USERS: DemoUser[] = [
  {
    id: "admin-1",
    name: "Alice Admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
    address: "123 Admin St, Demo City",
  },
  {
    id: "sales-1",
    name: "Sam Sales",
    email: "sales@example.com",
    password: "sales123",
    role: "sales",
    address: "456 Sales Ave, Demo City",
  },
  {
    id: "agent-1",
    name: "Andy Agent",
    email: "agent@example.com",
    password: "agent123",
    role: "agent",
    address: "789 Agent Rd, Demo City",
  },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          console.log(credentials, 'test')
          const { email, password } = await signInSchema.parseAsync(credentials);
          
          console.log("Validation passed - Searching for user:", email);
          const user = DEMO_USERS.find(u => 
            u.email.toLowerCase() === email.trim().toLowerCase() && 
            u.password === password
          );
      
          if (!user) {
            console.log("User not found or password mismatch");
            return null;
          }
      
          console.log("Authentication successful for user:", user.email);
          return { ...user };
      
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
      
    }),
  ],
  pages: {
    signIn: "/login",
  },
})