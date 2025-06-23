import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AppLayout } from './AppLayout';
import { AppLayoutProvider, useAppLayout } from './AppLayoutProvider';

type Args = {
  showHeader: boolean;
  showFooter: boolean;
  leftPaneInitialShow: boolean;
  rightPaneInitialShow: boolean;
  leftPaneWidth: number;
  rightPaneWidth: number;
};

const meta: Meta<Args> = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  argTypes: {
    showHeader: { control: 'boolean', defaultValue: true },
    showFooter: { control: 'boolean', defaultValue: true },
    leftPaneInitialShow: { control: 'boolean', defaultValue: true },
    rightPaneInitialShow: { control: 'boolean', defaultValue: true },
    leftPaneWidth: {
      control: { type: 'range', min: 100, max: 400, step: 10 },
      defaultValue: 240,
    },
    rightPaneWidth: {
      control: { type: 'range', min: 100, max: 400, step: 10 },
      defaultValue: 300,
    },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

export const WithControls: StoryObj<Args> = {
  render: ({
    showHeader,
    showFooter,
    leftPaneInitialShow,
    rightPaneInitialShow,
    leftPaneWidth,
    rightPaneWidth,
  }) => (
    <AppLayoutProvider
      leftPaneInitialShow={leftPaneInitialShow}
      rightPaneInitialShow={rightPaneInitialShow}
    >
      <PaneWidthSync left={leftPaneWidth} right={rightPaneWidth} />
      <AppLayout>
        <AppLayout.Header visible={showHeader}>
          <div style={{ background: '#e3fafc' }}>Header</div>
        </AppLayout.Header>

        <AppLayout.Left>
          <div style={{ background: '#e9f5ff', height: '100%' }}>Left Pane</div>
        </AppLayout.Left>

        <AppLayout.Main>
          <MainContent />
        </AppLayout.Main>

        <AppLayout.Right>
          <div style={{ background: '#fff3bf', height: '100%' }}>Right Pane</div>
        </AppLayout.Right>

        <AppLayout.Footer visible={showFooter}>
          <div style={{ background: '#f1f3f5' }}>Footer</div>
        </AppLayout.Footer>
      </AppLayout>
    </AppLayoutProvider>
  ),
};

// Contextへ width を反映
function PaneWidthSync({ left, right }: { left: number; right: number }) {
  const { setLeftPaneWidth, setRightPaneWidth } = useAppLayout();
  React.useEffect(() => {
    setLeftPaneWidth(left);
    setRightPaneWidth(right);
  }, [left, right]);
  return null;
}

// Pane 開閉トグルボタン
function MainContent() {
  const {
    isLeftPaneShow,
    setLeftPaneShow,
    isRightPaneShow,
    setRightPaneShow,
  } = useAppLayout();

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <button onClick={() => setLeftPaneShow(p => !p)}>
        {isLeftPaneShow ? '左パネルを閉じる' : '左パネルを開く'}
      </button>
      <button onClick={() => setRightPaneShow(p => !p)}>
        {isRightPaneShow ? '右パネルを閉じる' : '右パネルを開く'}
      </button>
      <p>これは Main エリアです。</p>
    </div>
  );
}
