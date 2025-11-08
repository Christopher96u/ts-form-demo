import { Link, createFileRoute } from '@tanstack/react-router';
import { sectionCardClasses } from '../mobile-form/fields/styles';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible-radix';

const StepThree = () => (
  <section className="space-y-4 min-h-[70vh]">
    <Link
      to="/step-2"
      className="inline-flex items-center text-sm font-semibold text-white/70 transition hover:text-white"
    >
      ← Back to Step 2
    </Link>
    <div className={sectionCardClasses + ' space-y-4'}>
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Step 3</p>
      <h2 className="text-2xl font-semibold text-white">Review & confirmation</h2>
    </div>
    <p className="text-base text-white/80">
      Use this space to summarize the request, display order numbers, and outline next steps. For now it is a
      friendly placeholder.
    </p>
      <Collapsible defaultOpen>
        <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between text-left text-sm font-semibold text-white/80">
          Order summary preview
          <svg
            aria-hidden
            className="h-4 w-4 rotate-0 text-white/70 transition-transform data-[state=open]:rotate-180"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContentRadix text-sm text-white/70">
          <p className="mt-3">
            This block uses the CSS Grid trick highlighted in Stefan Judis’s article to animate height changes without
            brittle max-height hacks. Toggle it to see the smooth reveal.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-white/60">
            <li>Service address: 123 Main Street</li>
            <li>Selected plan: Fiber Max</li>
            <li>Installation window: 08:00–12:00</li>
          </ul>
        </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  </section>
);

export const Route = createFileRoute('/step-3')({
  component: StepThree,
});
