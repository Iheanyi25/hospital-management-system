import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const Button = forwardRef(
  (
    {
      label,
      buttonClass,
      loading,
      disabled,
      type,
      link,
      onClick,
      buttonLink,
      customClass,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        className={`rse-button ${
          loading && "rse-loading-button"
        } ${buttonClass} ${customClass ? customClass : ""}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
        ref={ref}
        {...rest}
      >
        {buttonClass === "more-info" ? (
          <span className="aui-icon aui-icon-small aui-iconfont-more"></span>
        ) : (
          <>
            {loading ? (
              <aui-spinner size="small"></aui-spinner>
            ) : buttonClass === "link" &&
              buttonClass === "disabledButtonLink" ? (
              <Link data-cy={buttonLink} to={buttonLink}>
                {label}
              </Link>
            ) : (
              label
            )}
          </>
        )}
      </button>
    );
  }
);

export { Button };
