/*
 https://github.com/mui-org/material-ui

 The MIT License (MIT)
 
 Copyright (c) 2014 Call-Em-All
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/

import React from "react";
import ReactDOM from "react-dom";
import {IContainerProps} from "./index.type";

const useEnhancedEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

function ownerDocument(node: Node) {
  return (node && node.ownerDocument) || document;
}

function useForkRef<T>(refA: React.Ref<T>, refB: React.Ref<T>): React.Ref<T> {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return refValue => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

function setRef<T>(
  ref: React.RefObject<T> | ((instance: T | null) => void) | null | undefined,
  value: T | null,
): void {
  if(typeof ref === "function"){
    ref(value);
  }
  else if(ref){
    // @ts-ignore
    ref.current = value;
  }
}

function useEventCallback(fn: any) {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  // @ts-ignore
  // tslint:disable-next-line:ban-comma-operator no-unused-expression
  return React.useCallback(event => (0, ref.current)(event), []);
}

function mapEventPropToEvent(eventProp: string) {
  return eventProp.substring(2).toLowerCase();
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */
export const ClickAwayListener = React.forwardRef((props: IContainerProps, ref) => {
  const {
    children,
    mouseEvent = "onClick",
    touchEvent = "onTouchEnd",
    onClickAway,
  } = props;
  const movedRef = React.useRef(false);
  const nodeRef = React.useRef(null);
  const mountedRef = React.useRef(false);
  
  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  const handleNodeRef = useForkRef(nodeRef, ref);
  // can be removed once we drop support for non ref forwarding class components
  const handleOwnRef = React.useCallback(
    instance => {
      // #StrictMode ready
      setRef(handleNodeRef, ReactDOM.findDOMNode(instance));
    },
    [handleNodeRef],
  );
  const handleRef = useForkRef((children as any).ref, handleOwnRef);
  
  const handleClickAway = useEventCallback((event: any) => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    }
    
    // IE 11 support, which trigger the handleClickAway even after the unbind
    if (!mountedRef.current) {
      return;
    }
    
    // Do not act if user performed touchmove
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    
    // The child might render null.
    const nodeRef_current: Node = nodeRef.current as any;
    if (!nodeRef_current){
      return;
    }
    
    // Multi window support
    const doc = ownerDocument(nodeRef_current);
    
    if (
      doc.documentElement &&
      doc.documentElement.contains(event.target) &&
      !nodeRef_current.contains(event.target)
    ) {
      onClickAway(event);
    }
  });
  
  const handleTouchMove = React.useCallback(() => {
    movedRef.current = true;
  }, []);
  
  React.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      
      document.addEventListener(mappedTouchEvent, handleClickAway);
      document.addEventListener("touchmove", handleTouchMove);
      
      return () => {
        document.removeEventListener(mappedTouchEvent, handleClickAway);
        document.removeEventListener("touchmove", handleTouchMove);
      };
    }
    
    return undefined;
  }, [handleClickAway, handleTouchMove, touchEvent]);
  
  React.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      document.addEventListener(mappedMouseEvent, handleClickAway);
      
      return () => {
        document.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }
    
    return undefined;
  }, [handleClickAway, mouseEvent]);
  
  return (
    <React.Fragment>
      {React.cloneElement(children, { ref: handleRef })}
    </React.Fragment>
  );
});
