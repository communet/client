import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { api, Button, Spinner } from "../../shared";

export const MainPage = () => {
  const query = useQuery({
    queryKey: ['getUserById'],
    queryFn: () => api.user.getById('123'),
  });

  return (
    <div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">main page</h1>

      <Button>
        <Link to="/about">About</Link>
      </Button>

      <Button variant={query.data?.error ? 'destructive' : 'default'}>
        {!query.data && <Spinner />}

        {
          query.data
            ? !query.data.error
              ? `User(${query.data.data.id}): ${query.data.data.username}`
              : query.data.reason.join('/')
            : 'Loading...'
        }
      </Button>
    </div>
  )
}