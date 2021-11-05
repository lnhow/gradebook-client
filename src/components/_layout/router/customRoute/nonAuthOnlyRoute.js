import AuthorizationRoute from "./authorizationRoute";

/**
 * Wrapper for authorization route for ease of use
 */
export default function NonAuthOnlyRoute({
  path,
  exact = false,
  children,
  alternativePath = '/'
}) {

  return (
    <AuthorizationRoute
      path={path}
      exact={exact}
      authRequired={false}
      alternativePath={alternativePath}
    >
      {children}
    </AuthorizationRoute>
  )
}
