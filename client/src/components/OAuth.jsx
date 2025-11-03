import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

        const result = await signInWithPopup(auth, provider);
        console.log('Google sign in successful', result);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      // Robust response parsing: handle empty / invalid JSON to avoid
      // "Unexpected end of JSON input" errors in the browser.
      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (parseErr) {
        console.error('Failed to parse JSON from /api/auth/google response:', text);
        throw parseErr;
      }
      if (!data || data.success === false) {
        console.error('Server error or empty response from /api/auth/google:', data);
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
        console.error('Could not sign in with Google:', error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}
