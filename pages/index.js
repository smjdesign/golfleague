// File: pages/api/teams/index.js
import { supabase } from '../../../utils/supabaseClient';

export default async function handler(req, res) {
  // GET /api/teams - Get all teams
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
      return res.status(500).json({ error: 'Failed to fetch teams' });
    }
  }
  
  // POST /api/teams - Create a new team
  if (req.method === 'POST') {
    const { name, logo_url } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Team name is required' });
    }
    
    try {
      const { data, error } = await supabase
        .from('teams')
        .insert({ name, logo_url })
        .select();
      
      if (error) throw error;
      
      return res.status(201).json(data[0]);
    } catch (error) {
      console.error('Error creating team:', error);
      return res.status(500).json({ error: 'Failed to create team' });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}

// File: pages/api/teams/[id].js
import { supabase } from '../../../utils/supabaseClient';

export default async function handler(req, res) {
  const { id } = req.query;
  
  // GET /api/teams/[id] - Get a team by ID
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*, players(*)')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      if (!data) {
        return res.status(404).json({ error: 'Team not found' });
      }
      
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Error fetching team ${id}:`, error);
      return res.status(500).json({ error: 'Failed to fetch team' });
    }
  }
  
  // PUT /api/teams/[id] - Update a team
  if (req.method === 'PUT') {
    const { name, logo_url } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Team name is required' });
    }
    
    try {
      const { data, error } = await supabase
        .from('teams')
        .update({ name, logo_url })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      if (data.length === 0) {
        return res.status(404).json({ error: 'Team not found' });
      }
      
      return res.status(200).json(data[0]);
    } catch (error) {
      console.error(`Error updating team ${id}:`, error);
      return res.status(500).json({ error: 'Failed to update team' });
    }
  }
  
  // DELETE /api/teams/[id] - Delete a team
  if (req.method === 'DELETE') {
    try {
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
      console.error(`Error deleting team ${id}:`, error);
      return res.status(500).json({ error: 'Failed to delete team' });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}

// File: pages/api/tournaments/index.js
import { supabase } from '../../../utils/supabaseClient';

export default async function handler(req, res) {
  // GET /api/tournaments - Get all tournaments
  if (req.method === 'GET') {
    const { filter } = req.query; // 'all', 'upcoming', 'past'
    
    try {
      let query = supabase
        .from('tournaments')
        .select('*, course:courses(*)');
      
      if (filter === 'upcoming') {
        query = query.eq('completed', false);
      } else if (filter === 'past') {
        query = query.eq('completed', true);
      }
      
      const { data, error } = await query.order('date', { ascending: filter !== 'past' });
      
      if (error) throw error;
      
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      return res.status(500).json({ error: 'Failed to fetch tournaments' });
    }
  }
  
  // POST /api/tournaments - Create a new tournament
  if (req.method === 'POST') {
    const { name, course_id, date } = req.body;
    
    if (!name || !course_id || !date) {
      return res.status(400).json({ error: 'Tournament name, course ID, and date are required' });
    }
    
    try {
      const { data, error } = await supabase
        .from('tournaments')
        .insert({ name, course_id, date, completed: false })
        .select();
      
      if (error) throw error;
      
      return res.status(201).json(data[0]);
    } catch (error) {
      console.error('Error creating tournament:', error);
      return res.status(500).json({ error: 'Failed to create tournament' });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}

// File: pages/api/courses/index.js
import { supabase } from '../../../utils/supabaseClient';

export default async function handler(req, res) {
  // GET /api/courses - Get all courses
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      return res.status(500).json({ error: 'Failed to fetch courses' });
    }
  }
  
  // POST /api/courses - Create a new course
  if (req.method === 'POST') {
    const { name, location, par, holes, image_url, difficulty } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Course name is required' });
    }
    
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert({ name, location, par, holes, image_url, difficulty })
        .select();
      
      if (error) throw error;
      
      return res.status(201).json(data[0]);
    } catch (error) {
      console.error('Error creating course:', error);
      return res.status(500).json({ error: 'Failed to create course' });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}

// File: pages/api/scores/index.js
import { supabase } from '../../../utils/supabaseClient';

export default async function handler(req, res) {
  // POST /api/scores - Record scores for a tournament
  if (req.method === 'POST') {
    const { tournament_id, player_id, scores } = req.body;
    
    if (!tournament_id || !player_id || !scores || !Array.isArray(scores)) {
      return res.status(400).json({ error: 'Tournament ID, player ID, and scores array are required' });
    }
    
    try {
      // Format the scores for batch insert
      const formattedScores = scores.map(score => ({
        tournament_id,
        player_id,
        hole_number: score.hole_number,
        strokes: score.strokes
      }));
      
      // Insert the scores
      const { data, error } = await supabase
        .from('scores')
        .upsert(formattedScores, { onConflict: 'tournament_id,player_id,hole_number' })
        .select();
      
      if (error) throw error;
      
      return res.status(201).json(data);
    } catch (error) {
      console.error('Error recording scores:', error);
      return res.status(500).json({ error: 'Failed to record scores' });
    }
  }
  
  // GET /api/scores - Get scores by tournament and player
  if (req.method === 'GET') {
    const { tournament_id, player_id } = req.query;
    
    if (!tournament_id) {
      return res.status(400).json({ error: 'Tournament ID is required' });
    }
    
    try {
      let query = supabase
        .from('scores')
        .select('*')
        .eq('tournament_id', tournament_id);
      
      if (player_id) {
        query = query.eq('player_id', player_id);
      }
      
      const { data, error } = await query.order('hole_number');
      
      if (error) throw error;
      
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching scores:', error);
      return res.status(500).json({ error: 'Failed to fetch scores' });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}

// File: pages/api/standings.js
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  // GET /api/standings - Get league standings
  if (req.method === 'GET') {
    const { filter_type } = req.query; // 'overall', 'team', 'player'
    
    // Default to 'overall' if no filter is specified
    const filterType = filter_type || 'overall';
    
    try {
      const { data, error } = await supabase
        .rpc('get_standings', { filter_type: filterType });
      
      if (error) throw error;
      
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching standings:', error);
      return res.status(500).json({ error: 'Failed to fetch standings' });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}

// File: utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);