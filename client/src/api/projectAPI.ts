import axios from "axios"

const API_BASE = import.meta.env.VITE_BACKEND_URL ||
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? ""
        : `http://${window.location.hostname}:4000`)


export const projectAPI = {
    // Save a project
    saveProject: async (
        projectData: {
            roomId: string
            projectName: string
            description?: string
            fileStructure: Record<string, unknown>
            files: Array<{ id: string; name: string; content: string; language?: string }>
            drawingData?: Record<string, unknown>
        },
        token: string
    ) => {
        return axios.post(`${API_BASE}/api/projects/save`, projectData, {
            headers: { Authorization: `Bearer ${token}` },
        })
    },

    // Get all projects
    getProjects: async (token: string) => {
        return axios.get(`${API_BASE}/api/projects/list`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    },

    // Get a specific project
    getProject: async (projectId: string, token: string) => {
        return axios.get(`${API_BASE}/api/projects/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    },

    // Get project by room ID
    getProjectByRoom: async (roomId: string, token: string) => {
        return axios.get(`${API_BASE}/api/projects/room/${roomId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    },

    // Delete a project
    deleteProject: async (projectId: string, token: string) => {
        return axios.delete(`${API_BASE}/api/projects/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    },

    // Update drawing data
    updateDrawingData: async (
        projectId: string,
        drawingData: Record<string, unknown>,
        token: string
    ) => {
        return axios.patch(`${API_BASE}/api/projects/${projectId}/drawing`, { drawingData }, {
            headers: { Authorization: `Bearer ${token}` },
        })
    },
}

export default projectAPI
