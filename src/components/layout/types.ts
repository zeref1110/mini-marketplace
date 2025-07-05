export type ViewState =
  | 'default'
  | 'choose-listing-type'
  | 'create-item'
  | 'create-multiple'
  | 'create-vehicle'
  | 'create-real-estate';

export type SidebarProps = {
  onSelect: React.Dispatch<React.SetStateAction<ViewState>>;
};
