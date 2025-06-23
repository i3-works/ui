import React from 'react';
import styles from './AppBar.module.scss';
import type { AppBarSchema } from './AppBar.types';

type Props = {
  schema?: AppBarSchema;
  onEvent?: (event: string) => void;
  childrenLeft?: React.ReactNode;
  childrenCenter?: React.ReactNode;
  childrenRight?: React.ReactNode;
};

export const AppBar = ({
  schema = [],
  onEvent,
  childrenLeft,
  childrenCenter,
  childrenRight,
}: Props) => {
  const renderItem = (item: AppBarSchema[number], idx: number) => {
    switch (item.type) {
      case 'button':
        return (
          <button key={idx} onClick={() => item.onClick && onEvent?.(item.onClick)}>
            {item.label}
          </button>
        );
      case 'search':
        return (
          <input
            key={idx}
            type="search"
            placeholder={item.label || 'Search...'}
            onChange={() => item.onClick && onEvent?.(item.onClick)}
          />
        );
      case 'dropdown':
        return (
          <select key={idx} onChange={() => item.onClick && onEvent?.(item.onClick)}>
            {item.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  const grouped = {
    left: schema.filter((s) => s.position === 'left'),
    center: schema.filter((s) => s.position === 'center'),
    right: schema.filter((s) => s.position === 'right'),
  };

  return (
    <div className={styles.appBar}>
      <div className={styles.left}>
        {childrenLeft}
        {grouped.left.map(renderItem)}
      </div>
      <div className={styles.center}>
        {childrenCenter}
        {grouped.center.map(renderItem)}
      </div>
      <div className={styles.right}>
        {childrenRight}
        {grouped.right.map(renderItem)}
      </div>
    </div>
  );
};
