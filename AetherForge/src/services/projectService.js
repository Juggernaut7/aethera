import axios from 'axios';

// Create a new project
export const createProject = async (projectData) => {
  try {
    const response = await axios.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error(error.response?.data?.message || 'Failed to create project');
  }
};

// Get all projects for the current user
export const getProjects = async () => {
  try {
    const response = await axios.get('/projects');
    return response.data.projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch projects');
  }
};

// Get a specific project by ID
export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(`/projects/${projectId}`);
    return response.data.project;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch project');
  }
};

// Update a project
export const updateProject = async (projectId, updateData) => {
  try {
    const response = await axios.put(`/projects/${projectId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error(error.response?.data?.message || 'Failed to update project');
  }
};

// Delete a project
export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete project');
  }
};

// Get public projects (for gallery)
export const getPublicProjects = async (page = 1, limit = 12) => {
  try {
    const response = await axios.get('/public-projects', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching public projects:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch public projects');
  }
};

// Save project to localStorage as backup
export const saveProjectToLocalStorage = (project) => {
  try {
    const projects = JSON.parse(localStorage.getItem('aetherforge_projects') || '[]');
    const existingIndex = projects.findIndex(p => p._id === project._id);
    
    if (existingIndex >= 0) {
      projects[existingIndex] = project;
    } else {
      projects.push(project);
    }
    
    localStorage.setItem('aetherforge_projects', JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving project to localStorage:', error);
  }
};

// Load projects from localStorage as backup
export const loadProjectsFromLocalStorage = () => {
  try {
    const projects = JSON.parse(localStorage.getItem('aetherforge_projects') || '[]');
    return projects;
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
    return [];
  }
}; 