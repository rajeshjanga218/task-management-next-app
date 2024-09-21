import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div>
        <h2>Welcome to Task List App</h2>
        <Link href="/tasks">Go to Task List</Link>
      </div>
    </div>
  );
}
