
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export default function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  
  const goForward = useCallback(() => {
    navigate(1);
  }, [navigate]);
  
  const goTo = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);
  
  const canGoBack = window.history.length > 1;
  
  return {
    goBack,
    goForward,
    goTo,
    canGoBack,
    currentPath: location.pathname
  };
}