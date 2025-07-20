import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'coordinator' | 'jury' | 'student';
  department?: string;
  expertise?: string;
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Rubric {
  id: string;
  title: string;
  description?: string;
  created_by?: string;
  is_active: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
  criteria?: RubricCriteria[];
}

export interface RubricCriteria {
  id: string;
  rubric_id: string;
  name: string;
  description?: string;
  max_points: number;
  order_index: number;
  created_at: string;
  levels?: RubricLevel[];
}

export interface RubricLevel {
  id: string;
  criteria_id: string;
  name: string;
  description?: string;
  points: number;
  order_index: number;
  created_at: string;
}

export interface Session {
  id: string;
  title: string;
  description?: string;
  session_date: string;
  start_time: string;
  duration_hours: number;
  location: string;
  coordinator_id?: string;
  rubric_id?: string;
  status: 'scheduled' | 'active' | 'paused' | 'completed' | 'cancelled';
  max_students: number;
  qr_code?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  coordinator?: Profile;
  rubric?: Rubric;
  participants?: SessionParticipant[];
  students?: Student[];
}

export interface SessionParticipant {
  id: string;
  session_id: string;
  jury_id: string;
  invited_at: string;
  accepted_at?: string;
  status: string;
  jury?: Profile;
}

export interface Student {
  id: string;
  session_id: string;
  profile_id?: string;
  full_name: string;
  email: string;
  program?: string;
  year?: string;
  project_title?: string;
  registration_status: string;
  qr_verified: boolean;
  qr_verified_at?: string;
  time_slot_start?: string;
  time_slot_end?: string;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Evaluation {
  id: string;
  session_id: string;
  student_id: string;
  jury_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  total_score: number;
  max_score: number;
  written_feedback?: string;
  audio_feedback_url?: string;
  audio_transcript?: string;
  ai_summary?: string;
  submitted_at?: string;
  created_at: string;
  updated_at: string;
  student?: Student;
  jury?: Profile;
  scores?: EvaluationScore[];
}

export interface EvaluationScore {
  id: string;
  evaluation_id: string;
  criteria_id: string;
  score: number;
  feedback?: string;
  created_at: string;
  criteria?: RubricCriteria;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'invitation' | 'reminder' | 'evaluation' | 'system';
  is_read: boolean;
  action_url?: string;
  created_at: string;
}