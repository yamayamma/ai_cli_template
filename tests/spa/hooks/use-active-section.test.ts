/**
 * Task 3.2: useActiveSectionフックのユニットテスト
 * TDD: RED Phase - テストを先に作成
 * Requirements: 1.3, 5.2
 */

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock IntersectionObserver
type IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => void;

class MockIntersectionObserver {
  private callback: IntersectionObserverCallback;
  private elements: Element[] = [];
  static instances: MockIntersectionObserver[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe(element: Element) {
    this.elements.push(element);
  }

  unobserve(element: Element) {
    this.elements = this.elements.filter((el) => el !== element);
  }

  disconnect() {
    this.elements = [];
  }

  // Helper method to trigger intersection
  triggerIntersection(entries: Partial<IntersectionObserverEntry>[]) {
    const fullEntries = entries.map((entry) => ({
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: 0,
      intersectionRect: {} as DOMRectReadOnly,
      isIntersecting: false,
      rootBounds: null,
      target: document.createElement('div'),
      time: Date.now(),
      ...entry,
    }));
    this.callback(fullEntries as IntersectionObserverEntry[]);
  }
}

describe('useActiveSection Hook', () => {
  let mockScrollIntoView: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    MockIntersectionObserver.instances = [];

    // Mock IntersectionObserver globally
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    // Mock scrollIntoView
    mockScrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;

    // Create test sections in the DOM
    document.body.innerHTML = `
      <section id="workflow">Workflow Section</section>
      <section id="commands">Commands Section</section>
      <section id="approval">Approval Section</section>
    `;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  describe('Initial State', () => {
    it('should return first section as active by default', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { result } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands', 'approval'],
        })
      );

      expect(result.current.activeSection).toBe('workflow');
    });

    it('should return empty string when sectionIds is empty', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { result } = renderHook(() =>
        useActiveSection({
          sectionIds: [],
        })
      );

      expect(result.current.activeSection).toBe('');
    });

    it('should provide scrollToSection function', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { result } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands'],
        })
      );

      expect(typeof result.current.scrollToSection).toBe('function');
    });
  });

  describe('Intersection Observer Integration', () => {
    it('should create IntersectionObserver on mount', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands'],
        })
      );

      expect(MockIntersectionObserver.instances.length).toBeGreaterThan(0);
    });

    it('should update activeSection when section becomes visible', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { result } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands', 'approval'],
        })
      );

      // Get the observer instance
      const observer = MockIntersectionObserver.instances[0];

      // Simulate commands section becoming visible
      act(() => {
        observer.triggerIntersection([
          {
            target: document.getElementById('commands')!,
            isIntersecting: true,
            intersectionRatio: 0.5,
          },
        ]);
      });

      expect(result.current.activeSection).toBe('commands');
    });

    it('should select section with highest intersection ratio', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { result } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands', 'approval'],
        })
      );

      const observer = MockIntersectionObserver.instances[0];

      // Simulate multiple sections visible with different ratios
      act(() => {
        observer.triggerIntersection([
          {
            target: document.getElementById('workflow')!,
            isIntersecting: true,
            intersectionRatio: 0.2,
          },
          {
            target: document.getElementById('commands')!,
            isIntersecting: true,
            intersectionRatio: 0.8,
          },
          {
            target: document.getElementById('approval')!,
            isIntersecting: true,
            intersectionRatio: 0.3,
          },
        ]);
      });

      expect(result.current.activeSection).toBe('commands');
    });

    it('should disconnect observer on unmount', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { unmount } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands'],
        })
      );

      const observer = MockIntersectionObserver.instances[0];
      const disconnectSpy = vi.spyOn(observer, 'disconnect');

      unmount();

      expect(disconnectSpy).toHaveBeenCalled();
    });
  });

  describe('scrollToSection', () => {
    it('should scroll to specified section smoothly', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { result } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands', 'approval'],
        })
      );

      act(() => {
        result.current.scrollToSection('commands');
      });

      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('should not scroll if section does not exist', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { result } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands'],
        })
      );

      act(() => {
        result.current.scrollToSection('nonexistent');
      });

      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });

    it('should update activeSection after scrolling', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { result } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands', 'approval'],
        })
      );

      act(() => {
        result.current.scrollToSection('approval');
      });

      // The active section should be updated to the scrolled section
      expect(result.current.activeSection).toBe('approval');
    });
  });

  describe('Configuration Options', () => {
    it('should accept custom rootMargin', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow'],
          rootMargin: '-100px 0px',
        })
      );

      // Observer should be created (checking that custom options don't break initialization)
      expect(MockIntersectionObserver.instances.length).toBeGreaterThan(0);
    });

    it('should accept custom threshold', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow'],
          threshold: 0.5,
        })
      );

      expect(MockIntersectionObserver.instances.length).toBeGreaterThan(0);
    });
  });
});
