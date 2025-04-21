import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    isDisabled: true,
  },
}

export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'primary',
    size: 'small',
  },
}

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    variant: 'primary',
    size: 'medium',
  },
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'primary',
    size: 'large',
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Add New',
    icon: <PlusIcon width={20} height={20} />,
    iconPosition: 'left',
  },
}

export const IconOnly: Story = {
  args: {
    icon: <XMarkIcon width={20} height={20} />,
    variant: 'danger',
    size: 'small',
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
    variant: 'primary',
    size: 'medium',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'medium',
  },
}