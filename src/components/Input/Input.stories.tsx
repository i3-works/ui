import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

// Story用の拡張型
type InputStoryProps = React.ComponentProps<typeof Input> & {
  showToggle?: boolean
}

const meta: Meta<InputStoryProps> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'borderless', 'underlined'],
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'warning'],
    },
    withPasswordToggle: {
      control: 'boolean',
      description: 'パスワード表示切替ボタンを表示するかどうか（password時のみ有効）',
    },
    disalbed: {
      control: 'boolean',
      description: '入力を無効にする',
    },
    readonly: {
      control: 'boolean',
      description: '読み取り専用にする（編集不可だが選択可能）',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}


export default meta
type Story = StoryObj<InputStoryProps>

/* 基本 */

export const Text: Story = {
  args: {
    label: '名前',
    placeholder: 'フルネームを入力してください',
    type: 'text',
  },
}

export const Password: Story = {
  args: {
    label: 'パスワード',
    placeholder: '8文字以上',
    type: 'password',
    withPasswordToggle: true,
  },
}

export const Number: Story = {
  args: {
    label: '年齢',
    placeholder: '18以上の数字',
    type: 'number',
  },
}

/* 説明 / エラー */

export const WithDescription: Story = {
  args: {
    label: 'ユーザーID',
    description: '英数字4文字以上',
    placeholder: 'your-id',
  },
}

export const WithError: Story = {
  args: {
    label: 'メールアドレス',
    errorMessage: '有効なメールアドレスを入力してください',
    placeholder: 'example@domain.com',
    status: 'error',
  },
}

/* サイズ */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Input label="Small" size="small" placeholder="小" />
      <Input label="Medium" size="medium" placeholder="中" />
      <Input label="Large" size="large" placeholder="大" />
    </div>
  ),
}

/* prefix / suffix */

export const WithPrefixSuffix: Story = {
  args: {
    label: 'メールアドレス',
    prefix: <EnvelopeIcon width={16} height={16} />,
    suffix: '@example.com',
    placeholder: 'yourname',
  },
}

export const WithMaxLength: Story = {
  args: {
    label: 'ニックネーム',
    placeholder: '15文字以内',
    maxLength: 15,
  },
}

export const WithWidth: Story = {
  render: () => (
    <div style={{ width: '250px' }}>
      <Input label="幅指定" placeholder="入力…" />
    </div>
  ),
}
