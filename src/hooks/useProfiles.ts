import { useState, useEffect } from 'react';
import { supabase, Profile } from '../lib/supabase';

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getProfilesByRole = (role: Profile['role']) => {
    return profiles.filter(profile => profile.role === role);
  };

  const createProfile = async (profileData: {
    email: string;
    password: string;
    full_name: string;
    role: Profile['role'];
    department?: string;
    expertise?: string;
  }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: profileData.email,
        password: profileData.password,
        options: {
          data: {
            full_name: profileData.full_name,
            role: profileData.role,
            department: profileData.department,
            expertise: profileData.expertise
          }
        }
      });

      if (error) throw error;
      await fetchProfiles();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const updateProfile = async (id: string, updates: Partial<Profile>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchProfiles();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const deactivateProfile = async (id: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      await fetchProfiles();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return {
    profiles,
    loading,
    error,
    getProfilesByRole,
    createProfile,
    updateProfile,
    deactivateProfile,
    refetch: fetchProfiles
  };
}