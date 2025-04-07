export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      amenities: {
        Row: {
          icon: string
          id: string
          name: string
        }
        Insert: {
          icon: string
          id?: string
          name: string
        }
        Update: {
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      club_amenities: {
        Row: {
          amenity_id: string
          club_id: string
        }
        Insert: {
          amenity_id: string
          club_id: string
        }
        Update: {
          amenity_id?: string
          club_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_amenities_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      club_images: {
        Row: {
          club_id: string | null
          created_at: string | null
          id: string
          is_primary: boolean | null
          url: string
        }
        Insert: {
          club_id?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          url: string
        }
        Update: {
          club_id?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_images_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      clubs: {
        Row: {
          address: string
          city: string
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          latitude: number
          longitude: number
          membership_status: string
          name: string
          phone: string | null
          postal_code: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          latitude: number
          longitude: number
          membership_status?: string
          name: string
          phone?: string | null
          postal_code: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          latitude?: number
          longitude?: number
          membership_status?: string
          name?: string
          phone?: string | null
          postal_code?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      favorite_clubs: {
        Row: {
          club_id: string
          created_at: string | null
          user_id: string
        }
        Insert: {
          club_id: string
          created_at?: string | null
          user_id: string
        }
        Update: {
          club_id?: string
          created_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_clubs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      operating_hours: {
        Row: {
          close_time: string | null
          club_id: string | null
          day_of_week: number
          id: string
          is_closed: boolean | null
          open_time: string | null
        }
        Insert: {
          close_time?: string | null
          club_id?: string | null
          day_of_week: number
          id?: string
          is_closed?: boolean | null
          open_time?: string | null
        }
        Update: {
          close_time?: string | null
          club_id?: string | null
          day_of_week?: number
          id?: string
          is_closed?: boolean | null
          open_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "operating_hours_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          club_id: string | null
          comment: string | null
          created_at: string | null
          id: string
          rating: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          club_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          rating: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          club_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      strains: {
        Row: {
          "add/adhd": string | null
          "alzheimer's": string | null
          anorexia: string | null
          anxiety: string | null
          anxious: string | null
          aroused: string | null
          arthritis: string | null
          asthma: string | null
          bipolar_disorder: string | null
          cancer: string | null
          cramps: string | null
          creative: string | null
          "crohn's_disease": string | null
          depression: string | null
          description: string | null
          dizzy: string | null
          dry_eyes: string | null
          dry_mouth: string | null
          energetic: string | null
          epilepsy: string | null
          euphoric: string | null
          eye_pressure: string | null
          fatigue: string | null
          fibromyalgia: string | null
          focused: string | null
          gastrointestinal_disorder: string | null
          giggly: string | null
          glaucoma: string | null
          happy: string | null
          headache: string | null
          headaches: string | null
          "hiv/aids": string | null
          hungry: string | null
          hypertension: string | null
          img_url: string | null
          inflammation: string | null
          insomnia: string | null
          lack_of_appetite: string | null
          migraines: string | null
          most_common_terpene: string | null
          multiple_sclerosis: string | null
          muscle_spasms: string | null
          muscular_dystrophy: string | null
          name: string
          nausea: string | null
          pain: string | null
          paranoid: string | null
          "parkinson's": string | null
          phantom_limb_pain: string | null
          pms: string | null
          ptsd: string | null
          relaxed: string | null
          seizures: string | null
          sleepy: string | null
          spasticity: string | null
          spinal_cord_injury: string | null
          stress: string | null
          talkative: string | null
          thc_level: number | null
          tingly: string | null
          tinnitus: string | null
          "tourette's_syndrome": string | null
          type: string | null
          uplifted: string | null
        }
        Insert: {
          "add/adhd"?: string | null
          "alzheimer's"?: string | null
          anorexia?: string | null
          anxiety?: string | null
          anxious?: string | null
          aroused?: string | null
          arthritis?: string | null
          asthma?: string | null
          bipolar_disorder?: string | null
          cancer?: string | null
          cramps?: string | null
          creative?: string | null
          "crohn's_disease"?: string | null
          depression?: string | null
          description?: string | null
          dizzy?: string | null
          dry_eyes?: string | null
          dry_mouth?: string | null
          energetic?: string | null
          epilepsy?: string | null
          euphoric?: string | null
          eye_pressure?: string | null
          fatigue?: string | null
          fibromyalgia?: string | null
          focused?: string | null
          gastrointestinal_disorder?: string | null
          giggly?: string | null
          glaucoma?: string | null
          happy?: string | null
          headache?: string | null
          headaches?: string | null
          "hiv/aids"?: string | null
          hungry?: string | null
          hypertension?: string | null
          img_url?: string | null
          inflammation?: string | null
          insomnia?: string | null
          lack_of_appetite?: string | null
          migraines?: string | null
          most_common_terpene?: string | null
          multiple_sclerosis?: string | null
          muscle_spasms?: string | null
          muscular_dystrophy?: string | null
          name: string
          nausea?: string | null
          pain?: string | null
          paranoid?: string | null
          "parkinson's"?: string | null
          phantom_limb_pain?: string | null
          pms?: string | null
          ptsd?: string | null
          relaxed?: string | null
          seizures?: string | null
          sleepy?: string | null
          spasticity?: string | null
          spinal_cord_injury?: string | null
          stress?: string | null
          talkative?: string | null
          thc_level?: number | null
          tingly?: string | null
          tinnitus?: string | null
          "tourette's_syndrome"?: string | null
          type?: string | null
          uplifted?: string | null
        }
        Update: {
          "add/adhd"?: string | null
          "alzheimer's"?: string | null
          anorexia?: string | null
          anxiety?: string | null
          anxious?: string | null
          aroused?: string | null
          arthritis?: string | null
          asthma?: string | null
          bipolar_disorder?: string | null
          cancer?: string | null
          cramps?: string | null
          creative?: string | null
          "crohn's_disease"?: string | null
          depression?: string | null
          description?: string | null
          dizzy?: string | null
          dry_eyes?: string | null
          dry_mouth?: string | null
          energetic?: string | null
          epilepsy?: string | null
          euphoric?: string | null
          eye_pressure?: string | null
          fatigue?: string | null
          fibromyalgia?: string | null
          focused?: string | null
          gastrointestinal_disorder?: string | null
          giggly?: string | null
          glaucoma?: string | null
          happy?: string | null
          headache?: string | null
          headaches?: string | null
          "hiv/aids"?: string | null
          hungry?: string | null
          hypertension?: string | null
          img_url?: string | null
          inflammation?: string | null
          insomnia?: string | null
          lack_of_appetite?: string | null
          migraines?: string | null
          most_common_terpene?: string | null
          multiple_sclerosis?: string | null
          muscle_spasms?: string | null
          muscular_dystrophy?: string | null
          name?: string
          nausea?: string | null
          pain?: string | null
          paranoid?: string | null
          "parkinson's"?: string | null
          phantom_limb_pain?: string | null
          pms?: string | null
          ptsd?: string | null
          relaxed?: string | null
          seizures?: string | null
          sleepy?: string | null
          spasticity?: string | null
          spinal_cord_injury?: string | null
          stress?: string | null
          talkative?: string | null
          thc_level?: number | null
          tingly?: string | null
          tinnitus?: string | null
          "tourette's_syndrome"?: string | null
          type?: string | null
          uplifted?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
