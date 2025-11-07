import { createFileRoute } from '@tanstack/react-router';
import { sectionCardClasses } from '../mobile-form/fields/styles';

const StepOne = () => (
  <section className={`${sectionCardClasses} space-y-4`}>
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Step 1</p>
      <h2 className="text-2xl font-semibold text-white">Account lookup & eligibility</h2>
    </div>
    <p className="text-base text-white/80">
      This placeholder represents the first step in the journey. In a real flow you could collect customer info,
      fetch eligibility, or confirm consent before moving forward.
    </p>
  </section>
);

export const Route = createFileRoute('/step-1')({
  component: StepOne,
});
