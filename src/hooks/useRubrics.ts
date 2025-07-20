import { useState, useEffect } from 'react';
import { supabase, Rubric, RubricCriteria, RubricLevel } from '../lib/supabase';

export function useRubrics() {
  const [rubrics, setRubrics] = useState<Rubric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRubrics();
  }, []);

  const fetchRubrics = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rubrics')
        .select(`
          *,
          criteria:rubric_criteria(
            *,
            levels:rubric_levels(*)
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRubrics(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createRubric = async (rubricData: {
    title: string;
    description?: string;
    criteria: {
      name: string;
      description?: string;
      levels: {
        name: string;
        description?: string;
        points: number;
      }[];
    }[];
  }) => {
    try {
      // Create rubric
      const { data: rubric, error: rubricError } = await supabase
        .from('rubrics')
        .insert({
          title: rubricData.title,
          description: rubricData.description
        })
        .select()
        .single();

      if (rubricError) throw rubricError;

      // Create criteria and levels
      for (let i = 0; i < rubricData.criteria.length; i++) {
        const criteriaItem = rubricData.criteria[i];
        
        const { data: criteria, error: criteriaError } = await supabase
          .from('rubric_criteria')
          .insert({
            rubric_id: rubric.id,
            name: criteriaItem.name,
            description: criteriaItem.description,
            order_index: i
          })
          .select()
          .single();

        if (criteriaError) throw criteriaError;

        // Create levels for this criteria
        const levels = criteriaItem.levels.map((level, levelIndex) => ({
          criteria_id: criteria.id,
          name: level.name,
          description: level.description,
          points: level.points,
          order_index: levelIndex
        }));

        const { error: levelsError } = await supabase
          .from('rubric_levels')
          .insert(levels);

        if (levelsError) throw levelsError;
      }

      await fetchRubrics();
      return { data: rubric, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const updateRubric = async (id: string, updates: Partial<Rubric>) => {
    try {
      const { data, error } = await supabase
        .from('rubrics')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchRubrics();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const deleteRubric = async (id: string) => {
    try {
      const { error } = await supabase
        .from('rubrics')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      await fetchRubrics();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return {
    rubrics,
    loading,
    error,
    createRubric,
    updateRubric,
    deleteRubric,
    refetch: fetchRubrics
  };
}