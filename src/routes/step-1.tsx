import { createFileRoute } from '@tanstack/react-router';
import { sectionCardClasses } from '../mobile-form/fields/styles';
import { AccountForm } from '../account-form/account-form';

const StepOne = () => (
  <section className={`${sectionCardClasses} space-y-6`}>
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Step 1</p>
      <h2 className="text-2xl font-semibold text-white">Account verification</h2>
      <p className="text-base text-white/70">
        Start by telling us who you are. We use this information to locate your account and prepare the transfer.
      </p>
    </div>
    <AccountForm />
  </section>
);

export const Route = createFileRoute('/step-1')({
  component: StepOne,
});
