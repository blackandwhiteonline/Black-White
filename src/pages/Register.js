import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page since it handles both login and register
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Register; 