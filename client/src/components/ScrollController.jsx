import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollController = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollableRoutes = ['/table'];

    if (scrollableRoutes.includes(location.pathname)) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }
  }, [location.pathname]);

  return null; // no UI
};

export default ScrollController;
