let lockCount = 0;
let scrollTop: number | null = null;
export default function lockBodyScroll(isLock: boolean) {
  if (scrollTop === null) {
    scrollTop = document.documentElement.scrollTop;
  }
  if (isLock) {
    lockCount += 1;
  } else {
    lockCount -= 1;
  }
  if (lockCount === 1) {
    document.body.style.cssText = `position: fixed; 
    top: ${-scrollTop}px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;`;
  } else if (lockCount === 0) {
    document.body.style.cssText = '';
    document.documentElement.scrollTop = scrollTop;
    scrollTop = null;
  }
}
