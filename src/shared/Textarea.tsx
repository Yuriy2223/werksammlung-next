import React, { useState, forwardRef, useRef } from "react";
import styled, { css } from "styled-components";

const sharedStyles = css<{
  $hasError: boolean;
  $isFocused: boolean;
}>`
  width: 100%;
  height: 100%;
  font-size: 16px;
  padding: 12px;
  border: 2px solid
    ${({ $hasError, theme, $isFocused }) =>
      $hasError ? theme.err : $isFocused ? theme.textPrimary : theme.hover};
  border-radius: 8px;
  outline: none;
  color: ${({ theme }) => theme.textPrimary};
  background: ${({ theme }) => theme.bgPrimary};
  transition: border-color 0.3s;
`;

const InputWrapper = styled.div<{ width: string }>`
  position: relative;
  width: ${({ width }) => width};
  height: 100%;
`;

const StyledTextarea = styled.textarea<{
  $hasError: boolean;
  $isFocused: boolean;
}>`
  ${sharedStyles}
  resize: none;

  &:hover {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.err : theme.textPrimary};
  }
`;

const StyledLabel = styled.label<{
  $isFloating: boolean;
  $hasError: boolean;
}>`
  position: absolute;
  left: 14px;
  top: ${({ $isFloating }) => ($isFloating ? "-12px" : "18px")};
  transform: translateY(${({ $isFloating }) => ($isFloating ? "0" : "-50%")});
  font-size: 16px;
  color: ${({ $hasError, theme }) =>
    $hasError ? theme.err : theme.textPrimary};
  background: ${({ theme }) => theme.bgPrimary};
  padding: 0 6px;
  transition: all 0.2s ease;
  pointer-events: none;
`;

const ErrorText = styled.div`
  position: absolute;
  bottom: -22px;
  left: 4px;
  color: ${({ theme }) => theme.err};
  font-size: 12px;
`;

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string;
  label: string;
  error?: string;
  onClearError?: () => void;
  onValidate?: () => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      width = "100%",
      label,
      error,
      onChange,
      onFocus,
      onBlur,
      onClearError,
      onValidate,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const hasError = !!error;
    const isFloating: boolean =
      isFocused || !!textareaRef.current?.value.trim();

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
      onClearError?.();
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
      onValidate?.();
    };

    return (
      <InputWrapper width={width}>
        <StyledTextarea
          {...rest}
          ref={(node) => {
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
            textareaRef.current = node;
          }}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          $isFocused={isFocused}
          $hasError={hasError}
          aria-invalid={hasError}
        />
        <StyledLabel $isFloating={isFloating} $hasError={hasError}>
          {label}
        </StyledLabel>
        {hasError && <ErrorText>{error}</ErrorText>}
      </InputWrapper>
    );
  }
);

Textarea.displayName = "Textarea";
