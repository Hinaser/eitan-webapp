import * as React from "react";
import classNames from "classnames";
import {IViewProps} from "./index.type";


const ModalView = (props: IViewProps) => {
  const {
    classes,
    className,
    style,
    popoverStyle,
    children,
    onClose,
    title,
    onClickOK,
    onClickCancel,
    OKButtonLabel,
    CancelButtonLabel,
  } = props;
  
  return (
    <div
      className={classNames(classes.root, className)}
      style={style}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={classes.popover}
        style={popoverStyle}
        data-class="popover"
      >
        <div>
          {title && (
            <div data-class="title">
              {title}
            </div>
          )}
        </div>
        <div>
          {children && (
            <div data-class="body">
              {children}
            </div>
          )}
        </div>
        <div>
          {(onClickOK || onClickCancel) && (
            <div data-class="button-container">
              {onClickOK && (
                <div onClick={onClickOK} data-class="ok-button">
                  {OKButtonLabel || "OK"}
                </div>
              )}
              {onClickCancel && (
                <div onClick={onClickCancel} data-class="cancel-button">
                  {CancelButtonLabel || "Cancel"}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalView;
