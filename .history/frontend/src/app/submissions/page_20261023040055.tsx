import SubmissionForm from "@/src/components/submission/submission-form";


export default function SubmissionPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Submit Your Project
          </h1>

          <p className="mt-2 text-gray-600">
            Provide your project details below.
            Make sure all information is correct
            before submitting.
          </p>
        </div>

        <SubmissionForm />
      </div>
    </main>
  );
}