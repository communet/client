import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

export const MainPage = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">main page</h1>
      <Button>
        <Link to="/about">About</Link>
      </Button>
    </div>
  )
}