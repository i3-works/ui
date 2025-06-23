import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AppBar } from './AppBar';
import { AppBarSchema } from './AppBar.types';

const meta: Meta<typeof AppBar> = {
  title: 'Components/AppBar',
  component: AppBar,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

const schema: AppBarSchema = [
  { type: 'button', label: '戻る', position: 'left', onClick: 'back' },
  { type: 'search', label: '検索', position: 'center', onClick: 'search' },
  {
    type: 'dropdown',
    position: 'right',
    name: 'status',
    options: [
      { label: 'すべて', value: 'all' },
      { label: '進行中', value: 'in-progress' },
      { label: '完了', value: 'done' },
    ],
    onClick: 'filter',
  },
  { type: 'button', label: '保存', position: 'right', onClick: 'save' },
];

export const Default: StoryObj<typeof AppBar> = {
  render: () => (
    <AppBar
      schema={schema}
      onEvent={(event) => alert(`イベント: ${event}`)}
    />
  ),
};
