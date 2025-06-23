import { ReactNode, isValidElement, Children } from 'react';
import { AppLayout } from './AppLayout';

// 👇 戻り値型を ReactNode | null にすることで安全に
export function useSlots(children: ReactNode) {
  const childrenArray = Children.toArray(children);

  const findSlot = (Component: React.ComponentType<any>): ReactNode =>
    childrenArray.find(
      (child): child is React.ReactElement =>
        isValidElement(child) && child.type === Component
    ) ?? null;

  const hasSlot = (Component: React.ComponentType<any>): boolean =>
    childrenArray.some(
      (child): child is React.ReactElement =>
        isValidElement(child) && child.type === Component
    );

  return {
    Header: findSlot(AppLayout.Header),
    Left: findSlot(AppLayout.Left),
    Main: findSlot(AppLayout.Main),
    Right: findSlot(AppLayout.Right),
    Footer: findSlot(AppLayout.Footer),
    hasLeft: hasSlot(AppLayout.Left),
    hasRight: hasSlot(AppLayout.Right),
  };
}
