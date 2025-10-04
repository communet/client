import { Button } from "../../shared"
import { Link } from "@tanstack/react-router"

export const AboutPage = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">about page</h1>
      <Button>
        <Link to="/">Home</Link>
      </Button>
    </div>
  )
}
