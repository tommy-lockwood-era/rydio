import { useEffect } from "react";

/*
  The reason scrolling appears on a webpage is because the content of the webpage *overflows* off the side of the screen (horizontally or vertically). To accomodate this, browsers add scrollbars to access the off-screen content. This can also happen to specific containers in certain cases rather than to the entire web page.

  In the case we want to disable the ability to scroll, one method is to tell the page or container to hide the overflowing content instead of adding a scroll bar. The CSS property 'overflow' allows you to control how a browser handles content overflow.
*/

  export function useLockBodyScroll(isLocked: boolean) {
  // A chief principle of React is that the DOM should not be interacted with directly. When we need to do so, we carry it out inside an effect
  useEffect(() => {
    if(!isLocked) return;

    // Save the previous overflow style so that we can restore it when the modal, pop-up, etc. is closed later
    const previousStyle = window.getComputedStyle(document.body).overflow;

    // When the overflow property of the <body> tag is set to 'hidden', the browser will not add a scroll bar to the page, and scrolling is indirectly but effectively disabled
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore the old body overflow style
      document.body.style.overflow = previousStyle;
    };
    // isLocked is a dependency here and ensures that the effect does not run multiple times but only when the value of 'isLocked' changes
  }, [isLocked]);
}