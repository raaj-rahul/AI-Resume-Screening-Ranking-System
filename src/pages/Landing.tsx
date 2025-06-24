import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Users, 
  FileText, 
  Clock, 
  Calendar,
  Shield,
  PieChart,
  Award,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CollegeLMS: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    setIsVisible(true);
    // Check if user is already logged in (check session/token)
    const savedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  const showAlertMessage = (message, type = 'info') => {
    setShowAlert({ show: true, message, type });
    setTimeout(() => setShowAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleLoginRedirect = () => {
    // Navigate to dedicated login page
    window.location.href = '/login';
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
    showAlertMessage('Logged out successfully', 'success');
  };

  const handleStartQuiz = (quizName) => {
    if (!currentUser) {
      handleLoginRedirect();
      showAlertMessage('Please log in to access quizzes', 'info');
    } else if (currentUser.type === 'student') {
      showAlertMessage(`Starting ${quizName}...`, 'success');
      // In real app, navigate to quiz page
    } else {
      showAlertMessage('Quiz access is for students only', 'error');
    }
  };

  const quickLinks = [
    {
      title: "Active Quizzes",
      icon: FileText,
      count: "12",
      description: "Pending assessments across all courses"
    },
    {
      title: "Course Modules",
      icon: BookOpen,
      count: "8", 
      description: "Interactive learning modules"
    },
    {
      title: "Assignment Center",
      icon: PieChart,
      count: "25",
      description: "Submissions and grades"
    },
    {
      title: "Study Groups",
      icon: Users,
      count: "6",
      description: "Collaborative learning spaces"
    }
  ];

  const announcements = [
    {
      title: "Mid-term Assessment Period",
      date: "June 24, 2025",
      content: "Mid-term quizzes for all courses will be available from June 26-30. Check your course schedules for specific timing."
    },
    {
      title: "System Maintenance Notice", 
      date: "June 22, 2025",
      content: "The LMS will undergo routine maintenance on Sunday, June 29 from 2:00 AM - 4:00 AM EST."
    },
    {
      title: "New Quiz Features Available",
      date: "June 20, 2025",
      content: "Enhanced quiz interface with improved accessibility features and mobile optimization now live."
    }
  ];

  const upcomingQuizzes = [
    {
      course: "Introduction to Psychology",
      quiz: "Chapter 8: Learning & Memory",
      due: "June 26, 11:59 PM",
      duration: "45 minutes",
      attempts: "2 remaining"
    },
    {
      course: "Calculus I", 
      quiz: "Derivatives and Applications",
      due: "June 27, 2:00 PM",
      duration: "60 minutes",
      attempts: "1 remaining"
    },
    {
      course: "English Literature",
      quiz: "Victorian Poetry Analysis", 
      due: "June 28, 5:00 PM",
      duration: "30 minutes",
      attempts: "3 remaining"
    }
  ];

  // Alert Component
  const Alert = () => (
    showAlert.show && (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
        showAlert.type === 'success' ? 'bg-green-100 text-green-800' :
        showAlert.type === 'error' ? 'bg-red-100 text-red-800' :
        'bg-blue-100 text-blue-800'
      }`}>
        {showAlert.type === 'success' && <CheckCircle className="w-5 h-5" />}
        {showAlert.type === 'error' && <AlertCircle className="w-5 h-5" />}
        <span>{showAlert.message}</span>
      </div>
    )
  );

  // Student Dashboard
  const StudentDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}!</h1>
          <p className="text-blue-200">Student ID: {currentUser.id}</p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingQuizzes.map((quiz, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-900 mb-2">{quiz.quiz}</h3>
              <p className="text-blue-600 mb-4">{quiz.course}</p>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {quiz.duration}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Due: {quiz.due}
                </div>
              </div>
              <button 
                onClick={() => handleStartQuiz(quiz.quiz)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Admin Dashboard
  const AdminDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-purple-200">Welcome, {currentUser.name} - {currentUser.role}</p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-purple-600">12,500</p>
              </div>
              <Users className="w-10 h-10 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Active Quizzes</p>
                <p className="text-2xl font-bold text-pink-600">847</p>
              </div>
              <FileText className="w-10 h-10 text-pink-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Courses</p>
                <p className="text-2xl font-bold text-indigo-600">156</p>
              </div>
              <BookOpen className="w-10 h-10 text-indigo-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Faculty</p>
                <p className="text-2xl font-bold text-teal-600">450</p>
              </div>
              <Award className="w-10 h-10 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">System Management</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 text-left transition-colors">
              <FileText className="w-6 h-6 text-purple-600 mb-2" />
              <h4 className="font-semibold">Manage Quizzes</h4>
              <p className="text-sm text-gray-600">Create and edit assessments</p>
            </button>
            <button className="p-4 border border-pink-200 rounded-lg hover:bg-pink-50 text-left transition-colors">
              <Users className="w-6 h-6 text-pink-600 mb-2" />
              <h4 className="font-semibold">User Management</h4>
              <p className="text-sm text-gray-600">Manage student and faculty accounts</p>
            </button>
            <button className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 text-left transition-colors">
              <PieChart className="w-6 h-6 text-indigo-600 mb-2" />
              <h4 className="font-semibold">Analytics</h4>
              <p className="text-sm text-gray-600">View performance reports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  if (currentPage === 'student' && currentUser?.type === 'student') {
    return (
      <>
        <Alert />
        <nav className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <GraduationCap className="w-6 h-6" />
              <span className="font-semibold">Riverside University</span>
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </nav>
        <StudentDashboard />
      </>
    );
  }

  if (currentPage === 'admin' && currentUser?.type === 'admin') {
    return (
      <>
        <Alert />
        <nav className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-800"
            >
              <GraduationCap className="w-6 h-6" />
              <span className="font-semibold">Riverside University - Admin</span>
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </nav>
        <AdminDashboard />
      </>
    );
  }

  // Main homepage
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Alert />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-green-800 to-teal-800 text-white border-b-4 border-orange-400">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-green-800" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Riverside University</h1>
                <p className="text-green-200 text-sm">Learning Management System - Quiz Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <span className="text-green-200">Welcome, {currentUser.name}</span>
                  <button 
                    onClick={() => setCurrentPage(currentUser.type)}
                    className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="bg-white text-green-800 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleLoginRedirect}
                  className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* University Info Banner */}
      <section className="bg-gradient-to-r from-green-700 to-teal-700 text-white py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl font-bold mb-4">
              Welcome to Riverside University
              <span className="block text-green-200 text-2xl mt-2">Excellence in Education Since 1887</span>
            </h2>
            
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Access your course quizzes, track your academic progress, and engage with interactive learning materials 
              through our comprehensive learning management system.
            </p>

            {/* Campus Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">12,500</div>
                <div className="text-green-200 text-sm">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">450</div>
                <div className="text-green-200 text-sm">Faculty Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">85</div>
                <div className="text-green-200 text-sm">Degree Programs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-green-200 text-sm">Graduate Success</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Dashboard */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Student Portal Dashboard</h3>
            <p className="text-lg text-gray-600">Quick access to your academic resources and assessments</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {quickLinks.map((link, i) => (
              <div key={i} className="bg-gradient-to-br from-orange-100 to-red-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-orange-500 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-red-200 rounded-xl flex items-center justify-center">
                    <link.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-2xl font-bold text-orange-600">{link.count}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{link.title}</h4>
                <p className="text-gray-600 text-sm">{link.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Quizzes Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upcoming Quizzes */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Quizzes</h3>
              <div className="space-y-4">
                {upcomingQuizzes.map((quiz, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-orange-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{quiz.quiz}</h4>
                        <p className="text-orange-600 font-medium mb-2">{quiz.course}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {quiz.duration}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Due: {quiz.due}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {quiz.attempts}
                        </span>
                        <button 
                          onClick={() => handleStartQuiz(quiz.quiz)}
                          className="block mt-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-sm font-medium"
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Campus Announcements</h3>
              <div className="space-y-4">
                {announcements.map((announcement, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-orange-200 hover:shadow-md transition-all duration-300">
                    <h4 className="font-bold text-gray-900 mb-2">{announcement.title}</h4>
                    <p className="text-orange-600 text-sm mb-3">{announcement.date}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Information */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">About Riverside University</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 1887, Riverside University has been a cornerstone of higher education for over 135 years. 
                Our commitment to academic excellence, research innovation, and student success has made us one of 
                the region's most respected institutions.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                With state-of-the-art facilities, world-class faculty, and a vibrant campus community, 
                we provide students with the tools and opportunities they need to succeed in an ever-changing world.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 text-teal-600 mr-3" />
                  <span>1887 University Drive, Riverside, CA 92521</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 text-teal-600 mr-3" />
                  <span>(951) 827-1012</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 text-teal-600 mr-3" />
                  <span>info@riverside.edu</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-teal-200">
              <div className="text-center mb-6">
                <Award className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900">Academic Excellence</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Student Satisfaction</span>
                  <span className="font-bold text-teal-600">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Faculty-Student Ratio</span>
                  <span className="font-bold text-teal-600">1:15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Class Size</span>
                  <span className="font-bold text-teal-600">22</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Career Placement Rate</span>
                  <span className="font-bold text-teal-600">89%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Support */}
      <section className="py-16 bg-gradient-to-br from-lime-50 to-emerald-50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <Shield className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Academic Support Services</h3>
          <p className="text-lg text-gray-600 mb-8">
            Our Learning Management System provides 24/7 access to course materials, quizzes, and academic resources.
            Technical support is available through the IT Help Desk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-semibold">
              IT Help Desk
            </button>
            <button className="bg-gradient-to-r from-lime-100 to-emerald-100 text-gray-900 px-8 py-3 rounded-lg border border-emerald-300 hover:from-lime-200 hover:to-emerald-200 transition-all duration-300 font-semibold">
              Tutorial Center
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-green-800 to-teal-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-green-800" />
                </div>
                <span className="font-bold text-lg">Riverside University</span>
              </div>
              <p className="text-green-200 text-sm leading-relaxed">
                Empowering minds, transforming futures through quality education and innovative learning experiences.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-green-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Academic Calendar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Course Catalog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Student Handbook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Library Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Student Services</h4>
              <ul className="space-y-2 text-green-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Registrar Office</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Financial Aid</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Counseling Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact Info</h4>
              <div className="space-y-2 text-green-200 text-sm">
                <p>1887 University Drive</p>
                <p>Riverside, CA 92521</p>
                <p>Phone: (951) 827-1012</p>
                <p>Email: info@riverside.edu</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-green-700 text-center text-green-200 text-sm">
            <p>© 2025 Riverside University. All rights reserved. | Privacy Policy | Terms of Use | Accessibility</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CollegeLMS;