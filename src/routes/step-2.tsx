import { Link, createFileRoute } from '@tanstack/react-router';
import { MobileForm } from '../mobile-form';

const StepTwo = () => (
  <div className="space-y-6">
    <Link
      to="/step-1"
      className="inline-flex items-center text-sm font-semibold text-white/70 transition hover:text-white"
    >
      ← Back to Step 1
    </Link>
    <MobileForm />
  </div>
);

export const Route = createFileRoute('/step-2')({
  component: StepTwo,
});
