import { Controller } from '@nestjs/common';

// append 'api/v1/*** to the app url paths'
export const BasePath = (path: string) => {
  return (target: any) => {
    Controller(`api/v1/${path}`)(target);
  };
};
