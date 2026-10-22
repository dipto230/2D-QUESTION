

export default function SubmissionPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-12">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Submit Your Project
          </h1>

          <p className="mt-2 text-gray-600">
            Submit your project information for review.
          </p>
        </div>

        <SubmissionForm />

      </div>
    </main>
  );
}