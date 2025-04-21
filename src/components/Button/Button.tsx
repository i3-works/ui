import { useRef } from 'react'
import { useButton } from 'react-aria'
import styles from './Button.module.scss'

export type ButtonProps = {
  children?: React.ReactNode
  onPress?: () => void
  isDisabled?: boolean
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' // ★ ghost追加
  size?: 'small' | 'medium' | 'large'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = ({
  children,
  onPress,
  isDisabled = false,
  isLoading = false,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
}: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton({ onPress, isDisabled: isDisabled || isLoading }, ref)

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${isLoading ? styles.loading : ''}`}
    >
      <span className={styles.content}>
        {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
        {children && <span className={styles.text}>{children}</span>}
        {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
      </span>

      {isLoading && (
        <span className={styles.spinnerWrapper}>
          <span className={styles.spinner} />
        </span>
      )}
    </button>
  )
}
