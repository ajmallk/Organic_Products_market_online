import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

/**
 * PrivateRoute — wraps protected pages.
 * If the user is not authenticated, redirects them to /login.
 * Usage: <Route path="/..." element={<PrivateRoute><YourPage /></PrivateRoute>} />
 */
function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);

    // If no user is logged in, redirect to the login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User is logged in — render the protected content
    return children;
}

export default PrivateRoute;
