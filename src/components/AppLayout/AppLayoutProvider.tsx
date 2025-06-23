import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';

type SetStateAction<T> = T | ((prev: T) => T);

type AppLayoutContextValue = {
  isLeftPaneShow: boolean;
  setLeftPaneShow: (value: SetStateAction<boolean>) => void;
  leftPaneWidth: number;
  setLeftPaneWidth: (width: number) => void;

  isRightPaneShow: boolean;
  setRightPaneShow: (value: SetStateAction<boolean>) => void;
  rightPaneWidth: number;
  setRightPaneWidth: (width: number) => void;
};

const AppLayoutContext = createContext<AppLayoutContextValue | null>(null);

type Props = {
  children: ReactNode;
  leftPaneInitialShow?: boolean;
  rightPaneInitialShow?: boolean;
};

export const AppLayoutProvider = ({
  children,
  leftPaneInitialShow = true,
  rightPaneInitialShow = true,
}: Props) => {
  const [isLeftPaneShow, setIsLeftPaneShow] = useState(leftPaneInitialShow);
  const [isRightPaneShow, setIsRightPaneShow] = useState(rightPaneInitialShow);
  const [leftPaneWidth, setLeftPaneWidth] = useState(240);
  const [rightPaneWidth, setRightPaneWidth] = useState(300);

  const setLeftPaneShow = useCallback((value: SetStateAction<boolean>) => {
    setIsLeftPaneShow(prev => (typeof value === 'function' ? value(prev) : value));
  }, []);
  const setRightPaneShow = useCallback((value: SetStateAction<boolean>) => {
    setIsRightPaneShow(prev => (typeof value === 'function' ? value(prev) : value));
  }, []);

  const value = useMemo(
    () => ({
      isLeftPaneShow,
      setLeftPaneShow,
      leftPaneWidth,
      setLeftPaneWidth,
      isRightPaneShow,
      setRightPaneShow,
      rightPaneWidth,
      setRightPaneWidth,
    }),
    [isLeftPaneShow, isRightPaneShow, leftPaneWidth, rightPaneWidth]
  );

  return (
    <AppLayoutContext.Provider value={value}>
      {children}
    </AppLayoutContext.Provider>
  );
};

export const useAppLayout = (): AppLayoutContextValue => {
  const ctx = useContext(AppLayoutContext);
  if (!ctx) throw new Error('useAppLayout must be used within AppLayoutProvider');
  return ctx;
};
