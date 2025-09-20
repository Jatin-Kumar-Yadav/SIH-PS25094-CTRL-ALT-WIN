// TeacherGuided Career Advisor - Desktop Application (app.js)
// Modern ES6 Vanilla JavaScript with Firebase Integration

// ==========================================
// MOCK DATA FOR OFFLINE/DEMO MODE
// ==========================================

const MOCK_STUDENTS = [
  {
    id: '1',
    name: 'Rahul Sharma',
    class: '10-A',
    age: 16,
    gender: 'male',
    notes: 'Shows strong interest in mathematics and physics',
    lastAssessed: '2024-09-17T10:30:00Z'
  },
  {
    id: '2',
    name: 'Priya Patel',
    class: '11-B',
    age: 17,
    gender: 'female',
    notes: 'Excellent communication skills, interested in literature',
    lastAssessed: '2024-09-12T14:15:00Z'
  },
  {
    id: '3',
    name: 'Arjun Singh',
    class: '12-C',
    age: 18,
    gender: 'male',
    notes: 'Leadership qualities, good at organizing events',
    lastAssessed: null
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    class: '10-B',
    age: 15,
    gender: 'female',
    notes: 'Creative thinker, loves art and design',
    lastAssessed: '2024-09-16T09:45:00Z'
  },
  {
    id: '5',
    name: 'Vikram Kumar',
    class: '11-A',
    age: 16,
    gender: 'male',
    notes: 'Analytical mindset, enjoys problem-solving',
    lastAssessed: '2024-09-14T11:20:00Z'
  },
  {
    id: '6',
    name: 'Kavya Reddy',
    class: '12-A',
    age: 17,
    gender: 'female',
    notes: 'Strong academic performance across all subjects',
    lastAssessed: '2024-09-18T16:00:00Z'
  }
];

const MOCK_COLLEGES = [
  {
    id: '1',
    name: 'IIT Delhi',
    address: 'New Delhi, Delhi',
    streams: ['Science', 'Engineering'],
    cutoff: '99.5%',
    facilities: ['Hostel', 'Library', 'Labs', 'Sports'],
    rating: 4.8
  },
  {
    id: '2',
    name: 'AIIMS New Delhi',
    address: 'New Delhi, Delhi',
    streams: ['Medical', 'Science'],
    cutoff: '99.8%',
    facilities: ['Hospital', 'Library', 'Research'],
    rating: 4.9
  },
  {
    id: '3',
    name: 'SRCC Delhi',
    address: 'New Delhi, Delhi',
    streams: ['Commerce', 'Economics'],
    cutoff: '98.5%',
    facilities: ['Library', 'Auditorium', 'Computer Lab'],
    rating: 4.7
  },
  {
    id: '4',
    name: 'Hindu College',
    address: 'New Delhi, Delhi',
    streams: ['Arts', 'Sciences'],
    cutoff: '96.0%',
    facilities: ['Library', 'Sports', 'Cultural'],
    rating: 4.5
  },
  {
    id: '5',
    name: 'NIT Trichy',
    address: 'Tiruchirappalli, Tamil Nadu',
    streams: ['Engineering', 'Architecture'],
    cutoff: '97.5%',
    facilities: ['Hostel', 'Labs', 'Placement Cell'],
    rating: 4.6
  },
  {
    id: '6',
    name: 'Jamia Millia Islamia',
    address: 'New Delhi, Delhi',
    streams: ['Arts', 'Sciences', 'Engineering'],
    cutoff: '94.0%',
    facilities: ['Library', 'Hostel', 'Sports'],
    rating: 4.4
  }
];

const CAREER_MAP = {
  science: [
    {
      title: 'Engineering',
      degrees: 'B.Tech, B.E.',
      careers: 'Software Engineer, Mechanical Engineer',
      exams: 'JEE Main, JEE Advanced',
      nextSteps: 'Focus on Physics, Chemistry, Math'
    },
    {
      title: 'Medical',
      degrees: 'MBBS, BDS',
      careers: 'Doctor, Dentist, Researcher',
      exams: 'NEET',
      nextSteps: 'Strong Biology foundation'
    }
  ],
  commerce: [
    {
      title: 'Business & Finance',
      degrees: 'B.Com, BBA, CA',
      careers: 'Chartered Accountant, Financial Analyst',
      exams: 'CAT, CA Foundation',
      nextSteps: 'Mathematics and Economics focus'
    },
    {
      title: 'Management',
      degrees: 'BBA, MBA',
      careers: 'Business Manager, Entrepreneur',
      exams: 'CAT, XAT',
      nextSteps: 'Leadership skills development'
    }
  ],
  arts: [
    {
      title: 'Liberal Arts',
      degrees: 'BA, MA',
      careers: 'Journalist, Teacher, Civil Services',
      exams: 'UPSC, State PSC',
      nextSteps: 'Strong language and analytical skills'
    },
    {
      title: 'Creative Arts',
      degrees: 'BFA, Design',
      careers: 'Designer, Artist, Filmmaker',
      exams: 'NID, NIFT',
      nextSteps: 'Portfolio development'
    }
  ]
};

// ==========================================
// FIREBASE CONFIGURATION SETUP
// ==========================================

/*
TODO: FIREBASE SETUP INSTRUCTIONS

STEP 1: Replace the firebaseConfig object below with your actual Firebase configuration
Get your config from: Firebase Console > Project Settings > General > Your apps

Example config structure:
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

STEP 2: Set OFFLINE_MODE to false when Firebase is configured
STEP 3: Uncomment the Firebase imports and initialization code below
STEP 4: Create Firestore collections: users, students, assessments, colleges
*/

const firebaseConfig = {
  // TODO: Replace with your actual Firebase config
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Set to false when Firebase is properly configured
const OFFLINE_MODE = true;

let db, auth;

/*
TODO: ENABLE FIREBASE
Uncomment the code below when you have valid Firebase config:

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  enableNetwork, 
  disableNetwork,
  query,
  where,
  orderBy
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

const app = initializeApp(firebaseConfig);
db = getFirestore(app);
auth = getAuth(app);

// Enable offline persistence
try {
  await enableNetwork(db);
  console.log('Firestore online persistence enabled');
} catch (error) {
  console.warn('Firestore persistence failed:', error);
}
*/

// ==========================================
// APPLICATION STATE MANAGEMENT
// ==========================================

class AppState {
  constructor() {
    this.currentUser = null;
    this.students = [];
    this.colleges = [];
    this.selectedStudent = null;
    this.currentTab = 'dashboard';
    this.assessments = [];
    this.searchQuery = '';
    this.collegeFilter = { stream: '', sort: 'distance' };
  }

  setCurrentUser(user) {
    this.currentUser = user;
    this.updateAuthUI();
  }

  setStudents(students) {
    this.students = students;
    this.renderStudentsList();
    this.updateDashboard();
  }

  setColleges(colleges) {
    this.colleges = colleges;
    this.renderCollegeGrid();
  }

  selectStudent(studentId) {
    this.selectedStudent = this.students.find(s => s.id === studentId);
    this.updateStudentSelection();
    this.highlightSelectedStudent();
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    this.updateTabDisplay();
  }

  updateAuthUI() {
    const signInBtn = document.getElementById('teacher-signin-btn');
    const signOutBtn = document.getElementById('teacher-signout-btn');
    const authStatus = document.getElementById('auth-status');
    
    if (this.currentUser) {
      signInBtn.style.display = 'none';
      signOutBtn.style.display = 'block';
      authStatus.textContent = `Logged in as ${this.currentUser.email || 'Demo User'}`;
    } else {
      signInBtn.style.display = 'block';
      signOutBtn.style.display = 'none';
      authStatus.textContent = OFFLINE_MODE ? 'Demo Mode' : 'Not signed in';
    }
  }

  updateTabDisplay() {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Show current tab
    const currentTabElement = document.getElementById(`tab-${this.currentTab}`);
    if (currentTabElement) {
      currentTabElement.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    const activeNavLink = document.querySelector(`[data-tab="${this.currentTab}"]`);
    if (activeNavLink) {
      activeNavLink.classList.add('active');
    }
  }

  renderStudentsList() {
    const studentList = document.getElementById('student-list');
    if (!studentList) return;

    studentList.innerHTML = '';
    
    // Filter students based on search query
    const filteredStudents = this.students.filter(student => 
      student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    
    filteredStudents.forEach(student => {
      const li = document.createElement('li');
      li.className = 'student-item';
      li.setAttribute('data-student-id', student.id);
      li.setAttribute('role', 'option');
      li.setAttribute('tabindex', '0');
      
      const lastAssessed = student.lastAssessed 
        ? this.formatLastAssessed(student.lastAssessed)
        : 'Never assessed';
      
      li.innerHTML = `
        <div class="student-info">
          <h3>${student.name}</h3>
          <p>${student.class} • Age ${student.age}</p>
          <span class="last-assessed">Last assessed: ${lastAssessed}</span>
        </div>
      `;
      
      li.addEventListener('click', () => this.selectStudent(student.id));
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectStudent(student.id);
        }
      });
      
      studentList.appendChild(li);
    });

    if (filteredStudents.length === 0) {
      const noResults = document.createElement('li');
      noResults.className = 'no-results';
      noResults.innerHTML = '<div class="student-info"><p>No students found</p></div>';
      studentList.appendChild(noResults);
    }
  }

  renderCollegeGrid() {
    const collegeGrid = document.getElementById('college-grid');
    if (!collegeGrid) return;

    collegeGrid.innerHTML = '';
    
    // Apply filters
    let filteredColleges = [...this.colleges];
    
    if (this.collegeFilter.stream) {
      filteredColleges = filteredColleges.filter(college => 
        college.streams.some(stream => 
          stream.toLowerCase().includes(this.collegeFilter.stream.toLowerCase())
        )
      );
    }
    
    // Apply sorting
    switch (this.collegeFilter.sort) {
      case 'rating':
        filteredColleges.sort((a, b) => b.rating - a.rating);
        break;
      case 'cutoff':
        filteredColleges.sort((a, b) => 
          parseFloat(b.cutoff.replace('%', '')) - parseFloat(a.cutoff.replace('%', ''))
        );
        break;
      case 'distance':
      default:
        // Default order (mock distance-based)
        break;
    }
    
    filteredColleges.forEach(college => {
      const div = document.createElement('div');
      div.className = 'college-card';
      div.setAttribute('data-college-id', college.id);
      
      const facilitiesIcons = college.facilities.map(facility => {
        const icons = {
          'Hostel': '🏠',
          'Library': '📚',
          'Labs': '🔬',
          'Sports': '⚽',
          'Hospital': '🏥',
          'Research': '🔬',
          'Auditorium': '🎭',
          'Computer Lab': '💻',
          'Cultural': '🎭',
          'Placement Cell': '💼'
        };
        return `<span class="facility-icon" title="${facility}">${icons[facility] || '🏢'}</span>`;
      }).join('');
      
      div.innerHTML = `
        <h3>${college.name}</h3>
        <p class="college-location">${college.address}</p>
        <p class="courses-offered">${college.streams.join(', ')}</p>
        <div class="college-stats">
          <span class="cutoff">Cutoff: ${college.cutoff}</span>
          <span class="rating">Rating: ${college.rating}/5</span>
        </div>
        <div class="facilities">
          ${facilitiesIcons}
        </div>
        <button type="button" class="college-details-btn" data-college-id="${college.id}">View Details</button>
      `;
      
      // Add event listener for college details
      const detailsBtn = div.querySelector('.college-details-btn');
      detailsBtn.addEventListener('click', () => {
        this.showCollegeDetails(college.id);
      });
      
      collegeGrid.appendChild(div);
    });

    if (filteredColleges.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-colleges';
      noResults.innerHTML = '<p>No colleges match your criteria</p>';
      collegeGrid.appendChild(noResults);
    }
  }

  showCollegeDetails(collegeId) {
    const college = this.colleges.find(c => c.id === collegeId);
    if (college) {
      const details = `
        College: ${college.name}
        Location: ${college.address}
        Streams: ${college.streams.join(', ')}
        Rating: ${college.rating}/5
        Cutoff: ${college.cutoff}
        Facilities: ${college.facilities.join(', ')}
      `;
      alert(details); // In production, use a proper modal
    }
  }

  updateStudentSelection() {
    const studentDetail = document.querySelector('.student-selected');
    const noSelection = document.querySelector('.no-selection');
    
    if (this.selectedStudent) {
      if (noSelection) noSelection.style.display = 'none';
      if (studentDetail) {
        studentDetail.style.display = 'block';
        document.getElementById('selected-student-name').textContent = this.selectedStudent.name;
        document.getElementById('selected-student-class').textContent = this.selectedStudent.class;
        document.getElementById('selected-student-age').textContent = this.selectedStudent.age;
        document.getElementById('selected-student-last-assessed').textContent = 
          this.selectedStudent.lastAssessed ? this.formatLastAssessed(this.selectedStudent.lastAssessed) : 'Never assessed';
      }
    } else {
      if (noSelection) noSelection.style.display = 'block';
      if (studentDetail) studentDetail.style.display = 'none';
    }
  }

  highlightSelectedStudent() {
    document.querySelectorAll('.student-item').forEach(item => {
      item.classList.remove('selected');
    });
    
    if (this.selectedStudent) {
      const selectedElement = document.querySelector(`[data-student-id="${this.selectedStudent.id}"]`);
      if (selectedElement) {
        selectedElement.classList.add('selected');
      }
    }
  }

  updateDashboard() {
    // Update KPI values
    const totalAssessed = this.students.filter(s => s.lastAssessed).length;
    const needsCounseling = Math.floor(this.students.length * 0.15); // Mock calculation
    const avgScore = Math.floor(Math.random() * 20) + 70; // Mock score
    
    const totalAssessedElement = document.getElementById('total-assessed');
    const needsCounselElement = document.getElementById('needs-counsel');
    const avgScoreElement = document.getElementById('avg-score');
    
    if (totalAssessedElement) totalAssessedElement.textContent = totalAssessed;
    if (needsCounselElement) needsCounselElement.textContent = needsCounseling;
    if (avgScoreElement) avgScoreElement.textContent = `${avgScore}%`;
    
    // Update recent activity table
    this.updateRecentActivity();
  }

  updateRecentActivity() {
    const activityTable = document.getElementById('recent-activity-table');
    if (!activityTable) return;

    const recentStudents = this.students
      .filter(s => s.lastAssessed)
      .sort((a, b) => new Date(b.lastAssessed) - new Date(a.lastAssessed))
      .slice(0, 5);

    activityTable.innerHTML = '';
    
    recentStudents.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.name}</td>
        <td>Career Assessment</td>
        <td>${this.formatLastAssessed(student.lastAssessed)}</td>
        <td><span class="status-success">Completed</span></td>
      `;
      activityTable.appendChild(row);
    });

    if (recentStudents.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="4" style="text-align: center; color: #6b7280;">No recent assessments</td>';
      activityTable.appendChild(row);
    }
  }

  formatLastAssessed(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  }

  addStudent(studentData) {
    const newStudent = {
      ...studentData,
      id: Date.now().toString(),
      lastAssessed: null
    };
    this.students.push(newStudent);
    this.renderStudentsList();
    this.updateDashboard();
    return newStudent;
  }

  updateStudent(studentId, updatedData) {
    const index = this.students.findIndex(s => s.id === studentId);
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...updatedData };
      this.renderStudentsList();
      this.updateDashboard();
      if (this.selectedStudent && this.selectedStudent.id === studentId) {
        this.selectedStudent = this.students[index];
        this.updateStudentSelection();
      }
    }
  }
}

// ==========================================
// FIREBASE SERVICE LAYER
// ==========================================

class FirebaseService {
  static async signIn(email, password) {
    if (OFFLINE_MODE) {
      // Mock authentication for demo
      return { 
        email: email || 'demo@teacher.com', 
        uid: 'demo-uid',
        displayName: 'Demo Teacher'
      };
    }
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }

  static async signOut() {
    if (OFFLINE_MODE) {
      return;
    }
    
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(`Sign out failed: ${error.message}`);
    }
  }

  static async loadStudents(teacherId) {
    if (OFFLINE_MODE) {
      return [...MOCK_STUDENTS];
    }
    
    try {
      const q = query(
        collection(db, 'students'), 
        where('teacherId', '==', teacherId),
        orderBy('name')
      );
      const querySnapshot = await getDocs(q);
      const students = [];
      querySnapshot.forEach((doc) => {
        students.push({ id: doc.id, ...doc.data() });
      });
      return students;
    } catch (error) {
      console.error('Error loading students:', error);
      return [];
    }
  }

  static async loadColleges() {
    if (OFFLINE_MODE) {
      return [...MOCK_COLLEGES];
    }
    
    try {
      const q = query(collection(db, 'colleges'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const colleges = [];
      querySnapshot.forEach((doc) => {
        colleges.push({ id: doc.id, ...doc.data() });
      });
      return colleges;
    } catch (error) {
      console.error('Error loading colleges:', error);
      return [];
    }
  }

  static async addStudent(studentData) {
    if (OFFLINE_MODE) {
      const newStudent = {
        id: Date.now().toString(),
        ...studentData,
        lastAssessed: null,
        createdAt: new Date().toISOString()
      };
      return newStudent;
    }
    
    try {
      const docData = {
        ...studentData,
        teacherId: auth.currentUser?.uid,
        createdAt: new Date().toISOString(),
        lastAssessed: null
      };
      const docRef = await addDoc(collection(db, 'students'), docData);
      return { id: docRef.id, ...docData };
    } catch (error) {
      throw new Error(`Failed to add student: ${error.message}`);
    }
  }

  static async updateStudent(studentId, updatedData) {
    if (OFFLINE_MODE) {
      console.log('Student updated (demo mode):', { studentId, updatedData });
      return;
    }

    try {
      const studentRef = doc(db, 'students', studentId);
      await updateDoc(studentRef, {
        ...updatedData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      throw new Error(`Failed to update student: ${error.message}`);
    }
  }

  static async saveAssessment(studentId, responses, result) {
    if (OFFLINE_MODE) {
      console.log('Assessment saved (demo mode):', { studentId, responses, result });
      return { id: Date.now().toString(), studentId, responses, result };
    }
    
    try {
      const assessmentData = {
        studentId,
        responses,
        result,
        date: new Date().toISOString(),
        teacherId: auth.currentUser?.uid
      };
      
      const docRef = await addDoc(collection(db, 'assessments'), assessmentData);
      
      // Update student's lastAssessed field
      const studentRef = doc(db, 'students', studentId);
      await updateDoc(studentRef, {
        lastAssessed: new Date().toISOString()
      });

      return { id: docRef.id, ...assessmentData };
    } catch (error) {
      throw new Error(`Failed to save assessment: ${error.message}`);
    }
  }

  static async loadAssessments(studentId = null) {
    if (OFFLINE_MODE) {
      return []; // Return empty array for demo
    }

    try {
      let q;
      if (studentId) {
        q = query(
          collection(db, 'assessments'),
          where('studentId', '==', studentId),
          orderBy('date', 'desc')
        );
      } else {
        q = query(
          collection(db, 'assessments'),
          where('teacherId', '==', auth.currentUser?.uid),
          orderBy('date', 'desc')
        );
      }
      
      const querySnapshot = await getDocs(q);
      const assessments = [];
      querySnapshot.forEach((doc) => {
        assessments.push({ id: doc.id, ...doc.data() });
      });
      return assessments;
    } catch (error) {
      console.error('Error loading assessments:', error);
      return [];
    }
  }
}

// ==========================================
// UI UTILITIES AND COMPONENTS
// ==========================================

class UIUtils {
  static showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span>${message}</span>
      </div>
    `;

    toastContainer.appendChild(toast);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 5000);

    // Allow manual dismissal
    toast.addEventListener('click', () => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    });
  }

  static showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      
      // Focus trap
      const focusableElements = modal.querySelectorAll(
        'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }

  static hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Restore scroll
    }
  }

  static renderCareerStreams() {
    Object.entries(CAREER_MAP).forEach(([streamName, pathways]) => {
      const streamColumn = document.querySelector(`[data-stream="${streamName}"] .pathway-cards`);
      if (!streamColumn) return;

      streamColumn.innerHTML = '';
      pathways.forEach(pathway => {
        const card = document.createElement('div');
        card.className = 'pathway-card';
        card.innerHTML = `
          <h4>${pathway.title}</h4>
          <p><strong>Degrees:</strong> ${pathway.degrees}</p>
          <p><strong>Careers:</strong> ${pathway.careers}</p>
          <p><strong>Exams:</strong> ${pathway.exams}</p>
          <p><strong>Next Steps:</strong> ${pathway.nextSteps}</p>
        `;
        streamColumn.appendChild(card);
      });
    });
  }

  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static validateStudentForm(formData) {
    const errors = [];
    
    if (!formData.name?.trim()) errors.push('Name is required');
    if (!formData.class?.trim()) errors.push('Class is required');
    if (!formData.age || formData.age < 13 || formData.age > 20) {
      errors.push('Age must be between 13 and 20');
    }
    
    return errors;
  }

  static exportToCSV(data, filename) {
    if (!data || data.length === 0) {
      UIUtils.showToast('No data to export', 'error');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    UIUtils.showToast(`${filename} exported successfully`, 'success');
  }

  static handleCSVImport(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csv = e.target.result;
          const lines = csv.split('\n');
          const headers = lines[0].split(',').map(h => h.trim());
          const students = [];

          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
            const student = {};
            
            headers.forEach((header, index) => {
              student[header.toLowerCase()] = values[index] || '';
            });

            if (student.name) {
              students.push({
                name: student.name,
                class: student.class || '',
                age: parseInt(student.age) || 16,
                gender: student.gender || '',
                notes: student.notes || ''
              });
            }
          }

          resolve(students);
        } catch (error) {
          reject(new Error('Failed to parse CSV file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
}

// ==========================================
// CAREER ASSESSMENT QUIZ
// ==========================================

class CareerQuiz {
  static calculateResult(responses) {
    const scores = { science: 0, commerce: 0, arts: 0, creative: 0 };
    
    // Scoring algorithm based on responses
    Object.entries(responses).forEach(([question, answer]) => {
      switch (answer) {
        case 'science':
        case 'lab':
        case 'problem-solving':
        case 'innovation':
        case 'independent':
        case 'research':
          scores.science += 1;
          break;
        case 'commerce':
        case 'office':
        case 'business':
        case 'money':
        case 'team':
          scores.commerce += 1;
          break;
        case 'arts':
        case 'outdoor':
        case 'social':
        case 'service':
        case 'leadership':
        case 'impact':
          scores.arts += 1;
          break;
        case 'creative':
        case 'expression':
        case 'collaborative':
        case 'artistic':
          scores.creative += 1;
          break;
      }
    });
    
    // Determine recommended stream
    const maxScore = Math.max(...Object.values(scores));
    const recommendedStreams = Object.keys(scores).filter(key => scores[key] === maxScore);
    const recommendedStream = recommendedStreams[0];
    
    return {
      scores,
      recommendedStream: recommendedStream.charAt(0).toUpperCase() + recommendedStream.slice(1),
      confidence: Math.round((maxScore / Object.keys(responses).length) * 100),
      alternatives: recommendedStreams.slice(1).map(s => s.charAt(0).toUpperCase() + s.slice(1))
    };
  }

  static showResults(result, studentName) {
    const resultModal = document.createElement('div');
    resultModal.className = 'modal active';
    resultModal.innerHTML = `
      <div class="modal-content">
        <header class="modal-header">
          <h3>Assessment Results for ${studentName}</h3>
          <button type="button" class="modal-close">&times;</button>
        </header>
        <div class="modal-body">
          <div class="quiz-results">
            <div class="result-summary">
              <h4>Recommended Stream: <span style="color: var(--accent)">${result.recommendedStream}</span></h4>
              <p><strong>Confidence Level:</strong> ${result.confidence}%</p>
              ${result.alternatives.length > 0 ? `<p><strong>Alternative options:</strong> ${result.alternatives.join(', ')}</p>` : ''}
            </div>
            <div class="result-breakdown">
              <h4>Interest Profile:</h4>
              <div class="score-bars">
                ${Object.entries(result.scores).map(([stream, score]) => `
                  <div class="score-bar">
                    <span class="stream-name">${stream.charAt(0).toUpperCase() + stream.slice(1)}</span>
                    <div class="bar-container">
                      <div class="bar-fill" style="width: ${(score / 6) * 100}%"></div>
                      <span class="score-text">${score}/6</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="recommendations">
              <h4>Next Steps:</h4>
              <ul>
                <li>Review the Career Map tab for detailed pathway information</li>
                <li>Explore colleges that offer programs in ${result.recommendedStream}</li>
                <li>Consider scheduling a detailed counseling session</li>
                ${result.confidence < 70 ? '<li style="color: #d97706;">Results show mixed interests - consider retaking assessment or exploring multiple streams</li>' : ''}
              </ul>
            </div>
          </div>
        </div>
        <footer class="modal-footer">
          <button type="button" class="btn-primary close-results">Close</button>
        </footer>
      </div>
    `;

    document.body.appendChild(resultModal);

    // Add styles for score bars
    const styles = `
      <style>
        .quiz-results { text-align: left; }
        .result-summary { margin-bottom: 24px; padding: 16px; background: #f9fafb; border-radius: 8px; }
        .result-breakdown { margin-bottom: 24px; }
        .score-bars { margin-top: 12px; }
        .score-bar { display: flex; align-items: center; margin-bottom: 12px; gap: 12px; }
        .stream-name { min-width: 80px; font-weight: 500; }
        .bar-container { flex: 1; display: flex; align-items: center; gap: 8px; }
        .bar-container > div { height: 24px; background: #e5e7eb; border-radius: 12px; flex: 1; overflow: hidden; }
        .bar-fill { height: 100%; background: var(--accent); border-radius: 12px; transition: width 0.5s ease; }
        .score-text { font-size: 14px; color: var(--muted); min-width: 32px; }
        .recommendations ul { margin-top: 12px; }
        .recommendations li { margin-bottom: 8px; }
      </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);

    // Event listeners
    const closeBtn = resultModal.querySelector('.modal-close');
    const closeResultsBtn = resultModal.querySelector('.close-results');
    
    [closeBtn, closeResultsBtn].forEach(btn => {
      btn.addEventListener('click', () => {
        document.body.removeChild(resultModal);
      });
    });

    UIUtils.showToast(`Assessment completed for ${studentName}`, 'success');
  }

  static validateQuizResponses(formData) {
    const responses = {};
    const formDataObj = new FormData(formData);
    
    for (const [key, value] of formDataObj.entries()) {
      responses[key] = value;
    }
    
    const expectedQuestions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
    const answeredQuestions = Object.keys(responses);
    
    if (answeredQuestions.length < expectedQuestions.length) {
      const unanswered = expectedQuestions.filter(q => !responses[q]);
      throw new Error(`Please answer all questions. Missing: ${unanswered.join(', ')}`);
    }
    
    return responses;
  }
}

// ==========================================
// MAIN APPLICATION CLASS
// ==========================================

class TeacherGuidedApp {
  constructor() {
    this.state = new AppState();
    this.init();
  }

  async init() {
    try {
      // Initialize Firebase authentication state listener
      if (!OFFLINE_MODE && auth) {
        onAuthStateChanged(auth, (user) => {
          this.state.setCurrentUser(user);
          if (user) {
            this.loadData();
          }
        });
      } else {
        // Demo mode - simulate logged in user
        this.state.setCurrentUser({ email: 'demo@teacher.com' });
        this.loadData();
      }
      
      this.setupEventListeners();
      this.state.updateTabDisplay();
      UIUtils.renderCareerStreams();
      
      console.log('TeacherGuided App initialized');
      if (OFFLINE_MODE) {
        UIUtils.showToast('Running in demo mode - Firebase integration disabled', 'info');
        console.log('📝 Firebase Setup Instructions:');
        console.log('1. Replace firebaseConfig with your actual Firebase configuration');
        console.log('2. Set OFFLINE_MODE = false');
        console.log('3. Uncomment Firebase import statements');
        console.log('4. Create Firestore collections: users, students, assessments, colleges');
      }
      
    } catch (error) {
      console.error('App initialization failed:', error);
      UIUtils.showToast('Failed to initialize app', 'error');
    }
  }

  async loadData() {
    try {
      const [students, colleges] = await Promise.all([
        FirebaseService.loadStudents(this.state.currentUser?.uid),
        FirebaseService.loadColleges()
      ]);
      
      this.state.setStudents(students);
      this.state.setColleges(colleges);
      
      console.log(`✅ Loaded ${students.length} students and ${colleges.length} colleges`);
    } catch (error) {
      console.error('Failed to load data:', error);
      UIUtils.showToast('Failed to load data', 'error');
    }
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabName = link.getAttribute('data-tab');
        this.state.switchTab(tabName);
      });
    });

    // Authentication
    const signInBtn = document.getElementById('teacher-signin-btn');
    const signOutBtn = document.getElementById('teacher-signout-btn');
    
    signInBtn?.addEventListener('click', this.handleSignIn.bind(this));
    signOutBtn?.addEventListener('click', this.handleSignOut.bind(this));

    // Student management
    const addStudentBtn = document.getElementById('add-student-btn');
    addStudentBtn?.addEventListener('click', () => {
      this.resetStudentForm();
      UIUtils.showModal('student-modal');
    });

    const importCsvBtn = document.getElementById('import-csv-btn');
    const csvFileInput = document.getElementById('csv-file-input');
    
    importCsvBtn?.addEventListener('click', () => csvFileInput?.click());
    csvFileInput?.addEventListener('change', this.handleCsvImport.bind(this));

    // Student form
    const studentForm = document.getElementById('student-form');
    studentForm?.addEventListener('submit', this.handleStudentSubmit.bind(this));

    // Quiz functionality
    const startQuizBtn = document.getElementById('start-quiz-btn');
    startQuizBtn?.addEventListener('click', () => {
      if (this.state.selectedStudent) {
        UIUtils.showModal('quiz-modal');
      } else {
        UIUtils.showToast('Please select a student first', 'error');
      }
    });

  const timerE1 = document.getElementById('timer');
  const qbox = document.getElementById('qbox');
  const startBtn = document.getElementById('start');
  const skipBtn = document.getElementById('skip');
  const ansInput = document.getElementById('ans');
  const scoreEl = document.getElementById('score');

  let timeLeft = 60, timerId = null, currentAnswer = null, score = 0;

  function rnd(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

  function makeQuestion(){
    const ops = ['+','-','*','/'];
    const op = ops[Math.floor(Math.random()*ops.length)];
    let a,b,question;
    if(op === '+'){ a=rnd(6,99); b=rnd(1,99); currentAnswer = a+b; question = `${a} + ${b}`; }
    else if(op === '-'){ a=rnd(10,99); b=rnd(1, a-1); currentAnswer = a-b; question = `${a} - ${b}`; }
    else if(op === '*'){ a=rnd(2,12); b=rnd(2,12); currentAnswer = a*b; question = `${a} × ${b}`; }
    else { // division: make divisible
      b=rnd(2,12); const c=rnd(2,12); a = b*c; currentAnswer = c; question = `${a} ÷ ${b}`; }
    qbox.innerHTML = `<span style="font-weight:700">Q:</span> ${question}`;
    ansInput.value = '';
    ansInput.focus();
  }

  function updateScore(){
    scoreEl.textContent = `Score: ${score}`;
  }
const icons = ['★','☀','♣','♦','♠','✿']; // 6 pairs -> 12 cards
  const grid = document.getElementById('grid');
  const status = document.getElementById('status');
  const timerE2 = document.getElementById('timer');
  const newBtn = document.getElementById('new');

  let deck = [], flipped = [], matched = 0, lock=false;
  let startTime = null, timerInterval=null;

  function init(){
    deck = [...icons, ...icons];
    // shuffle
    for(let i=deck.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1)); [deck[i],deck[j]] = [deck[j],deck[i]];
    }
    render();
    matched = 0; status.textContent = `Matches: ${matched}`;
    startTime = Date.now();
    timerE2.textContent = "Time: 0s";
    if(timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
  }

  function render(){
    grid.innerHTML = '';
    deck.forEach((sym, idx) => {
      const el = document.createElement('div');
      el.className = 'card';
      el.dataset.idx = idx;
      el.dataset.symbol = sym;
      el.innerHTML = `<span class="face">${sym}</span>`;
      el.querySelector('.face').style.opacity = 0; // hide symbol initially
      el.addEventListener('click', onCardClick);
      grid.appendChild(el);
    });
  }

  function updateTimer(){
    if(!startTime) return;
    const diff = Math.floor((Date.now() - startTime)/1000);
    timerE2.textContent = `Time: ${diff}s`;
  }

  function onCardClick(e){
    if(lock) return;
    const card = e.currentTarget;
    if(card.classList.contains('flipped')) return;
    flipCard(card);
    flipped.push(card);
    if(flipped.length === 2){
      const [a,b] = flipped;
      if(a.dataset.symbol === b.dataset.symbol){
        matched++;
        status.textContent = `Matches: ${matched}`;
        flipped = [];
        if(matched === icons.length) {
          clearInterval(timerInterval);
          const totalTime = Math.floor((Date.now()-startTime)/1000);
          setTimeout(()=> alert(`🎉 All matched! You finished in ${totalTime} seconds.`), 150);
        }
      } else {
        lock = true;
        setTimeout(()=> {
          unflip(a); unflip(b);
          flipped = [];
          lock = false;
        }, 700);
      }
    }
  }

  function flipCard(card){
    card.classList.add('flipped');
    card.querySelector('.face').style.opacity = 1;
    card.style.background = '#fff';
    card.style.color = '#222';
    card.style.border = '2px solid #eee';
  }
  function unflip(card){
    card.classList.remove('flipped');
    card.querySelector('.face').style.opacity = 0;
    card.style.background = '#6C63FF';
    card.style.color = '#fff';
    card.style.border = 'none';
  }

  newBtn.addEventListener('click', init);
  init();
  function tick(){
    timeLeft--;
    timerEl.textContent = timeLeft + 's';
    if(timeLeft<=0){ clearInterval(timerId); finish(); }
  }

  function finish(){
    ansInput.disabled = true;
    skipBtn.disabled = true;
    startBtn.disabled = false;
    qbox.innerHTML = `<strong>Time's up!</strong> Final score: ${score}`;
    timerEl.textContent = '0s';
  }

  startBtn.addEventListener('click', ()=>{
    // reset
    timeLeft = 60; score = 0; updateScore();
    ansInput.disabled = false; skipBtn.disabled = false; startBtn.disabled = true;
    makeQuestion();
    timerEl.textContent = timeLeft + 's';
    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
  });

  skipBtn.addEventListener('click', ()=>{
    makeQuestion();
  });

  ansInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      const val = ansInput.value.trim();
      if(val === '') return;
      const num = Number(val);
      if(num === currentAnswer){
        score++;
        // small feedback flash
        qbox.style.background = '#eafff1';
        setTimeout(()=> qbox.style.background = '', 120);
      } else {
        // wrong: small shake or color
        qbox.style.background = '#fff2f2';
        setTimeout(()=> qbox.style.background = '', 220);
      }
      updateScore();
      makeQuestion();
    }
  });

  // disable mouse wheel changing number input
  ansInput.addEventListener('wheel', e=> e.target.blur());


    // const quizForm = document.getElementById('career-quiz-form');
    // quizForm?.addEventListener('submit', this.handleQuizSubmit.bind(this));

    const viewHistoryBtn = document.getElementById('view-history-btn');
    viewHistoryBtn?.addEventListener('click', this.handleViewHistory.bind(this));

    // Modal close functionality
    document.addEventListener('click', (e) => {
      if (e.target.matches('.modal-close, .modal-cancel')) {
        const modal = e.target.closest('.modal');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });

    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        });
      }
    });

    // Student search
    const studentSearch = document.getElementById('student-search');
    studentSearch?.addEventListener('input', this.handleStudentSearch.bind(this));

    // College filters
    const streamFilter = document.getElementById('filter-stream');
    const sortFilter = document.getElementById('sort-colleges');
    
    streamFilter?.addEventListener('change', this.handleCollegeFilter.bind(this));
    sortFilter?.addEventListener('change', this.handleCollegeSort.bind(this));

    // Export functionality
    const exportStudentDataBtn = document.getElementById('export-student-data');
    const exportAssessmentsBtn = document.getElementById('export-assessments');
    const generateClassReportBtn = document.getElementById('generate-class-report');
    const downloadCounselingScriptBtn = document.getElementById('download-counseling-script');

    exportStudentDataBtn?.addEventListener('click', this.exportStudentData.bind(this));
    exportAssessmentsBtn?.addEventListener('click', this.exportAssessments.bind(this));
    generateClassReportBtn?.addEventListener('click', this.generateClassReport.bind(this));
    downloadCounselingScriptBtn?.addEventListener('click', this.downloadCounselingScript.bind(this));
  }

  async handleSignIn() {
    const emailInput = document.getElementById('teacher-email');
    const passwordInput = document.getElementById('teacher-pass');
    
    const email = emailInput?.value?.trim();
    const password = passwordInput?.value;
    
    if (!email || !password) {
      UIUtils.showToast('Please enter email and password', 'error');
      return;
    }

    if (!UIUtils.validateEmail(email)) {
      UIUtils.showToast('Please enter a valid email address', 'error');
      return;
    }

    try {
      const user = await FirebaseService.signIn(email, password);
      this.state.setCurrentUser(user);
      UIUtils.showToast('Successfully signed in', 'success');
      
      // Clear form
      emailInput.value = '';
      passwordInput.value = '';
      
      this.loadData();
    } catch (error) {
      console.error('Sign in failed:', error);
      UIUtils.showToast(error.message, 'error');
    }
  }

  async handleSignOut() {
    try {
      await FirebaseService.signOut();
      this.state.setCurrentUser(null);
      this.state.setStudents([]);
      this.state.setColleges([]);
      this.state.selectedStudent = null;
      this.state.switchTab('dashboard');
      UIUtils.showToast('Successfully signed out', 'success');
    } catch (error) {
      console.error('Sign out failed:', error);
      UIUtils.showToast(error.message, 'error');
    }
  }

  resetStudentForm() {
    const form = document.getElementById('student-form');
    if (form) {
      form.reset();
      document.getElementById('student-modal-title').textContent = 'Add New Student';
    }
  }

  async handleStudentSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const studentData = {
      name: formData.get('name')?.trim(),
      class: formData.get('class'),
      age: parseInt(formData.get('age')),
      gender: formData.get('gender'),
      notes: formData.get('notes')?.trim() || ''
    };

    // Validate form data
    const errors = UIUtils.validateStudentForm(studentData);
    if (errors.length > 0) {
      UIUtils.showToast(errors.join(', '), 'error');
      return;
    }

    try {
      if (OFFLINE_MODE) {
        this.state.addStudent(studentData);
        UIUtils.showToast('Student added successfully', 'success');
      } else {
        const newStudent = await FirebaseService.addStudent(studentData);
        this.state.students.push(newStudent);
        this.state.renderStudentsList();
        this.state.updateDashboard();
        UIUtils.showToast('Student added successfully', 'success');
      }
      
      UIUtils.hideModal('student-modal');
      e.target.reset();
    } catch (error) {
      console.error('Failed to add student:', error);
      UIUtils.showToast(error.message, 'error');
    }
  }

  async handleCsvImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      UIUtils.showToast('Please select a CSV file', 'error');
      return;
    }

    try {
      const students = await UIUtils.handleCSVImport(file);
      
      if (students.length === 0) {
        UIUtils.showToast('No valid student data found in CSV', 'error');
        return;
      }

      let addedCount = 0;
      for (const studentData of students) {
        try {
          if (OFFLINE_MODE) {
            this.state.addStudent(studentData);
          } else {
            const newStudent = await FirebaseService.addStudent(studentData);
            this.state.students.push(newStudent);
          }
          addedCount++;
        } catch (error) {
          console.error('Failed to add student:', studentData.name, error);
        }
      }

      if (!OFFLINE_MODE) {
        this.state.renderStudentsList();
        this.state.updateDashboard();
      }

      UIUtils.showToast(`Successfully imported ${addedCount} students`, 'success');
      e.target.value = ''; // Clear file input
    } catch (error) {
      console.error('CSV import failed:', error);
      UIUtils.showToast(error.message, 'error');
      e.target.value = '';
    }
  }

  async handleQuizSubmit(e) {
    e.preventDefault();
    
    if (!this.state.selectedStudent) {
      UIUtils.showToast('No student selected', 'error');
      return;
    }

    try {
      const responses = CareerQuiz.validateQuizResponses(e.target);
      const result = CareerQuiz.calculateResult(responses);
      
      // Save assessment
      await FirebaseService.saveAssessment(
        this.state.selectedStudent.id,
        responses,
        result
      );

      // Update student's lastAssessed in local state
      this.state.updateStudent(this.state.selectedStudent.id, {
        lastAssessed: new Date().toISOString()
      });

      // Show results
      CareerQuiz.showResults(result, this.state.selectedStudent.name);
      
      // Close quiz modal
      UIUtils.hideModal('quiz-modal');
      e.target.reset();

    } catch (error) {
      console.error('Quiz submission failed:', error);
      UIUtils.showToast(error.message, 'error');
    }
  }

  async handleViewHistory() {
    if (!this.state.selectedStudent) {
      UIUtils.showToast('Please select a student first', 'error');
      return;
    }

    try {
      const assessments = await FirebaseService.loadAssessments(this.state.selectedStudent.id);
      
      if (assessments.length === 0) {
        UIUtils.showToast('No assessment history found for this student', 'info');
        return;
      }

      // Create history modal (simplified for demo)
      const historyHtml = assessments.map(assessment => `
        <div class="assessment-item">
          <p><strong>Date:</strong> ${new Date(assessment.date).toLocaleDateString()}</p>
          <p><strong>Result:</strong> ${assessment.result.recommendedStream}</p>
          <p><strong>Confidence:</strong> ${assessment.result.confidence}%</p>
        </div>
      `).join('');

      // Show history in alert for demo (replace with proper modal in production)
      const historyText = assessments.map(a => 
        `${new Date(a.date).toLocaleDateString()}: ${a.result.recommendedStream} (${a.result.confidence}%)`
      ).join('\n');
      
      alert(`Assessment History for ${this.state.selectedStudent.name}:\n\n${historyText}`);
    } catch (error) {
      console.error('Failed to load assessment history:', error);
      UIUtils.showToast('Failed to load assessment history', 'error');
    }
  }

  handleStudentSearch(e) {
    this.state.searchQuery = e.target.value;
    this.state.renderStudentsList();
  }

  handleCollegeFilter(e) {
    this.state.collegeFilter.stream = e.target.value;
    this.state.renderCollegeGrid();
  }

  handleCollegeSort(e) {
    this.state.collegeFilter.sort = e.target.value;
    this.state.renderCollegeGrid();
  }

  exportStudentData() {
    if (this.state.students.length === 0) {
      UIUtils.showToast('No student data to export', 'error');
      return;
    }

    const exportData = this.state.students.map(student => ({
      Name: student.name,
      Class: student.class,
      Age: student.age,
      Gender: student.gender,
      'Last Assessed': student.lastAssessed ? new Date(student.lastAssessed).toLocaleDateString() : 'Never',
      Notes: student.notes
    }));

    UIUtils.exportToCSV(exportData, 'students_data.csv');
  }

  exportAssessments() {
    // Mock assessment data for demo
    const mockAssessments = this.state.students
      .filter(s => s.lastAssessed)
      .map(student => ({
        'Student Name': student.name,
        Class: student.class,
        'Assessment Date': new Date(student.lastAssessed).toLocaleDateString(),
        'Recommended Stream': ['Science', 'Commerce', 'Arts'][Math.floor(Math.random() * 3)],
        'Confidence Level': Math.floor(Math.random() * 30) + 70 + '%'
      }));

    if (mockAssessments.length === 0) {
      UIUtils.showToast('No assessment data to export', 'error');
      return;
    }

    UIUtils.exportToCSV(mockAssessments, 'assessments_data.csv');
  }

  generateClassReport() {
    const reportData = {
      totalStudents: this.state.students.length,
      assessed: this.state.students.filter(s => s.lastAssessed).length,
      pending: this.state.students.filter(s => !s.lastAssessed).length,
      avgAge: Math.round(this.state.students.reduce((sum, s) => sum + s.age, 0) / this.state.students.length),
      classDistribution: this.getClassDistribution()
    };

    const report = `
CLASS REPORT - ${new Date().toLocaleDateString()}
=====================================

Total Students: ${reportData.totalStudents}
Assessed: ${reportData.assessed}
Pending Assessment: ${reportData.pending}
Average Age: ${reportData.avgAge}

Class Distribution:
${Object.entries(reportData.classDistribution).map(([cls, count]) => `${cls}: ${count} students`).join('\n')}

Generated by TeacherGuided Career Advisor
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `class_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    UIUtils.showToast('Class report generated successfully', 'success');
  }

  downloadCounselingScript() {
    const script = `
CAREER COUNSELING CONVERSATION GUIDE
===================================

INTRODUCTION (5 minutes)
- Welcome the student warmly
- Explain the purpose of the session
- Ask about their current interests and concerns

ASSESSMENT REVIEW (10 minutes)
- Review their career assessment results
- Discuss the recommended stream
- Address any questions or concerns about the results

EXPLORATION (15 minutes)
- Explore specific career options within recommended stream
- Discuss required qualifications and education paths  
- Review relevant colleges and entrance exams
- Consider alternative streams if results were inconclusive

PLANNING (10 minutes)
- Help create a short-term action plan
- Set goals for academic preparation
- Identify resources for further exploration
- Schedule follow-up if needed

CONCLUSION (5 minutes)
- Summarize key points discussed
- Provide written recommendations
- Ensure student feels supported and motivated

ADDITIONAL TIPS:
- Listen actively and validate their feelings
- Be encouraging but realistic about options
- Consider family circumstances and preferences
- Document key points for future reference

Generated by TeacherGuided Career Advisor
    `.trim();

    const blob = new Blob([script], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'career_counseling_script.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    UIUtils.showToast('Counseling script downloaded', 'success');
  }

  getClassDistribution() {
    const distribution = {};
    this.state.students.forEach(student => {
      distribution[student.class] = (distribution[student.class] || 0) + 1;
    });
    return distribution;
  }
}

// ==========================================
// APPLICATION INITIALIZATION
// ==========================================

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.teacherGuidedApp = new TeacherGuidedApp();
});

// Global error handling
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  if (window.UIUtils) {
    UIUtils.showToast('An unexpected error occurred', 'error');
  }
});

// Handle offline/online status
window.addEventListener('online', () => {
  if (!OFFLINE_MODE) {
    UIUtils.showToast('Back online - data will sync', 'success');
  }
});

window.addEventListener('offline', () => {
  if (!OFFLINE_MODE) {
    UIUtils.showToast('Working offline - changes will sync when reconnected', 'info');
  }
});

console.log('🎓 TeacherGuided Career Advisor loaded successfully');