import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Plus, 
  Play, 
  Pause, 
  Square, 
  Eye,
  Edit,
  Trash2,
  Settings
} from 'lucide-react';

const SessionManager: React.FC = () => {
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const mockSessions = {
    upcoming: [
      {
        id: 1,
        title: 'Final Portfolio Review',
        date: '2025-01-20',
        time: '09:00',
        duration: '3 hours',
        location: 'Design Studio A',
        coordinator: 'Dr. Michael Chen',
        juryMembers: ['Prof. Emma Wilson', 'Dr. James Rodriguez', 'Sarah Martinez'],
        students: 12,
        rubric: 'Portfolio Assessment',
        status: 'scheduled'
      },
      {
        id: 2,
        title: 'Mid-term Presentations',
        date: '2025-01-22',
        time: '14:00',
        duration: '2 hours',
        location: 'Conference Room B',
        coordinator: 'Prof. Sarah Williams',
        juryMembers: ['Dr. Lisa Park', 'Michael Torres'],
        students: 8,
        rubric: 'Presentation Skills',
        status: 'scheduled'
      }
    ],
    active: [
      {
        id: 3,
        title: 'Design Process Review',
        date: '2025-01-18',
        time: '10:00',
        duration: '4 hours',
        location: 'Design Studio C',
        coordinator: 'Dr. Michael Chen',
        juryMembers: ['Prof. Emma Wilson', 'Dr. James Rodriguez'],
        students: 15,
        rubric: 'Design Process',
        status: 'active',
        progress: { completed: 8, total: 15 }
      }
    ],
    completed: [
      {
        id: 4,
        title: 'Concept Development Review',
        date: '2025-01-15',
        time: '09:00',
        duration: '3 hours',
        location: 'Design Studio A',
        coordinator: 'Prof. Sarah Williams',
        juryMembers: ['Prof. Emma Wilson', 'Dr. Lisa Park'],
        students: 10,
        rubric: 'Creative Process',
        status: 'completed',
        completedAt: '2025-01-15 12:00'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderSessionCard = (session: any) => (
    <div key={session.id} className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </span>
          </div>
          <div className="flex space-x-2">
            {session.status === 'scheduled' && (
              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                <Play className="h-4 w-4" />
              </button>
            )}
            {session.status === 'active' && (
              <>
                <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg">
                  <Pause className="h-4 w-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Square className="h-4 w-4" />
                </button>
              </>
            )}
            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{session.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{session.time} ({session.duration})</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{session.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span>{session.students} students</span>
          </div>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Coordinator:</span>
            <span className="ml-1 font-medium">{session.coordinator}</span>
          </div>
          <div>
            <span className="text-gray-500">Rubric:</span>
            <span className="ml-1 font-medium">{session.rubric}</span>
          </div>
          <div>
            <span className="text-gray-500">Jury Members:</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {session.juryMembers.map((member: string, index: number) => (
                <span key={index} className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                  {member}
                </span>
              ))}
            </div>
          </div>
        </div>

        {session.status === 'active' && session.progress && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium">{session.progress.completed}/{session.progress.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(session.progress.completed / session.progress.total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4 border-t">
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
            <Eye className="h-4 w-4" />
            <span className="text-sm">View Details</span>
          </button>
          <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
            <Edit className="h-4 w-4" />
            <span className="text-sm">Edit</span>
          </button>
          <button className="flex items-center space-x-1 text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
            <span className="text-sm">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Session Management</h2>
          <p className="text-gray-600">Create and manage jury evaluation sessions</p>
        </div>
        <button
          onClick={() => setShowSessionModal(true)}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          <span>Create Session</span>
        </button>
      </div>

      {/* Session Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'active', label: 'Active' },
          { id: 'completed', label: 'Completed' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === tab.id
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            <span className="ml-2 bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
              {mockSessions[tab.id as keyof typeof mockSessions].length}
            </span>
          </button>
        ))}
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockSessions[selectedTab as keyof typeof mockSessions].map(renderSessionCard)}
      </div>

      {/* Create Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Create New Jury Session</h3>
                <button
                  onClick={() => setShowSessionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter session title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                      placeholder="Session location"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                    <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="8">Full day</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coordinator</label>
                    <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                      <option value="">Select coordinator</option>
                      <option value="1">Dr. Michael Chen</option>
                      <option value="2">Prof. Sarah Williams</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Evaluation Rubric</label>
                    <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                      <option value="">Select rubric</option>
                      <option value="1">Portfolio Assessment</option>
                      <option value="2">Presentation Skills</option>
                      <option value="3">Design Process</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jury Members</label>
                  <div className="border rounded-lg p-3 space-y-2 max-h-32 overflow-y-auto">
                    {['Prof. Emma Wilson', 'Dr. James Rodriguez', 'Dr. Lisa Park', 'Michael Torres', 'Sarah Martinez'].map((member) => (
                      <label key={member} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                        <span className="text-sm">{member}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Description</label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                    rows={3}
                    placeholder="Optional session description and instructions"
                  />
                </div>
              </form>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowSessionModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Create Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionManager;