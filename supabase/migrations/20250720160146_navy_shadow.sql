/*
  # Initial Schema for Jury Evaluation System

  1. New Tables
    - `profiles` - User profiles with role information
    - `rubrics` - Evaluation rubrics with criteria
    - `rubric_criteria` - Individual criteria for rubrics
    - `rubric_levels` - Performance levels for each criteria
    - `sessions` - Jury evaluation sessions
    - `session_participants` - Junction table for session participants
    - `students` - Student information and registration
    - `evaluations` - Individual student evaluations
    - `evaluation_scores` - Scores for each criteria
    - `notifications` - System notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'coordinator', 'jury', 'student');
CREATE TYPE session_status AS ENUM ('scheduled', 'active', 'paused', 'completed', 'cancelled');
CREATE TYPE evaluation_status AS ENUM ('pending', 'in_progress', 'completed');
CREATE TYPE notification_type AS ENUM ('invitation', 'reminder', 'evaluation', 'system');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  department text,
  expertise text,
  phone text,
  avatar_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Rubrics table
CREATE TABLE IF NOT EXISTS rubrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  is_active boolean DEFAULT true,
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Rubric criteria table
CREATE TABLE IF NOT EXISTS rubric_criteria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rubric_id uuid REFERENCES rubrics(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  max_points integer DEFAULT 4,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Rubric performance levels table
CREATE TABLE IF NOT EXISTS rubric_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  criteria_id uuid REFERENCES rubric_criteria(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  points integer NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  session_date date NOT NULL,
  start_time time NOT NULL,
  duration_hours integer DEFAULT 3,
  location text NOT NULL,
  coordinator_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  rubric_id uuid REFERENCES rubrics(id) ON DELETE SET NULL,
  status session_status DEFAULT 'scheduled',
  max_students integer DEFAULT 20,
  qr_code text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Session participants (jury members)
CREATE TABLE IF NOT EXISTS session_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE,
  jury_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  invited_at timestamptz DEFAULT now(),
  accepted_at timestamptz,
  status text DEFAULT 'invited',
  UNIQUE(session_id, jury_id)
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE,
  profile_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  program text,
  year text,
  project_title text,
  registration_status text DEFAULT 'invited',
  qr_verified boolean DEFAULT false,
  qr_verified_at timestamptz,
  time_slot_start time,
  time_slot_end time,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Evaluations table
CREATE TABLE IF NOT EXISTS evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES sessions(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  jury_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status evaluation_status DEFAULT 'pending',
  total_score integer DEFAULT 0,
  max_score integer DEFAULT 0,
  written_feedback text,
  audio_feedback_url text,
  audio_transcript text,
  ai_summary text,
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(session_id, student_id, jury_id)
);

-- Evaluation scores table
CREATE TABLE IF NOT EXISTS evaluation_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id uuid REFERENCES evaluations(id) ON DELETE CASCADE,
  criteria_id uuid REFERENCES rubric_criteria(id) ON DELETE CASCADE,
  score integer NOT NULL,
  feedback text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(evaluation_id, criteria_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type notification_type DEFAULT 'system',
  is_read boolean DEFAULT false,
  action_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rubrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE rubric_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE rubric_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all profiles"
  ON profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Rubrics policies
CREATE POLICY "Everyone can read active rubrics"
  ON rubrics FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage rubrics"
  ON rubrics FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Rubric criteria policies
CREATE POLICY "Everyone can read criteria"
  ON rubric_criteria FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage criteria"
  ON rubric_criteria FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Rubric levels policies
CREATE POLICY "Everyone can read levels"
  ON rubric_levels FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage levels"
  ON rubric_levels FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Sessions policies
CREATE POLICY "Users can read relevant sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING (
    -- Admins can see all
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    OR
    -- Coordinators can see their sessions
    coordinator_id = auth.uid()
    OR
    -- Jury members can see sessions they're assigned to
    EXISTS (SELECT 1 FROM session_participants WHERE session_id = sessions.id AND jury_id = auth.uid())
    OR
    -- Students can see sessions they're registered for
    EXISTS (SELECT 1 FROM students WHERE session_id = sessions.id AND profile_id = auth.uid())
  );

CREATE POLICY "Admins and coordinators can manage sessions"
  ON sessions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'coordinator')
    )
  );

-- Session participants policies
CREATE POLICY "Users can read relevant participants"
  ON session_participants FOR SELECT
  TO authenticated
  USING (
    -- Admins can see all
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    OR
    -- Coordinators can see participants in their sessions
    EXISTS (SELECT 1 FROM sessions WHERE id = session_id AND coordinator_id = auth.uid())
    OR
    -- Jury members can see their own participation
    jury_id = auth.uid()
  );

CREATE POLICY "Admins and coordinators can manage participants"
  ON session_participants FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'coordinator')
    )
  );

-- Students policies
CREATE POLICY "Users can read relevant students"
  ON students FOR SELECT
  TO authenticated
  USING (
    -- Admins can see all
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    OR
    -- Coordinators can see students in their sessions
    EXISTS (SELECT 1 FROM sessions WHERE id = session_id AND coordinator_id = auth.uid())
    OR
    -- Jury members can see students in their sessions
    EXISTS (
      SELECT 1 FROM session_participants sp
      JOIN sessions s ON sp.session_id = s.id
      WHERE s.id = session_id AND sp.jury_id = auth.uid()
    )
    OR
    -- Students can see their own record
    profile_id = auth.uid()
  );

CREATE POLICY "Admins and coordinators can manage students"
  ON students FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'coordinator')
    )
  );

-- Evaluations policies
CREATE POLICY "Users can read relevant evaluations"
  ON evaluations FOR SELECT
  TO authenticated
  USING (
    -- Admins can see all
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    OR
    -- Coordinators can see evaluations in their sessions
    EXISTS (SELECT 1 FROM sessions WHERE id = session_id AND coordinator_id = auth.uid())
    OR
    -- Jury members can see their own evaluations
    jury_id = auth.uid()
    OR
    -- Students can see evaluations of themselves
    EXISTS (SELECT 1 FROM students WHERE id = student_id AND profile_id = auth.uid())
  );

CREATE POLICY "Jury members can manage their evaluations"
  ON evaluations FOR ALL
  TO authenticated
  USING (jury_id = auth.uid());

-- Evaluation scores policies
CREATE POLICY "Users can read relevant scores"
  ON evaluation_scores FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM evaluations e
      WHERE e.id = evaluation_id
      AND (
        -- Admins can see all
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        OR
        -- Coordinators can see scores in their sessions
        EXISTS (SELECT 1 FROM sessions WHERE id = e.session_id AND coordinator_id = auth.uid())
        OR
        -- Jury members can see their own scores
        e.jury_id = auth.uid()
        OR
        -- Students can see their own scores
        EXISTS (SELECT 1 FROM students WHERE id = e.student_id AND profile_id = auth.uid())
      )
    )
  );

CREATE POLICY "Jury members can manage their scores"
  ON evaluation_scores FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM evaluations
      WHERE id = evaluation_id AND jury_id = auth.uid()
    )
  );

-- Notifications policies
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_sessions_coordinator ON sessions(coordinator_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_students_session ON students(session_id);
CREATE INDEX IF NOT EXISTS idx_students_profile ON students(profile_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_session ON evaluations(session_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_jury ON evaluations(jury_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_student ON evaluations(student_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);

-- Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    COALESCE(new.raw_user_meta_data->>'role', 'student')::user_role
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON rubrics FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON evaluations FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();