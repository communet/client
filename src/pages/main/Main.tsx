import { Link } from "@tanstack/react-router"

export const MainPage = () => {
  return (
    <div>
      <h1>main page</h1>
      <Link to="/about">About</Link>
    </div>
  )
}