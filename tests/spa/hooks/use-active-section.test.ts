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

/**
 * Helper to get element by id with fallback to a div
 * Avoids non-null assertion linting error
 */
function getElementOrDefault(id: string): Element {
  return document.getElementById(id) ?? document.createElement('div');
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
            target: getElementOrDefault('commands'),
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
            target: getElementOrDefault('workflow'),
            isIntersecting: true,
            intersectionRatio: 0.2,
          },
          {
            target: getElementOrDefault('commands'),
            isIntersecting: true,
            intersectionRatio: 0.8,
          },
          {
            target: getElementOrDefault('approval'),
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

  describe('Section Visibility Changes', () => {
    it('should remove section from tracking when it becomes non-intersecting', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { result } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands', 'approval'],
        })
      );

      const observer = MockIntersectionObserver.instances[0];

      // First, make commands visible
      act(() => {
        observer.triggerIntersection([
          {
            target: getElementOrDefault('commands'),
            isIntersecting: true,
            intersectionRatio: 0.8,
          },
        ]);
      });

      expect(result.current.activeSection).toBe('commands');

      // Then make commands non-visible and approval visible
      act(() => {
        observer.triggerIntersection([
          {
            target: getElementOrDefault('commands'),
            isIntersecting: false,
            intersectionRatio: 0,
          },
          {
            target: getElementOrDefault('approval'),
            isIntersecting: true,
            intersectionRatio: 0.5,
          },
        ]);
      });

      expect(result.current.activeSection).toBe('approval');
    });

    it('should keep current active section when no sections are visible', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { result } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands'],
        })
      );

      const observer = MockIntersectionObserver.instances[0];

      // Make workflow visible first
      act(() => {
        observer.triggerIntersection([
          {
            target: getElementOrDefault('workflow'),
            isIntersecting: true,
            intersectionRatio: 0.5,
          },
        ]);
      });

      expect(result.current.activeSection).toBe('workflow');

      // Make workflow non-visible without any other visible section
      act(() => {
        observer.triggerIntersection([
          {
            target: getElementOrDefault('workflow'),
            isIntersecting: false,
            intersectionRatio: 0,
          },
        ]);
      });

      // Should keep the last active section
      expect(result.current.activeSection).toBe('workflow');
    });

    it('should handle rapid section changes correctly', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { result } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands', 'approval'],
        })
      );

      const observer = MockIntersectionObserver.instances[0];

      // Rapid succession of visibility changes
      act(() => {
        observer.triggerIntersection([
          {
            target: getElementOrDefault('workflow'),
            isIntersecting: true,
            intersectionRatio: 0.3,
          },
        ]);
      });

      act(() => {
        observer.triggerIntersection([
          {
            target: getElementOrDefault('commands'),
            isIntersecting: true,
            intersectionRatio: 0.6,
          },
        ]);
      });

      act(() => {
        observer.triggerIntersection([
          {
            target: getElementOrDefault('approval'),
            isIntersecting: true,
            intersectionRatio: 0.9,
          },
        ]);
      });

      // Should end up with approval as active (highest ratio)
      expect(result.current.activeSection).toBe('approval');
    });
  });

  describe('SectionIds Changes', () => {
    it('should reinitialize observer when sectionIds change', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { rerender } = renderHook(({ sectionIds }) => useActiveSection({ sectionIds }), {
        initialProps: { sectionIds: ['workflow', 'commands'] as readonly string[] },
      });

      const initialObserverCount = MockIntersectionObserver.instances.length;

      // Change sectionIds
      rerender({ sectionIds: ['workflow', 'commands', 'approval'] as readonly string[] });

      // A new observer should be created
      expect(MockIntersectionObserver.instances.length).toBeGreaterThan(initialObserverCount);
    });

    it('should not create observer when sectionIds is empty', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      MockIntersectionObserver.instances = [];

      renderHook(() =>
        useActiveSection({
          sectionIds: [],
        })
      );

      // No observer should be created for empty sectionIds
      // (The hook has an early return for empty sectionIds)
      expect(MockIntersectionObserver.instances.length).toBe(0);
    });
  });

  describe('scrollToSection Edge Cases', () => {
    it('should scroll to section that exists in DOM but not in sectionIds', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      // Add an extra section to DOM
      const extraSection = document.createElement('section');
      extraSection.id = 'extra';
      document.body.appendChild(extraSection);

      const { result } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands'],
        })
      );

      act(() => {
        result.current.scrollToSection('extra');
      });

      // Should still scroll to the element even if not in sectionIds
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });

      // Clean up
      extraSection.remove();
    });

    it('should maintain scrollToSection reference stability', async () => {
      const { useActiveSection } = await import('../../../spa/src/hooks/useActiveSection');

      const { result, rerender } = renderHook(() =>
        useActiveSection({
          sectionIds: ['workflow', 'commands'],
        })
      );

      const firstScrollToSection = result.current.scrollToSection;

      rerender();

      const secondScrollToSection = result.current.scrollToSection;

      // scrollToSection should be the same reference (memoized with useCallback)
      expect(firstScrollToSection).toBe(secondScrollToSection);
    });
  });
});
