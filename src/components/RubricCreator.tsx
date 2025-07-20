import React, { useState } from 'react';
import { useRubrics } from '../hooks/useRubrics';
import { Plus, Upload, Save, Eye, Edit, Trash2, FileText } from 'lucide-react';

const RubricCreator: React.FC = () => {
  const [showRubricModal, setShowRubricModal] = useState(false);
  const { rubrics, createRubric, loading } = useRubrics();
  const [rubricData, setRubricData] = useState({
    title: '',
    description: '',
    criteria: [
      {
        name: '',
        description: '',
        levels: [
          { name: 'Excellent', points: 4, description: '' },
          { name: 'Good', points: 3, description: '' },
          { name: 'Satisfactory', points: 2, description: '' },
          { name: 'Needs Improvement', points: 1, description: '' }
        ]
      }
    ]
  });

  const handleCreateRubric = async () => {
    const { error } = await createRubric(rubricData);
    if (!error) {
      setShowRubricModal(false);
      setRubricData({
        title: '',
        description: '',
        criteria: [
          {
            name: '',
            description: '',
            levels: [
              { name: 'Excellent', points: 4, description: '' },
              { name: 'Good', points: 3, description: '' },
              { name: 'Satisfactory', points: 2, description: '' },
              { name: 'Needs Improvement', points: 1, description: '' }
            ]
          }
        ]
      });
    }
  };

  const addCriteria = () => {
    setRubricData({
      ...rubricData,
      criteria: [
        ...rubricData.criteria,
        {
          name: '',
          description: '',
          levels: [
            { name: 'Excellent', points: 4, description: '' },
            { name: 'Good', points: 3, description: '' },
            { name: 'Satisfactory', points: 2, description: '' },
            { name: 'Needs Improvement', points: 1, description: '' }
          ]
        }
      ]
    });
  };

  const updateCriteria = (index: number, field: string, value: string) => {
    const newCriteria = [...rubricData.criteria];
    newCriteria[index] = { ...newCriteria[index], [field]: value };
    setRubricData({ ...rubricData, criteria: newCriteria });
  };

  const updateLevel = (criteriaIndex: number, levelIndex: number, field: string, value: string | number) => {
    const newCriteria = [...rubricData.criteria];
    newCriteria[criteriaIndex].levels[levelIndex] = {
      ...newCriteria[criteriaIndex].levels[levelIndex],
      [field]: value
    };
    setRubricData({ ...rubricData, criteria: newCriteria });
  };

  const removeCriteria = (index: number) => {
    const newCriteria = rubricData.criteria.filter((_, i) => i !== index);
    setRubricData({ ...rubricData, criteria: newCriteria });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Evaluation Rubrics</h2>
          <p className="text-gray-600">Create and manage assessment rubrics for jury evaluations</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            <Upload className="h-4 w-4" />
            <span>Import Rubric</span>
          </button>
          <button
            onClick={() => setShowRubricModal(true)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <Plus className="h-4 w-4" />
            <span>Create Rubric</span>
          </button>
        </div>
      </div>

      {/* Existing Rubrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">Loading rubrics...</p>
          </div>
        ) : rubrics.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">No rubrics created yet. Create your first rubric to get started.</p>
          </div>
        ) : (
          rubrics.map((rubric) => (
          <div key={rubric.id} className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{rubric.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{rubric.description}</p>
                </div>
                <FileText className="h-5 w-5 text-gray-400 ml-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Criteria:</span>
                  <span className="ml-1 font-medium">{rubric.criteria?.length || 0}</span>
                </div>
                <div>
                  <span className="text-gray-500">Max Points:</span>
                  <span className="ml-1 font-medium">{(rubric.criteria?.length || 0) * 4}</span>
                </div>
                <div>
                  <span className="text-gray-500">Created:</span>
                  <span className="ml-1 font-medium">{new Date(rubric.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Used:</span>
                  <span className="ml-1 font-medium">{rubric.usageCount} times</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">Preview</span>
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
          ))
        )}
      </div>

      {/* Create Rubric Modal */}
      {showRubricModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Create New Rubric</h3>
                <button
                  onClick={() => setShowRubricModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  onClick={handleCreateRubric}
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rubric Title</label>
                  <input
                    type="text"
                    value={rubricData.title}
                    onChange={(e) => setRubricData({ ...rubricData, title: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter rubric title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={rubricData.description}
                    onChange={(e) => setRubricData({ ...rubricData, description: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                    placeholder="Brief description"
                  />
                </div>
              </div>

              {/* Criteria */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-gray-900">Assessment Criteria</h4>
                  <button
                    onClick={addCriteria}
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Criteria</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {rubricData.criteria.map((criteria, criteriaIndex) => (
                    <div key={criteriaIndex} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Criteria Name
                            </label>
                            <input
                              type="text"
                              value={criteria.name}
                              onChange={(e) => updateCriteria(criteriaIndex, 'name', e.target.value)}
                              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                              placeholder="e.g., Creative Thinking"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <input
                              type="text"
                              value={criteria.description}
                              onChange={(e) => updateCriteria(criteriaIndex, 'description', e.target.value)}
                              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                              placeholder="Brief description of criteria"
                            />
                          </div>
                        </div>
                        {rubricData.criteria.length > 1 && (
                          <button
                            onClick={() => removeCriteria(criteriaIndex)}
                            className="ml-4 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Performance Levels */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {criteria.levels.map((level, levelIndex) => (
                          <div key={levelIndex} className="border rounded-lg p-3">
                            <div className="text-center mb-3">
                              <div className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                                levelIndex === 0 ? 'bg-green-100 text-green-800' :
                                levelIndex === 1 ? 'bg-blue-100 text-blue-800' :
                                levelIndex === 2 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {level.name}
                              </div>
                            </div>
                            <div className="text-center mb-2">
                              <input
                                type="number"
                                value={level.points}
                                onChange={(e) => updateLevel(criteriaIndex, levelIndex, 'points', parseInt(e.target.value))}
                                className="w-16 text-center border rounded px-2 py-1 text-sm font-bold"
                                min="0"
                                max="10"
                              />
                              <span className="text-xs text-gray-500 block">points</span>
                            </div>
                            <textarea
                              value={level.description}
                              onChange={(e) => updateLevel(criteriaIndex, levelIndex, 'description', e.target.value)}
                              className="w-full border rounded px-2 py-1 text-xs resize-none focus:ring-1 focus:ring-purple-500"
                              rows={3}
                              placeholder="Describe this performance level..."
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-between">
              <button
                onClick={() => setShowRubricModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </button>
                <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  <Save className="h-4 w-4" />
                  <span>Save Rubric</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RubricCreator;