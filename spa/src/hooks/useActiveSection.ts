/**
 * useActiveSection Hook
 * スクロール位置に基づくアクティブセクション検出
 * Requirements: 1.3, 5.2
 */
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useActiveSectionの設定オプション
 */
export interface UseActiveSectionOptions {
  /** 監視対象のセクションID配列 */
  sectionIds: readonly string[];
  /** IntersectionObserverのrootMargin（オプション） */
  rootMargin?: string;
  /** IntersectionObserverのthreshold（オプション） */
  threshold?: number;
}

/**
 * useActiveSectionの戻り値
 */
export interface UseActiveSectionReturn {
  /** 現在アクティブなセクションID */
  activeSection: string;
  /** 指定セクションへスムーズスクロール */
  scrollToSection: (sectionId: string) => void;
}

/**
 * スクロール位置に基づいてアクティブセクションを検出するカスタムフック
 */
export function useActiveSection({
  sectionIds,
  rootMargin = '-20% 0px -70% 0px',
  threshold = 0,
}: UseActiveSectionOptions): UseActiveSectionReturn {
  // セクションが空の場合は空文字列、そうでなければ最初のセクション
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');

  // セクションの可視性比率を追跡
  const visibilityMap = useRef<Map<string, number>>(new Map());

  // Intersection Observerによる監視
  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // 各エントリの可視性を更新
        for (const entry of entries) {
          const sectionId = entry.target.id;
          if (entry.isIntersecting) {
            visibilityMap.current.set(sectionId, entry.intersectionRatio);
          } else {
            visibilityMap.current.delete(sectionId);
          }
        }

        // 最も可視面積の大きいセクションを選択
        let maxRatio = 0;
        let maxSectionId = '';

        for (const [sectionId, ratio] of visibilityMap.current) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxSectionId = sectionId;
          }
        }

        if (maxSectionId) {
          setActiveSection(maxSectionId);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    // セクション要素を監視
    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    }

    // クリーンアップ
    return () => {
      observer.disconnect();
    };
  }, [sectionIds, rootMargin, threshold]);

  // 指定セクションへのスムーズスクロール
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // スクロール先をアクティブに設定
      setActiveSection(sectionId);
    }
  }, []);

  return {
    activeSection,
    scrollToSection,
  };
}
