
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'
export const PrivateRoute = ({ element, path }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
        element
    ) : (
        <Navigate to="/login" state={{ from: path }} replace />
    );
};
PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
    path: PropTypes.string.isRequired,
};