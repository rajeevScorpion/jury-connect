import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Mic, 
  MicOff, 
  Send, 
  LogOut, 
  BookOpen,
  User,
  FileText,
  Clock
} from 'lucide-react';

interface EvaluationInterfaceProps {
  session: any;
  user: any;
  onExit: () => void;
  onLogout: () => void;
}

const EvaluationInterface: React.FC<EvaluationInterfaceProps> = ({ session, user, onExit, onLogout }) => {
  const [currentStudent, setCurrentStudent] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [feedback, setFeedback] = useState('');
  const [audioFeedback, setAudioFeedback] = useState('');

  const mockStudents = [
    { id: 1, name: 'Alex Thompson', program: 'Industrial Design', projectTitle: 'Sustainable Water Bottle Design' },
    { id: 2, name: 'Maria Garcia', program: 'UX Design', projectTitle: 'Mobile Banking App Redesign' },
    { id: 3, name: 'John Chen', program: 'Graphic Design', projectTitle: 'Brand Identity for Local Cafe' },
    { id: 4, name: 'Sarah Kim', program: 'Architecture', projectTitle: 'Modular Housing Concept' }
  ];

  const rubric = {
    title: 'Portfolio Assessment',
    criteria: [
      {
        name: 'Creative Thinking',
        description: 'Originality and innovation in design approach',
        levels: [
          { name: 'Excellent', points: 4, description: 'Demonstrates exceptional creativity and original thinking' },
          { name: 'Good', points: 3, description: 'Shows good creative problem-solving abilities' },
          { name: 'Satisfactory', points: 2, description: 'Adequate creative approach with some originality' },
          { name: 'Needs Improvement', points: 1, description: 'Limited creativity, relies heavily on existing solutions' }
        ]
      },
      {
        name: 'Technical Skills',
        description: 'Proficiency in design tools and techniques',
        levels: [
          { name: 'Excellent', points: 4, description: 'Masterful use of tools and advanced techniques' },
          { name: 'Good', points: 3, description: 'Proficient use of design tools and methods' },
          { name: 'Satisfactory', points: 2, description: 'Basic competency in required tools' },
          { name: 'Needs Improvement', points: 1, description: 'Limited technical skills, needs development' }
        ]
      },
      {
        name: 'Presentation Quality',
        description: 'Clarity and effectiveness of project presentation',
        levels: [
          { name: 'Excellent', points: 4, description: 'Outstanding presentation with clear communication' },
          { name: 'Good', points: 3, description: 'Well-organized presentation with good clarity' },
          { name: 'Satisfactory', points: 2, description: 'Adequate presentation with some unclear areas' },
          { name: 'Needs Improvement', points: 1, description: 'Poor presentation quality, unclear communication' }
        ]
      },
      {
        name: 'Process Documentation',
        description: 'Quality of design process documentation',
        levels: [
          { name: 'Excellent', points: 4, description: 'Comprehensive documentation of entire design process' },
          { name: 'Good', points: 3, description: 'Good documentation with clear process steps' },
          { name: 'Satisfactory', points: 2, description: 'Basic documentation covering main process points' },
          { name: 'Needs Improvement', points: 1, description: 'Incomplete or unclear process documentation' }
        ]
      }
    ]
  };

  const handleScoreChange = (criteriaName: string, points: number) => {
    setScores({ ...scores, [criteriaName]: points });
  };

  const getTotalScore = () => {
    return Object.values(scores).reduce((sum, score) => sum + score, 0);
  };

  const getMaxScore = () => {
    return rubric.criteria.length * 4;
  };

  const handlePrevious = () => {
    if (currentStudent > 0) {
      setCurrentStudent(currentStudent - 1);
      // Reset for new student
      setScores({});
      setFeedback('');
      setAudioFeedback('');
    }
  };

  const handleNext = () => {
    if (currentStudent < mockStudents.length - 1) {
      setCurrentStudent(currentStudent + 1);
      // Reset for new student
      setScores({});
      setFeedback('');
      setAudioFeedback('');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording
      setAudioFeedback('Recording started...');
    } else {
      // Stop recording and simulate transcription
      setAudioFeedback('Great work on the creative approach. The technical execution shows strong proficiency. Consider exploring more sustainable materials for future iterations.');
    }
  };

  const student = mockStudents[currentStudent];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={onExit}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="bg-green-600 rounded-lg p-2">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{session.title}</h1>
                <p className="text-sm text-gray-600">Evaluation Session</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Student {currentStudent + 1} of {mockStudents.length}
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-orange-100 rounded-full p-2">
                  <User className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Current Student</h3>
                  <p className="text-sm text-gray-600">Evaluation in progress</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Student Name</p>
                  <p className="font-medium text-gray-900">{student.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Program</p>
                  <p className="font-medium text-gray-900">{student.program}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Project Title</p>
                  <p className="font-medium text-gray-900">{student.projectTitle}</p>
                </div>
              </div>

              {/* Score Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Total Score</span>
                  <span className="text-lg font-bold text-gray-900">
                    {getTotalScore()}/{getMaxScore()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(getTotalScore() / getMaxScore()) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-xs text-gray-500 mt-1">
                  {Math.round((getTotalScore() / getMaxScore()) * 100)}%
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6 pt-4 border-t">
                <button
                  onClick={handlePrevious}
                  disabled={currentStudent === 0}
                  className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStudent === mockStudents.length - 1}
                  className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Evaluation Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rubric */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{rubric.title}</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {rubric.criteria.map((criteria) => (
                  <div key={criteria.name} className="border rounded-lg p-4">
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-1">{criteria.name}</h4>
                      <p className="text-sm text-gray-600">{criteria.description}</p>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {criteria.levels.map((level) => (
                        <div
                          key={level.name}
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${
                            scores[criteria.name] === level.points
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleScoreChange(criteria.name, level.points)}
                        >
                          <div className="text-center mb-2">
                            <div className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                              level.points === 4 ? 'bg-green-100 text-green-800' :
                              level.points === 3 ? 'bg-blue-100 text-blue-800' :
                              level.points === 2 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {level.name}
                            </div>
                          </div>
                          <div className="text-center text-lg font-bold text-gray-900 mb-1">
                            {level.points}
                          </div>
                          <p className="text-xs text-gray-600 text-center leading-tight">
                            {level.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Feedback & Comments</h3>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Text Feedback */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Written Feedback</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 resize-none"
                    rows={4}
                    placeholder="Provide detailed feedback on the student's work..."
                  />
                </div>

                {/* Audio Feedback */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Audio Feedback</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={toggleRecording}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                        isRecording 
                          ? 'bg-red-50 border-red-200 text-red-700' 
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                    </button>
                    {isRecording && (
                      <div className="flex items-center space-x-2 text-red-600">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                        <span className="text-sm">Recording...</span>
                      </div>
                    )}
                  </div>
                  {audioFeedback && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{audioFeedback}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Save className="h-4 w-4" />
                    <span>Save Draft</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <Send className="h-4 w-4" />
                    <span>Submit Evaluation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationInterface;