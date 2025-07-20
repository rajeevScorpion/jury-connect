import { useState, useEffect } from 'react';
import { supabase, Session } from '../lib/supabase';

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sessions')
        .select(`
          *,
          coordinator:profiles!coordinator_id(*),
          rubric:rubrics(*),
          participants:session_participants(
            *,
            jury:profiles!jury_id(*)
          ),
          students(*)
        `)
        .order('session_date', { ascending: true });

      if (error) throw error;
      setSessions(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createSession = async (sessionData: {
    title: string;
    description?: string;
    session_date: string;
    start_time: string;
    duration_hours: number;
    location: string;
    coordinator_id?: string;
    rubric_id?: string;
    max_students: number;
    jury_members?: string[];
  }) => {
    try {
      const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .insert({
          title: sessionData.title,
          description: sessionData.description,
          session_date: sessionData.session_date,
          start_time: sessionData.start_time,
          duration_hours: sessionData.duration_hours,
          location: sessionData.location,
          coordinator_id: sessionData.coordinator_id,
          rubric_id: sessionData.rubric_id,
          max_students: sessionData.max_students,
          qr_code: `QR-${Date.now()}`
        })
        .select()
        .single();

      if (sessionError) throw sessionError;

      // Add jury members if provided
      if (sessionData.jury_members && sessionData.jury_members.length > 0) {
        const participants = sessionData.jury_members.map(juryId => ({
          session_id: session.id,
          jury_id: juryId
        }));

        const { error: participantsError } = await supabase
          .from('session_participants')
          .insert(participants);

        if (participantsError) throw participantsError;
      }

      await fetchSessions();
      return { data: session, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const updateSession = async (id: string, updates: Partial<Session>) => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchSessions();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const updateSessionStatus = async (id: string, status: Session['status']) => {
    return updateSession(id, { status });
  };

  const deleteSession = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchSessions();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const addStudentToSession = async (sessionId: string, studentData: {
    full_name: string;
    email: string;
    program?: string;
    year?: string;
    project_title?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert({
          session_id: sessionId,
          ...studentData
        })
        .select()
        .single();

      if (error) throw error;
      await fetchSessions();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return {
    sessions,
    loading,
    error,
    createSession,
    updateSession,
    updateSessionStatus,
    deleteSession,
    addStudentToSession,
    refetch: fetchSessions
  };
}