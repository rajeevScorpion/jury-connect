import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  LogOut, 
  BookOpen, 
  Play,
  ChevronLeft,
  ChevronRight,
  Save,
  Mic,
  MicOff,
  Send
} from 'lucide-react';
import EvaluationInterface from './EvaluationInterface';

interface JuryDashboardProps {
  user: any;
  onLogout: () => void;
}

const JuryDashboard: React.FC<JuryDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const tabs = [
    { id: 'schedule', label: 'My Schedule', icon: Calendar },
    { id: 'evaluations', label: 'Evaluations', icon: FileText },
    { id: 'history', label: 'History', icon: Clock }
  ];

  const mockSessions = [
    {
      id: 1,
      title: 'Final Portfolio Review',
      date: '2025-01-20',
      time: '09:00',
      duration: '3 hours',
      location: 'Design Studio A',
      coordinator: 'Dr. Michael Chen',
      students: 12,
      status: 'upcoming',
      rubric: {
        title: 'Portfolio Assessment',
        criteria: [
          { name: 'Creative Thinking', maxPoints: 4 },
          { name: 'Technical Skills', maxPoints: 4 },
          { name: 'Presentation Quality', maxPoints: 4 },
          { name: 'Process Documentation', maxPoints: 4 }
        ]
      }
    },
    {
      id: 2,
      title: 'Design Process Review',
      date: '2025-01-18',
      time: '10:00',
      duration: '4 hours',
      location: 'Design Studio C',
      coordinator: 'Dr. Michael Chen',
      students: 15,
      status: 'active',
      progress: { completed: 8, total: 15 },
      rubric: {
        title: 'Design Process',
        criteria: [
          { name: 'Research & Analysis', maxPoints: 4 },
          { name: 'Ideation Process', maxPoints: 4 },
          { name: 'Design Development', maxPoints: 4 },
          { name: 'Final Solution', maxPoints: 4 }
        ]
      }
    }
  ];

  const renderSchedule = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Jury Schedule</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-xl border shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    session.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    session.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {session.status === 'upcoming' ? 'Upcoming' : session.status === 'active' ? 'Active Now' : 'Completed'}
                  </span>
                </div>
                {session.status === 'active' && (
                  <button
                    onClick={() => setSelectedSession(session)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                  >
                    <Play className="h-3 w-3" />
                    <span className="text-sm">Join Session</span>
                  </button>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{session.date} at {session.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{session.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{session.students} students to evaluate</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm">
                  <span className="text-gray-500">Coordinator:</span>
                  <span className="ml-1 font-medium">{session.coordinator}</span>
                </div>
                <div className="text-sm mt-1">
                  <span className="text-gray-500">Rubric:</span>
                  <span className="ml-1 font-medium">{session.rubric.title}</span>
                </div>
              </div>

              {session.progress && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">My Progress</span>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (selectedSession) {
    return (
      <EvaluationInterface 
        session={selectedSession} 
        user={user}
        onExit={() => setSelectedSession(null)}
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 rounded-lg p-2">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Jury Member Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-xl shadow-sm border p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'schedule' && renderSchedule()}
            {activeTab === 'evaluations' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">My Evaluations</h2>
                <p className="text-gray-600">View and manage your evaluation progress.</p>
              </div>
            )}
            {activeTab === 'history' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Evaluation History</h2>
                <p className="text-gray-600">Review your past evaluation sessions and feedback.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JuryDashboard;