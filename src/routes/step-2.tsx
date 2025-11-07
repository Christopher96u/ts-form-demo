import { createFileRoute } from '@tanstack/react-router';
import { MobileForm } from '../mobile-form';

export const Route = createFileRoute('/step-2')({
  component: MobileForm,
});
