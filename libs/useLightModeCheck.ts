import { useColorMode } from '@chakra-ui/react';

export default function useLightModeCheck() {
  const { colorMode } = useColorMode();
  if (colorMode === 'light') return true;
  return false;
}
