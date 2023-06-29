import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createAlbum } from 'apiSdk/albums';
import { Error } from 'components/error';
import { albumValidationSchema } from 'validationSchema/albums';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { getUsers } from 'apiSdk/users';
import { getOrganizations } from 'apiSdk/organizations';
import { AlbumInterface } from 'interfaces/album';

function AlbumCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AlbumInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAlbum(values);
      resetForm();
      router.push('/albums');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AlbumInterface>({
    initialValues: {
      spotify_id: '',
      grade: 0,
      user_id: (router.query.user_id as string) ?? null,
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: albumValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Album
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="spotify_id" mb="4" isInvalid={!!formik.errors?.spotify_id}>
            <FormLabel>Spotify Id</FormLabel>
            <Input type="text" name="spotify_id" value={formik.values?.spotify_id} onChange={formik.handleChange} />
            {formik.errors.spotify_id && <FormErrorMessage>{formik.errors?.spotify_id}</FormErrorMessage>}
          </FormControl>
          <FormControl id="grade" mb="4" isInvalid={!!formik.errors?.grade}>
            <FormLabel>Grade</FormLabel>
            <NumberInput
              name="grade"
              value={formik.values?.grade}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('grade', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.grade && <FormErrorMessage>{formik.errors?.grade}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'album',
  operation: AccessOperationEnum.CREATE,
})(AlbumCreatePage);
