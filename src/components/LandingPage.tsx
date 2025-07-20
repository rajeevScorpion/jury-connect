import React from 'react';
import { Users, UserCheck, Gavel, GraduationCap, BookOpen } from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: 'admin' | 'coordinator' | 'jury' | 'student') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onRoleSelect }) => {
  const roles = [
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage system users, create evaluation rubrics, oversee jury sessions and system configuration.',
      icon: Users,
      color: 'bg-purple-600 hover:bg-purple-700',
      borderColor: 'border-purple-200',
      features: ['User Management', 'Rubric Creation', 'System Overview', 'Session Control']
    },
    {
      id: 'coordinator',
      title: 'Coordinator',
      description: 'Schedule jury sessions, manage student participation, and monitor evaluation progress.',
      icon: UserCheck,
      color: 'bg-blue-600 hover:bg-blue-700',
      borderColor: 'border-blue-200',
      features: ['Session Scheduling', 'Student Management', 'Email Invitations', 'Progress Monitoring']
    },
    {
      id: 'jury',
      title: 'Jury Member',
      description: 'Participate in evaluation sessions, score student work using structured rubrics, and provide feedback.',
      icon: Gavel,
      color: 'bg-green-600 hover:bg-green-700',
      borderColor: 'border-green-200',
      features: ['Evaluation Interface', 'Rubric Scoring', 'Audio Feedback', 'Session Participation']
    },
    {
      id: 'student',
      title: 'Student',
      description: 'Join scheduled jury sessions, view evaluation results, and track academic progress.',
      icon: GraduationCap,
      color: 'bg-orange-600 hover:bg-orange-700',
      borderColor: 'border-orange-200',
      features: ['Schedule Viewing', 'QR Code Entry', 'Results Access', 'Progress Tracking']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 rounded-lg p-2">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">EduJury</h1>
              <p className="text-gray-600">Design Education Evaluation Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Streamline Your Design Education Evaluations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive platform connecting administrators, coordinators, jury members, and students 
            through seamless digital workflows for design education assessments.
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                className={`bg-white rounded-xl border-2 ${role.borderColor} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`${role.color} rounded-lg p-3 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                    {role.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {role.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onRoleSelect(role.id as any)}
                    className={`w-full ${role.color} text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  >
                    Enter as {role.title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Overview */}
        <div className="mt-20 bg-white rounded-2xl shadow-sm border p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Platform Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Role-Based Access</h4>
              <p className="text-gray-600 text-sm">Tailored dashboards and permissions for each user type</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Gavel className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Evaluation</h4>
              <p className="text-gray-600 text-sm">Google Classroom-style rubrics with AI-powered feedback</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Session Management</h4>
              <p className="text-gray-600 text-sm">Complete jury session lifecycle from scheduling to results</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            © 2025 EduJury Platform. Designed for modern design education assessment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;