import React, { useState } from 'react';
import { 
  Calendar, 
  QrCode, 
  Trophy, 
  Bell, 
  LogOut, 
  BookOpen, 
  Clock,
  MapPin,
  Users,
  FileText,
  Star,
  TrendingUp,
  Eye,
  Download
} from 'lucide-react';

interface StudentDashboardProps {
  user: any;
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [showQRScanner, setShowQRScanner] = useState(false);

  const tabs = [
    { id: 'schedule', label: 'My Schedule', icon: Calendar },
    { id: 'results', label: 'Results', icon: Trophy },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const mockSessions = [
    {
      id: 1,
      title: 'Final Portfolio Review',
      date: '2025-01-20',
      time: '09:00',
      duration: '30 min',
      location: 'Design Studio A',
      coordinator: 'Dr. Michael Chen',
      status: 'upcoming',
      timeSlot: '09:30 - 10:00'
    },
    {
      id: 2,
      title: 'Mid-term Presentation',
      date: '2025-01-22',
      time: '14:00',
      duration: '20 min',
      location: 'Conference Room B',
      coordinator: 'Prof. Sarah Williams',
      status: 'upcoming',
      timeSlot: '14:20 - 14:40'
    }
  ];

  const mockResults = [
    {
      id: 1,
      title: 'Design Process Review',
      date: '2025-01-15',
      coordinator: 'Dr. Michael Chen',
      totalScore: 14,
      maxScore: 16,
      percentage: 87.5,
      criteria: [
        { name: 'Research & Analysis', score: 4, maxScore: 4, feedback: 'Excellent research methodology and thorough analysis' },
        { name: 'Ideation Process', score: 3, maxScore: 4, feedback: 'Good creative exploration, could benefit from more iterations' },
        { name: 'Design Development', score: 4, maxScore: 4, feedback: 'Outstanding development of design concepts' },
        { name: 'Final Solution', score: 3, maxScore: 4, feedback: 'Strong final solution with minor refinements needed' }
      ],
      overallFeedback: 'Demonstrates strong design thinking and excellent technical execution. The research phase was particularly thorough and well-documented. Consider exploring more diverse ideation techniques for future projects.',
      juryMembers: ['Prof. Emma Wilson', 'Dr. James Rodriguez']
    },
    {
      id: 2,
      title: 'Concept Development',
      date: '2025-01-10',
      coordinator: 'Prof. Sarah Williams',
      totalScore: 12,
      maxScore: 16,
      percentage: 75,
      criteria: [
        { name: 'Creative Thinking', score: 3, maxScore: 4, feedback: 'Good creative approach with some innovative elements' },
        { name: 'Technical Skills', score: 3, maxScore: 4, feedback: 'Solid technical execution' },
        { name: 'Presentation', score: 3, maxScore: 4, feedback: 'Clear presentation with good visual communication' },
        { name: 'Process Documentation', score: 3, maxScore: 4, feedback: 'Well-documented process with clear stages' }
      ],
      overallFeedback: 'Solid work overall with consistent performance across all criteria. Focus on pushing creative boundaries further in future projects.',
      juryMembers: ['Prof. Emma Wilson', 'Dr. Lisa Park']
    }
  ];

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Jury Schedule</h2>
        <button
          onClick={() => setShowQRScanner(true)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
        >
          <QrCode className="h-4 w-4" />
          <span>Scan QR Code</span>
        </button>
      </div>

      {/* Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-xl border shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Upcoming
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{session.timeSlot}</p>
                  <p className="text-xs text-gray-500">Your slot</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{session.time} ({session.duration} presentation)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{session.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Coordinator: {session.coordinator}</span>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800">
                  <strong>Remember:</strong> Scan the QR code at the venue to verify your attendance before joining the session.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan QR Code</h3>
            <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
              <QrCode className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600">
                Point your camera at the QR code displayed in the jury room to verify your attendance.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowQRScanner(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700">
                Scan Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderResults = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Evaluation Results</h2>
        <div className="flex items-center space-x-3">
          <div className="bg-white border rounded-lg px-4 py-2">
            <div className="text-center">
              <p className="text-sm text-gray-600">Overall Average</p>
              <p className="text-2xl font-bold text-green-600">81%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Cards */}
      <div className="space-y-6">
        {mockResults.map((result) => (
          <div key={result.id} className="bg-white rounded-xl border shadow-sm">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{result.title}</h3>
                  <p className="text-sm text-gray-600">Evaluated on {result.date} by {result.coordinator}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    result.percentage >= 90 ? 'text-green-600' :
                    result.percentage >= 80 ? 'text-blue-600' :
                    result.percentage >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {result.percentage}%
                  </div>
                  <p className="text-sm text-gray-600">{result.totalScore}/{result.maxScore} points</p>
                </div>
              </div>

              {/* Criteria Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {result.criteria.map((criteria) => (
                  <div key={criteria.name} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{criteria.name}</h4>
                      <div className="flex items-center space-x-1">
                        {[...Array(criteria.maxScore)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < criteria.score ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{criteria.feedback}</p>
                  </div>
                ))}
              </div>

              {/* Overall Feedback */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Overall Feedback</h4>
                <p className="text-sm text-gray-700">{result.overallFeedback}</p>
              </div>

              {/* Jury Members */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <span>Evaluated by: </span>
                  <span className="font-medium">{result.juryMembers.join(', ')}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">View Details</span>
                  </button>
                  <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Download Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Trends */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Improvement</p>
              <p className="text-lg font-bold text-green-600">+12%</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">Best Category</p>
              <p className="text-lg font-bold text-blue-600">Research</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-sm text-gray-600">Evaluations</p>
              <p className="text-lg font-bold text-orange-600">2</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600">Rank</p>
              <p className="text-lg font-bold text-purple-600">Top 25%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
      
      <div className="space-y-4">
        {[
          {
            id: 1,
            type: 'evaluation',
            title: 'New Evaluation Results Available',
            message: 'Your Design Process Review evaluation results are now available.',
            time: '2 hours ago',
            read: false
          },
          {
            id: 2,
            type: 'reminder',
            title: 'Upcoming Jury Session',
            message: 'Reminder: Final Portfolio Review is scheduled for tomorrow at 9:00 AM.',
            time: '1 day ago',
            read: false
          },
          {
            id: 3,
            type: 'invitation',
            title: 'Session Invitation',
            message: 'You have been invited to participate in Mid-term Presentations.',
            time: '3 days ago',
            read: true
          }
        ].map((notification) => (
          <div key={notification.id} className={`bg-white rounded-xl border p-4 ${
            !notification.read ? 'border-l-4 border-l-orange-500' : ''
          }`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{notification.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-600 rounded-lg p-2">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
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
                        ? 'bg-orange-100 text-orange-700'
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
            {activeTab === 'results' && renderResults()}
            {activeTab === 'notifications' && renderNotifications()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;