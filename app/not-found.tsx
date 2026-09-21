import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-4 text-slate-600">The page you are looking for does not exist.</p>
        <Link href="/" className="btn-primary mt-6 inline-flex px-6 py-3">
          Go Home
        </Link>
      </div>
    </main>
  );
}
