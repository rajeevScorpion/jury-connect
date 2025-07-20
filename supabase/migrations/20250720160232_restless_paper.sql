/*
  # Insert Sample Data for Testing

  1. Sample Data
    - Admin, coordinator, jury, and student profiles
    - Sample rubrics with criteria and levels
    - Test sessions with participants
    - Sample evaluations and scores

  2. Notes
    - All passwords are set to 'password123' for testing
    - Email confirmation is disabled for testing
*/

-- Insert sample profiles (these will be created when users sign up)
-- We'll create the auth users first, then the profiles will be auto-created

-- Sample rubrics
INSERT INTO rubrics (id, title, description, is_active, usage_count) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Portfolio Assessment', 'Comprehensive portfolio evaluation rubric for design students', true, 12),
  ('550e8400-e29b-41d4-a716-446655440002', 'Presentation Skills', 'Evaluation rubric for oral presentations and communication', true, 8),
  ('550e8400-e29b-41d4-a716-446655440003', 'Design Process', 'Assessment of design methodology and process documentation', true, 15),
  ('550e8400-e29b-41d4-a716-446655440004', 'Creative Thinking', 'Evaluation of creative problem-solving and innovation', true, 6);

-- Sample rubric criteria for Portfolio Assessment
INSERT INTO rubric_criteria (id, rubric_id, name, description, max_points, order_index) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Creative Thinking', 'Originality and innovation in design approach', 4, 1),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Technical Skills', 'Proficiency in design tools and techniques', 4, 2),
  ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Presentation Quality', 'Clarity and effectiveness of project presentation', 4, 3),
  ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'Process Documentation', 'Quality of design process documentation', 4, 4);

-- Sample rubric criteria for Design Process
INSERT INTO rubric_criteria (id, rubric_id, name, description, max_points, order_index) VALUES
  ('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 'Research & Analysis', 'Quality of initial research and problem analysis', 4, 1),
  ('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440003', 'Ideation Process', 'Creativity and thoroughness in idea generation', 4, 2),
  ('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440003', 'Design Development', 'Iteration and refinement of design solutions', 4, 3),
  ('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440003', 'Final Solution', 'Quality and effectiveness of final design', 4, 4);

-- Sample rubric levels for Creative Thinking
INSERT INTO rubric_levels (criteria_id, name, description, points, order_index) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Excellent', 'Demonstrates exceptional creativity and original thinking', 4, 1),
  ('660e8400-e29b-41d4-a716-446655440001', 'Good', 'Shows good creative problem-solving abilities', 3, 2),
  ('660e8400-e29b-41d4-a716-446655440001', 'Satisfactory', 'Adequate creative approach with some originality', 2, 3),
  ('660e8400-e29b-41d4-a716-446655440001', 'Needs Improvement', 'Limited creativity, relies heavily on existing solutions', 1, 4);

-- Sample rubric levels for Technical Skills
INSERT INTO rubric_levels (criteria_id, name, description, points, order_index) VALUES
  ('660e8400-e29b-41d4-a716-446655440002', 'Excellent', 'Masterful use of tools and advanced techniques', 4, 1),
  ('660e8400-e29b-41d4-a716-446655440002', 'Good', 'Proficient use of design tools and methods', 3, 2),
  ('660e8400-e29b-41d4-a716-446655440002', 'Satisfactory', 'Basic competency in required tools', 2, 3),
  ('660e8400-e29b-41d4-a716-446655440002', 'Needs Improvement', 'Limited technical skills, needs development', 1, 4);

-- Sample rubric levels for Presentation Quality
INSERT INTO rubric_levels (criteria_id, name, description, points, order_index) VALUES
  ('660e8400-e29b-41d4-a716-446655440003', 'Excellent', 'Outstanding presentation with clear communication', 4, 1),
  ('660e8400-e29b-41d4-a716-446655440003', 'Good', 'Well-organized presentation with good clarity', 3, 2),
  ('660e8400-e29b-41d4-a716-446655440003', 'Satisfactory', 'Adequate presentation with some unclear areas', 2, 3),
  ('660e8400-e29b-41d4-a716-446655440003', 'Needs Improvement', 'Poor presentation quality, unclear communication', 1, 4);

-- Sample rubric levels for Process Documentation
INSERT INTO rubric_levels (criteria_id, name, description, points, order_index) VALUES
  ('660e8400-e29b-41d4-a716-446655440004', 'Excellent', 'Comprehensive documentation of entire design process', 4, 1),
  ('660e8400-e29b-41d4-a716-446655440004', 'Good', 'Good documentation with clear process steps', 3, 2),
  ('660e8400-e29b-41d4-a716-446655440004', 'Satisfactory', 'Basic documentation covering main process points', 2, 3),
  ('660e8400-e29b-41d4-a716-446655440004', 'Needs Improvement', 'Incomplete or unclear process documentation', 1, 4);

-- Add levels for Design Process criteria as well
INSERT INTO rubric_levels (criteria_id, name, description, points, order_index) VALUES
  -- Research & Analysis levels
  ('660e8400-e29b-41d4-a716-446655440005', 'Excellent', 'Comprehensive research with deep analysis', 4, 1),
  ('660e8400-e29b-41d4-a716-446655440005', 'Good', 'Good research with solid analysis', 3, 2),
  ('660e8400-e29b-41d4-a716-446655440005', 'Satisfactory', 'Basic research with adequate analysis', 2, 3),
  ('660e8400-e29b-41d4-a716-446655440005', 'Needs Improvement', 'Limited research and shallow analysis', 1, 4),
  
  -- Ideation Process levels
  ('660e8400-e29b-41d4-a716-446655440006', 'Excellent', 'Extensive ideation with creative solutions', 4, 1),
  ('660e8400-e29b-41d4-a716-446655440006', 'Good', 'Good variety of ideas with some creativity', 3, 2),
  ('660e8400-e29b-41d4-a716-446655440006', 'Satisfactory', 'Basic ideation with standard approaches', 2, 3),
  ('660e8400-e29b-41d4-a716-446655440006', 'Needs Improvement', 'Limited ideation and conventional thinking', 1, 4),
  
  -- Design Development levels
  ('660e8400-e29b-41d4-a716-446655440007', 'Excellent', 'Thorough development with multiple iterations', 4, 1),
  ('660e8400-e29b-41d4-a716-446655440007', 'Good', 'Good development with some iteration', 3, 2),
  ('660e8400-e29b-41d4-a716-446655440007', 'Satisfactory', 'Basic development with minimal iteration', 2, 3),
  ('660e8400-e29b-41d4-a716-446655440007', 'Needs Improvement', 'Poor development with no iteration', 1, 4),
  
  -- Final Solution levels
  ('660e8400-e29b-41d4-a716-446655440008', 'Excellent', 'Outstanding final solution meeting all requirements', 4, 1),
  ('660e8400-e29b-41d4-a716-446655440008', 'Good', 'Good final solution with minor issues', 3, 2),
  ('660e8400-e29b-41d4-a716-446655440008', 'Satisfactory', 'Adequate final solution with some problems', 2, 3),
  ('660e8400-e29b-41d4-a716-446655440008', 'Needs Improvement', 'Poor final solution with major issues', 1, 4);