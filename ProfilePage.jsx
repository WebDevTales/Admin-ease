import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { FaCamera, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';
import '../../styles/Profile/ProfilePage.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '...',
    email: '...',
    phone: '',
    photoURL: '',
    gender: '',
    age: '',
    country: '',
    loading: true
  });
  
  const [editMode, setEditMode] = useState({
    name: false,
    phone: false,
    email: false,
    gender: false,
    age: false,
    country: false
  });
  
  const [tempValues, setTempValues] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    age: '',
    country: ''
  });
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingChange, setPendingChange] = useState({ field: '', value: '' });
  const [imageUploading, setImageUploading] = useState(false);

  // List of countries for the dropdown
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
    'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
    'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
    'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
    'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
    'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
    'Comoros', 'Congo (Brazzaville)', 'Congo (Kinshasa)', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
    'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary',
    'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Jamaica', 'Japan', 'Jordan',
    'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
    'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
    'Oman',
    'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar',
    'Romania', 'Russia', 'Rwanda',
    'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
    'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
    'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen',
    'Zambia', 'Zimbabwe'
  ];
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const data = userSnap.data();
            setUserData({
              name: data.name || 'User',
              email: data.email || user.email || '',
              phone: data.phone || '',
              photoURL: data.photoURL || '',
              gender: data.gender || 'Not specified',
              age: data.age || '',
              country: data.country || 'Not specified',
              loading: false
            });
          } else {
            // Set dummy data if no user data exists
            setUserData({
              name: 'User',
              email: user.email || '',
              phone: '',
              photoURL: '',
              gender: '', // Default dummy value
              age: '25',     // Default dummy value
              country: 'United States', // Default dummy value
              loading: false
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData(prev => ({ ...prev, loading: false }));
        }
      } else {
        setUserData({
          name: 'Guest',
          email: '',
          phone: '',
          photoURL: '',
          gender: '',
          age: '',
          country: '',
          loading: false
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setImageUploading(true);
      
      // Compress the image
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };
      const compressedFile = await imageCompression(file, options);
      
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      
      reader.onloadend = async () => {
        const base64String = reader.result;
        const user = auth.currentUser;
        
        if (user) {
          try {
            // Update in Firestore
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
              photoURL: base64String
            });
            
            setUserData(prev => ({
              ...prev,
              photoURL: base64String
            }));
          } catch (error) {
            console.error('Error updating profile image:', error);
          } finally {
            setImageUploading(false);
          }
        }
      };
    } catch (error) {
      console.error('Error compressing image:', error);
      setImageUploading(false);
    }
  };

  const startEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
    setTempValues({
      ...tempValues,
      [field]: userData[field]
    });
  };

  const cancelEdit = (field) => {
    setEditMode({ ...editMode, [field]: false });
  };

  const saveChange = (field, value) => {
    setPendingChange({ field, value });
    setShowConfirm(true);
  };

  const confirmChange = async () => {
    const { field, value } = pendingChange;
    const user = auth.currentUser;
    
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { [field]: value });
      
      setUserData(prev => ({
        ...prev,
        [field]: value
      }));
      
      setEditMode({ ...editMode, [field]: false });
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Profile</h2>
          <div className="profile-status">
            <span className="status-badge premium">Premium Member</span>
          </div>
        </div>
        
        <div className="profile-image-container">
          <div className="profile-image-wrapper">
            <img 
              src={userData.photoURL || 'https://via.placeholder.com/150'} 
              alt="Profile" 
              className="profile-image"
            />
            <label className="image-upload-label">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                disabled={imageUploading}
              />
              <div className="camera-icon">
                {imageUploading ? (
                  <div className="spinner"></div>
                ) : (
                  <FaCamera />
                )}
              </div>
            </label>
          </div>
        </div>
        
        <div id="profile-info">
          {/* Existing fields */}
          <div className="info-item">
            <div className="info-row">
              <span className="info-label">Name:</span>
              {editMode.name ? (
                <div className="edit-field">
                  <input
                    type="text"
                    value={tempValues.name}
                    onChange={(e) => setTempValues({...tempValues, name: e.target.value})}
                  />
                  <button 
                    className="save-btn"
                    onClick={() => saveChange('name', tempValues.name)}
                  >
                    <FaCheck />
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => cancelEdit('name')}
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="value-with-edit">
                  <span className="info-value">{userData.name}</span>
                  <button 
                    className="edit-btn"
                    onClick={() => startEdit('name')}
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-row">
              <span className="info-label">Email:</span>
              {editMode.email ? (
                <div className="edit-field">
                  <input
                    type="email"
                    value={tempValues.email}
                    onChange={(e) => setTempValues({...tempValues, email: e.target.value})}
                  />
                  <button 
                    className="save-btn"
                    onClick={() => saveChange('email', tempValues.email)}
                  >
                    <FaCheck />
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => cancelEdit('email')}
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="value-with-edit">
                  <span className="info-value">{userData.email}</span>
                  <button 
                    className="edit-btn"
                    onClick={() => startEdit('email')}
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-row">
              <span className="info-label">Phone:</span>
              {editMode.phone ? (
                <div className="edit-field">
                  <input
                    type="tel"
                    value={tempValues.phone}
                    onChange={(e) => setTempValues({...tempValues, phone: e.target.value})}
                  />
                  <button 
                    className="save-btn"
                    onClick={() => saveChange('phone', tempValues.phone)}
                  >
                    <FaCheck />
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => cancelEdit('phone')}
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="value-with-edit">
                  <span className="info-value">{userData.phone || 'Not provided'}</span>
                  <button 
                    className="edit-btn"
                    onClick={() => startEdit('phone')}
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* New Gender Field */}
          <div className="info-item">
            <div className="info-row">
              <span className="info-label">Gender:</span>
              {editMode.gender ? (
                <div className="edit-field">
                  <select
                    value={tempValues.gender}
                    onChange={(e) => setTempValues({...tempValues, gender: e.target.value})}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <button 
                    className="save-btn"
                    onClick={() => saveChange('gender', tempValues.gender)}
                  >
                    <FaCheck />
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => cancelEdit('gender')}
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="value-with-edit">
                  <span className="info-value">{userData.gender || 'Not specified'}</span>
                  <button 
                    className="edit-btn"
                    onClick={() => startEdit('gender')}
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* New Age Field */}
          <div className="info-item">
            <div className="info-row">
              <span className="info-label">Age:</span>
              {editMode.age ? (
                <div className="edit-field">
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={tempValues.age}
                    onChange={(e) => setTempValues({...tempValues, age: e.target.value})}
                  />
                  <button 
                    className="save-btn"
                    onClick={() => saveChange('age', tempValues.age)}
                  >
                    <FaCheck />
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => cancelEdit('age')}
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="value-with-edit">
                  <span className="info-value">{userData.age || 'Not specified'}</span>
                  <button 
                    className="edit-btn"
                    onClick={() => startEdit('age')}
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* New Country Field */}
          <div className="info-item">
            <div className="info-row">
              <span className="info-label">Country:</span>
              {editMode.country ? (
                <div className="edit-field">
                  <select
                    value={tempValues.country}
                    onChange={(e) => setTempValues({...tempValues, country: e.target.value})}
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <button 
                    className="save-btn"
                    onClick={() => saveChange('country', tempValues.country)}
                  >
                    <FaCheck />
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => cancelEdit('country')}
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div className="value-with-edit">
                  <span className="info-value">{userData.country || 'Not specified'}</span>
                  <button 
                    className="edit-btn"
                    onClick={() => startEdit('country')}
                  >
                    <FaEdit />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-value">24</div>
            <div className="stat-label">Events Attended</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">5</div>
            <div className="stat-label">Upcoming Events</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">Gold</div>
            <div className="stat-label">Member Tier</div>
          </div>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="profile-confirm-dialog">
          <div className="confirm-content">
            <h3>Confirm Change</h3>
            <p>Are you sure you want to update your {pendingChange.field}?</p>
            <div className="confirm-buttons">
              <button 
                className="confirm-cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-ok"
                onClick={confirmChange}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;