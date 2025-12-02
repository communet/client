import { useDisclosure } from '@mantine/hooks';

export const useContextMenu = () => {
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
