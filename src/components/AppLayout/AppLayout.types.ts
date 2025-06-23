import type { ReactNode, FC } from 'react';

export type SlotComponent = FC<{
  children: ReactNode;
  visible?: boolean;
}>;

export interface AppLayoutComponent extends FC<{ children: ReactNode }> {
  Header: SlotComponent;
  Left: SlotComponent;
  Main: SlotComponent;
  Right: SlotComponent;
  Footer: SlotComponent;
}
