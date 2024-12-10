import { lazy, Suspense } from 'react';
import { create } from 'zustand';

const NavigationTransitionConfirmationContent = lazy(() => import('./navigation-transition-confirmation-content'));

interface FormsStore {
  forms: Map<string, boolean>;
}

export const useFormsStore = create<FormsStore>()(() => ({ forms: new Map() }));

const NavigationTransitionConfirmation = () => {
  const { forms } = useFormsStore();
  const isOpen = Array.from(forms.values()).some((isEditing) => isEditing);

  return isOpen ? (
    <Suspense>
      <NavigationTransitionConfirmationContent />
    </Suspense>
  ) : null;
};

export default NavigationTransitionConfirmation;
