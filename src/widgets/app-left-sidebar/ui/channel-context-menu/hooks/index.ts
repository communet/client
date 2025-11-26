import { useDisclosure } from '@mantine/hooks';

export const useChannelMenu = (): {
  isOpen: boolean;
  handleContextMenu: (e: React.MouseEvent) => void;
  handleCloseMenu: () => void;
} => {
  const [isOpen, { open, close }] = useDisclosure();

  const handleContextMenu = (e: React.MouseEvent): void => {
    e.preventDefault();
    open();
  };

  const handleCloseMenu = (): void => {
    close();
  };

  return { isOpen, handleContextMenu, handleCloseMenu };
};
