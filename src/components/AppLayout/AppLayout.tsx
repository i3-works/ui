import React from 'react';
import styles from './AppLayout.module.scss';
import { useSlots } from './useSlots';
import { useAppLayout } from './AppLayoutProvider';
import type { AppLayoutComponent } from './AppLayout.types';

export const AppLayout: AppLayoutComponent = ({ children }) => {
  const { Header, Left, Main, Right, Footer } = useSlots(children);
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
      {/* ← ★ Headerスロットは空でもgridに対応するよう必ず描画 */}
      <div className={styles.header}>
        {Header}
      </div>

      <div className={styles.body}>
        {isLeftPaneShow && Left && <div style={{ width: leftPaneWidth }}>{Left}</div>}
        {Main}
        {isRightPaneShow && Right && <div style={{ width: rightPaneWidth }}>{Right}</div>}
      </div>

      {Footer}
    </div>
  );
};

AppLayout.Header = ({ children, visible = true }) => (
  <header className={styles.header}>
    {visible ? children : null}
  </header>
);
AppLayout.Left = ({ children }) => <aside className={styles.left}>{children}</aside>;
AppLayout.Main = ({ children }) => <main className={styles.main}>{children}</main>;
AppLayout.Right = ({ children }) => <aside className={styles.right}>{children}</aside>;
AppLayout.Footer = ({ children, visible = true }) => (
  <footer className={styles.footer}>
    {visible ? children : null}
  </footer>
);
