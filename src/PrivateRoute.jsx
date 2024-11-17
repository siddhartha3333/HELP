function PrivateRoute({ children }) {
    const [auth, setAuth] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
  
    useEffect(() => {
      const checkAuth = async () => {
        const isAuth = await isAuthenticated();
        setAuth(isAuth);
        setLoading(false);
      };
  
      checkAuth();
    }, []);
  
    if (loading) return <div>Loading...</div>; // Show loading spinner while checking
  
    return auth ? children : <Navigate to="/sign-in" replace />;
  }
  