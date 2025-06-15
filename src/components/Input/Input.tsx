import { useRef, useState } from 'react'
import { useTextField } from 'react-aria'
import type { AriaTextFieldProps } from 'react-aria'
import styles from './Input.module.scss'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

export type InputProps = AriaTextFieldProps & {
  variant?: 'outlined' | 'filled' | 'borderless' | 'underlined',
  status?: 'error' | 'warning',
  size?: 'small' | 'medium' | 'large',
  errorMessage?: React.ReactNode,
  prefix?: React.ReactNode,
  suffix?: React.ReactNode,
  disalbed?: boolean,
  readonly?: boolean,
  withPasswordToggle?: boolean,
}

export const Input = ({
  variant = 'outlined',
  status,
  size = 'medium',
  type = 'text',
  prefix,
  suffix,
  disalbed,
  readonly,
  withPasswordToggle = true,
  ...props
}: InputProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField({ ...props, type, isDisabled: disalbed, isReadOnly: readonly }, ref)
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordField = type === 'password'
  const actualType = isPasswordField ? (showPassword ? 'text' : 'password') : type

  return (
    <div
      className={clsx(
      styles.inputWrapper,
      styles[variant],
      status && styles[status],
      styles[size],
      disalbed && styles.disabled,
      readonly && styles.readonly
  )}
    >
      {props.label && <label {...labelProps} className={styles.label}>{props.label}</label>}

      <div className={styles.inputContainer}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input {...inputProps} ref={ref} type={actualType} className={styles.input} />
        <span className={styles.suffix}>
          {(isPasswordField && withPasswordToggle) ? (
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
              title={showPassword ? 'パスワードを隠す' : 'パスワードを表示'} // 追加
            >
              {showPassword ? <EyeSlashIcon width={16} height={16} /> : <EyeIcon width={16} height={16} />}
            </button>
          ) : (
            suffix
          )}
        </span>
      </div>

      {props.description && (
        <div {...descriptionProps} className={styles.description}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} className={styles.error}>
          {props.errorMessage}
        </div>
      )}
    </div>
  )
}
