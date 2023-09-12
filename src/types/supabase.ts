export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      coaches: {
        Row: {
          areas: string[]
          description: string
          hourlyRate: number
          userId: string
        }
        Insert: {
          areas?: string[]
          description: string
          hourlyRate: number
          userId: string
        }
        Update: {
          areas?: string[]
          description?: string
          hourlyRate?: number
          userId?: string
        }
        Relationships: []
      }
      requests: {
        Row: {
          authorId: string
          coachId: string
          message: string | null
          requestId: string
          sentAbout: number
        }
        Insert: {
          authorId: string
          coachId: string
          message?: string | null
          requestId: string
          sentAbout?: number
        }
        Update: {
          authorId?: string
          coachId?: string
          message?: string | null
          requestId?: string
          sentAbout?: number
        }
        Relationships: [
          {
            foreignKeyName: "requests_authorId_fkey"
            columns: ["authorId"]
            referencedRelation: "users"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "requests_authorId_fkey"
            columns: ["authorId"]
            referencedRelation: "coaches_list_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "requests_coachId_fkey"
            columns: ["coachId"]
            referencedRelation: "coaches"
            referencedColumns: ["userId"]
          }
        ]
      }
      reviews: {
        Row: {
          authorId: string
          createdAt: number
          description: string
          editedAt: number | null
          rate: number
          reviewId: string
          userId: string
        }
        Insert: {
          authorId: string
          createdAt?: number
          description: string
          editedAt?: number | null
          rate?: number
          reviewId?: string
          userId: string
        }
        Update: {
          authorId?: string
          createdAt?: number
          description?: string
          editedAt?: number | null
          rate?: number
          reviewId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_authorId_fkey"
            columns: ["authorId"]
            referencedRelation: "users"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "reviews_authorId_fkey"
            columns: ["authorId"]
            referencedRelation: "coaches_list_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "reviews_userId_fkey"
            columns: ["userId"]
            referencedRelation: "coaches"
            referencedColumns: ["userId"]
          }
        ]
      }
      users: {
        Row: {
          age: number | null
          areas: string[] | null
          description: string | null
          email: string
          firstName: string
          hourlyRate: number | null
          isAdmin: boolean
          isCoach: boolean
          lastName: string
          registerDate: number
          userId: string
        }
        Insert: {
          age?: number | null
          areas?: string[] | null
          description?: string | null
          email: string
          firstName: string
          hourlyRate?: number | null
          isAdmin: boolean
          isCoach?: boolean
          lastName: string
          registerDate?: number
          userId: string
        }
        Update: {
          age?: number | null
          areas?: string[] | null
          description?: string | null
          email?: string
          firstName?: string
          hourlyRate?: number | null
          isAdmin?: boolean
          isCoach?: boolean
          lastName?: string
          registerDate?: number
          userId?: string
        }
        Relationships: []
      }
    }
    Views: {
      coaches_list_view: {
        Row: {
          age: number | null
          areas: string[] | null
          description: string | null
          email: string | null
          firstName: string | null
          hourlyRate: number | null
          isAdmin: boolean | null
          isCoach: boolean | null
          lastName: string | null
          registerDate: number | null
          userId: string | null
        }
        Insert: {
          age?: number | null
          areas?: string[] | null
          description?: string | null
          email?: string | null
          firstName?: string | null
          hourlyRate?: number | null
          isAdmin?: boolean | null
          isCoach?: boolean | null
          lastName?: string | null
          registerDate?: number | null
          userId?: string | null
        }
        Update: {
          age?: number | null
          areas?: string[] | null
          description?: string | null
          email?: string | null
          firstName?: string | null
          hourlyRate?: number | null
          isAdmin?: boolean | null
          isCoach?: boolean | null
          lastName?: string | null
          registerDate?: number | null
          userId?: string | null
        }
        Relationships: []
      }
      requests_list_view: {
        Row: {
          authorId: string | null
          coachId: string | null
          email: string | null
          firstName: string | null
          lastName: string | null
          message: string | null
          sentAbout: number | null
        }
        Relationships: [
          {
            foreignKeyName: "requests_authorId_fkey"
            columns: ["authorId"]
            referencedRelation: "users"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "requests_authorId_fkey"
            columns: ["authorId"]
            referencedRelation: "coaches_list_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "requests_coachId_fkey"
            columns: ["coachId"]
            referencedRelation: "coaches"
            referencedColumns: ["userId"]
          }
        ]
      }
      reviews_author_count: {
        Row: {
          authorId: string | null
          reviewsCount: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_authorId_fkey"
            columns: ["authorId"]
            referencedRelation: "users"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "reviews_authorId_fkey"
            columns: ["authorId"]
            referencedRelation: "coaches_list_view"
            referencedColumns: ["userId"]
          }
        ]
      }
      reviews_list_view: {
        Row: {
          authorId: string | null
          createdAt: number | null
          description: string | null
          firstName: string | null
          lastName: string | null
          rate: number | null
          reviewId: string | null
          reviewsCount: number | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_authorId_fkey"
            columns: ["authorId"]
            referencedRelation: "users"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "reviews_authorId_fkey"
            columns: ["authorId"]
            referencedRelation: "coaches_list_view"
            referencedColumns: ["userId"]
          },
          {
            foreignKeyName: "reviews_userId_fkey"
            columns: ["userId"]
            referencedRelation: "coaches"
            referencedColumns: ["userId"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
