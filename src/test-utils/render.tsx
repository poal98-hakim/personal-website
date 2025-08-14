import { MantineProvider } from '@mantine/core';
import { RenderOptions, render as rtlRender } from '@testing-library/react';
import { JSX, ReactElement, ReactNode } from 'react';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /**
   * Whether to wrap with MantineProvider. Default: true
   */
  withMantine?: boolean;
  /**
   * Additional wrapper component
   */
  wrapper?: ({ children }: { children: ReactNode }) => JSX.Element;
}

/**
 * Performance-optimized test wrapper that conditionally provides necessary contexts
 */
function TestWrapper({
  children,
  withMantine = true,
}: {
  children: ReactNode;
  withMantine?: boolean;
}) {
  if (!withMantine) {
    return <>{children}</>;
  }

  return <MantineProvider>{children}</MantineProvider>;
}

/**
 * Custom render function that wraps components with necessary providers
 * Only adds providers when needed for performance
 *
 * @example
 * // With Mantine provider (default)
 * render(<MyComponent />);
 *
 * // Without providers for performance (testing pure components)
 * render(<UtilityComponent />, { withMantine: false });
 *
 * // With custom wrapper
 * render(<MyComponent />, {
 *   wrapper: ({ children }) => <CustomProvider>{children}</CustomProvider>
 * });
 */
export function render(
  ui: ReactElement,
  { withMantine = true, wrapper: Wrapper, ...options }: CustomRenderOptions = {}
) {
  // Create the appropriate wrapper based on options
  const AllTheProviders = ({ children }: { children: ReactNode }) => {
    let content = <TestWrapper withMantine={withMantine}>{children}</TestWrapper>;

    // Apply additional wrapper if provided
    if (Wrapper) {
      content = <Wrapper>{content}</Wrapper>;
    }

    return content;
  };

  return rtlRender(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything else from testing-library
export * from '@testing-library/react';
export { render as originalRender } from '@testing-library/react';
