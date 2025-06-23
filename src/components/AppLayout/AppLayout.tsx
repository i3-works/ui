import React from 'react';
import styles from './AppLayout.module.scss';
import { useSlots } from './useSlots';
import { useAppLayout } from './AppLayoutProvider';
import type { AppLayoutComponent } from './AppLayout.types';

export const AppLayout: AppLayoutComponent = ({ children }) => {
  // AppBarを追加
  const { Header, AppBar, Left, Main, Right, Footer } = useSlots(children);
  const {
    isLeftPaneShow,
    isRightPaneShow,
    leftPaneWidth,
    rightPaneWidth,
  } = useAppLayout();

  const hasHeader = Boolean(Header);

  const layoutClass = [
    styles.root,
    isLeftPaneShow ? styles.withLeft : styles.noLeft,
    isRightPaneShow ? styles.withRight : styles.noRight,
    !hasHeader ? styles.noHeader : '',
  ].join(' ');

  return (
    <div className={layoutClass}>
      {/* Header */}
      <div className={styles.header}>
        {Header}
      </div>
      {/* AppBar（Headerの下） */}
      {AppBar && (
        <div className={styles.appBar}>
          {AppBar}
        </div>
      )}

      <div className={styles.body}>
        {isLeftPaneShow && Left && <div style={{ width: leftPaneWidth }}>{Left}</div>}
        {Main}
        {isRightPaneShow && Right && <div style={{ width: rightPaneWidth }}>{Right}</div>}
      </div>

      {Footer}
    </div>
  );
};

// スロットコンポーネントを追加
AppLayout.Header = ({ children, visible = true }) => (
  <header className={styles.header}>
    {visible ? children : null}
  </header>
);
AppLayout.AppBar = ({ children }: { children: React.ReactNode }) => children;
AppLayout.Left = ({ children }) => <aside className={styles.left}>{children}</aside>;
AppLayout.Main = ({ children }) => <main className={styles.main}>{children}</main>;
AppLayout.Right = ({ children }) => <aside className={styles.right}>{children}</aside>;
AppLayout.Footer = ({ children, visible = true }) => (
  <footer className={styles.footer}>
    {visible ? children : null}
  </footer>
);
