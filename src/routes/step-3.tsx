import { Link, createFileRoute } from '@tanstack/react-router';
import { sectionCardClasses } from '../mobile-form/fields/styles';

const StepThree = () => (
  <section className={`${sectionCardClasses} space-y-4`}>
    <Link
      to="/step-2"
      className="inline-flex items-center text-sm font-semibold text-white/70 transition hover:text-white"
    >
      ← Back to Step 2
    </Link>
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Step 3</p>
      <h2 className="text-2xl font-semibold text-white">Review & confirmation</h2>
    </div>
    <p className="text-base text-white/80">
      Use this space to summarize the request, display order numbers, and outline next steps. For now it is a
      friendly placeholder.
    </p>
  </section>
);

export const Route = createFileRoute('/step-3')({
  component: StepThree,
});
