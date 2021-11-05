import ErrorPage from "../../_common/error";

export default function NotFoundPage() {
  return (
    <ErrorPage
      code={404}
      title='Page requested not found'
      details='The page you requested does not exist'
    />
  )
}
