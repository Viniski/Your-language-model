import { useEffect, useId } from 'react';
import { useFormsStore } from './navigation-transition-confirmation';

const useNavigationTransitionConfirmation = (isEditing: boolean) => {
  const id = useId();

  useEffect(() => {
    useFormsStore.setState((prev) => {
      const newMap = new Map(prev.forms);
      newMap.set(id, isEditing);

      return { forms: newMap };
    });

    return () => {
      useFormsStore.setState((prev) => {
        const newMap = new Map(prev.forms);
        newMap.delete(id);

        return { forms: newMap };
      });
    };
  }, [isEditing, id]);
};

export default useNavigationTransitionConfirmation;
