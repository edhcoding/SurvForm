import { useEffect, useRef } from "react";

export default function useOutsideClick(callback: () => void) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // PC 에서는 마우스 이벤트, 모바일에서는 터치 이벤트
    const handleClick = (e: MouseEvent | TouchEvent) => {
      // ref에 DOM 요소가 있고 현재 클릭된 영역 외의 영역이면 callback 함수 호출
      // contains(): DOM 요소가 다른 요소를 포함하고 있는지 확인하는 메서드
      if (ref.current && !ref.current.contains(e.target as Node)) callback();
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [callback]);

  return ref;
}
