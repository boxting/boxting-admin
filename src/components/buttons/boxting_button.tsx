import React, { FC } from 'react';
import { Button } from '@chakra-ui/core';
import { ButtonType, buttonStyles } from './utils';

// TODO: Add loading props to Button
interface ButtonProps {
  typeBtn: ButtonType;
  text?: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  submit?: boolean;
  onEnter?: () => void;
}

const BoxtingButton: FC<ButtonProps> = ({
  typeBtn,
  leftIcon,
  rightIcon,
  text,
  submit,
  onEnter,
}: ButtonProps) => {
  const typeButton = buttonStyles.get(typeBtn);

  const lIcon =
    leftIcon &&
    React.cloneElement(leftIcon, {
      ...leftIcon.props,
      color: typeButton.fontColor,
    });
  const rIcon =
    rightIcon &&
    React.cloneElement(rightIcon, {
      ...rightIcon.props,
      color: typeButton.fontColor,
    });

  return (
    <Button
      bg={typeButton.backgroundColor}
      border={typeBtn === ButtonType.outline && `2px`}
      borderColor={typeBtn === ButtonType.outline && typeButton.fontColor}
      color={typeButton.fontColor}
      leftIcon={lIcon}
      rightIcon={rIcon}
      type={submit ? `submit` : `button`}
      onClick={onEnter}
      _focus={{ boxShadow: `0px 0px 1px 1px ${typeButton.fontColor}` }}
    >
      {text}
    </Button>
  );
};

export default BoxtingButton;
