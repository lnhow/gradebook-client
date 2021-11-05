import AuthorizationRoute from "./authorizationRoute";

/**
 * Wrapper for authorization route for ease of use
 */
export default function AuthOnlyRoute({
  path,
  exact = false,
  children,
  alternativePath = '/signin',
}) {

  return (
    <AuthorizationRoute
      path={path}
      exact={exact}
      alternativePath={alternativePath}
    >
      {children}
    </AuthorizationRoute>
  )
}
