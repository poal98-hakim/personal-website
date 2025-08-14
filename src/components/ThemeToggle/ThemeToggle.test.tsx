import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

// Mock the Mantine color scheme hook
const mockToggleColorScheme = jest.fn();
const mockColorScheme = jest.fn();

jest.mock('@mantine/core', () => ({
  ...jest.requireActual('@mantine/core'),
  useMantineColorScheme: () => ({
    colorScheme: mockColorScheme(),
    toggleColorScheme: mockToggleColorScheme,
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders theme toggle button', () => {
    mockColorScheme.mockReturnValue('light');
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: 'Toggle color scheme' });
    expect(button).toBeInTheDocument();
  });

  it('shows moon icon in light mode', () => {
    mockColorScheme.mockReturnValue('light');
    render(<ThemeToggle />);

    const moonIcon = screen.getByTestId('IconMoon');
    expect(moonIcon).toBeInTheDocument();
  });

  it('shows sun icon in dark mode', () => {
    mockColorScheme.mockReturnValue('dark');
    render(<ThemeToggle />);

    const sunIcon = screen.getByTestId('IconSun');
    expect(sunIcon).toBeInTheDocument();
  });

  it('calls toggleColorScheme when clicked', async () => {
    const user = userEvent.setup();
    mockColorScheme.mockReturnValue('light');
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: 'Toggle color scheme' });
    await user.click(button);

    expect(mockToggleColorScheme).toHaveBeenCalledTimes(1);
  });
});
