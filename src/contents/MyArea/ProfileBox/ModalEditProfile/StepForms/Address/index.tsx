import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { type EditProfileStepsKeys } from 'constants/global';
import { type EditProfileFormData } from 'shared/UpdateProfileForm';

import { ADDRESS_FIELDS as fields } from './fields';
import * as S from '../StepForms.styles';
import { type IFormComponentProps } from '../StepForms.interfaces';

const stepKey: EditProfileStepsKeys = 'address';

export const Address = ({
  handlePreviousStep,
  disableBackButton,
  showBackButton,
  showFinishButton,
}: IFormComponentProps) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<EditProfileFormData>();

  const hasErrors = errors?.[stepKey] && Object.keys(errors?.[stepKey]).length > 0;

  return (
    <>
      <S.StepFormTitle>Endereço</S.StepFormTitle>
      {Object.values(fields).map((field) => {
        return (
          <Controller
            key={field.name}
            control={control}
            name={field.complexName}
            render={({ field: { onChange, value } }) => {
              return (
                <S.StepInputWrapper>
                  <Input
                    name={field.complexName}
                    label={field.label}
                    onChange={onChange}
                    value={value}
                    type={field.type}
                    mask={field.mask}
                    placeholder={field.placeholder}
                    error={errors?.[stepKey]?.[field.name]}
                  />
                </S.StepInputWrapper>
              );
            }}
          />
        );
      })}

      <S.StepButtonWrapper>
        {showBackButton && (
          <Button fullWidth disabled={disableBackButton} onClick={handlePreviousStep}>
            Voltar
          </Button>
        )}
        <Button
          type={showFinishButton ? 'submit' : 'button'}
          fullWidth
          disabled={isSubmitting || hasErrors}
        >
          Salvar dados
        </Button>
      </S.StepButtonWrapper>
    </>
  );
};
