import * as yup from 'yup';

export const albumValidationSchema = yup.object().shape({
  spotify_id: yup.string().required(),
  grade: yup.number().integer().required(),
  user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
