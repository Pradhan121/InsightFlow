
import Login from "./login/page"

export default function Home() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <main>
        <Login />
      </main>
    </>
  )
}
