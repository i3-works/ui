import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Storybook上のカテゴリ表示名
  component: Button,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Clickable: Story = {
  args: {
    children: 'Click Me!',
    onClick: () => alert('Button clicked!'),
  },
}
