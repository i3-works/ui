export type AppBarSchema = {
  type: 'button' | 'search' | 'dropdown';
  label?: string;
  name?: string;
  icon?: string;
  position: 'left' | 'center' | 'right';
  options?: { label: string; value: string }[];
  onClick?: string;
}[];
