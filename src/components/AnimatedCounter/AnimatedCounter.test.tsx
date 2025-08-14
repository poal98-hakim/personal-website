import { render, screen } from '@/test-utils';
import { AnimatedCounter } from './AnimatedCounter';

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation((callback) => ({
  observe: mockObserve,
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
  callback,
}));
window.IntersectionObserver = mockIntersectionObserver;

// Mock requestAnimationFrame
const mockRequestAnimationFrame = jest.fn();
const mockCancelAnimationFrame = jest.fn();
window.requestAnimationFrame = mockRequestAnimationFrame;
window.cancelAnimationFrame = mockCancelAnimationFrame;

describe('AnimatedCounter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockRequestAnimationFrame.mockImplementation((callback) => {
      return setTimeout(callback, 16);
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders with initial count of 0', () => {
    render(<AnimatedCounter target={100} startOnVisible={false} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('renders with custom start value', () => {
    render(<AnimatedCounter target={100} start={5} startOnVisible={false} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('renders with suffix when provided', () => {
    render(<AnimatedCounter target={5} suffix="+" startOnVisible={false} />);
    expect(screen.getByText('0+')).toBeInTheDocument();
  });

  test('applies custom className when provided', () => {
    const { container } = render(
      <AnimatedCounter target={100} className="custom-class" startOnVisible={false} />
    );
    const counter = container.querySelector('.custom-class');
    expect(counter).toBeInTheDocument();
  });

  test('renders immediately when startOnVisible is false', () => {
    render(<AnimatedCounter target={100} startOnVisible={false} />);

    // Component renders immediately without intersection observer
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  test('sets up IntersectionObserver when startOnVisible is true', () => {
    render(<AnimatedCounter target={100} startOnVisible={true} />);
    expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      rootMargin: '0px',
      threshold: 0.5,
    });
    expect(mockObserve).toHaveBeenCalled();
  });

  test('cleans up on unmount', () => {
    const { unmount } = render(<AnimatedCounter target={100} startOnVisible={false} />);

    unmount();
    // Component unmounts successfully
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  test('cleans up intersection observer on unmount', () => {
    const { unmount } = render(<AnimatedCounter target={100} startOnVisible={true} />);

    unmount();
    expect(mockUnobserve).toHaveBeenCalled();
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
