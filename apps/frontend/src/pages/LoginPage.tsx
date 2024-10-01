import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Link
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContextProvider';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email')
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(3, 'Password must have at least 3 characters')
});

type formType = z.infer<typeof formSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setError(false);
      setErrorText('');
      setSubmitting(true);
      const response = await fetch(`${import.meta.env.VITE_API_LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });

      if (response.ok) {
        const body = await response.json();
        setToken(body.access_token, body.refresh_token);
        navigate('/dashboard');
      } else {
        setSubmitting(false);
        const body = await response.json();
        setError(true);
        setErrorText(body.error || 'An unexpected error occurred');
      }
    } catch (error) {
      setError(true);
      setErrorText('An unexpected error occurred');
      setSubmitting(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: '2rem' }}>
      <Box sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Login
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} alignItems="center">
          <FormControl sx={{ width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  label="Email"
                  id="outlined-adornment-email"
                  type="email"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <FormHelperText error>{errors.email.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  label="Password"
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...field}
                />
              )}
            />
            {errors.password && (
              <FormHelperText error>{errors.password.message}</FormHelperText>
            )}
          </FormControl>

          <Box sx={{ textAlign: 'center' }}>
            <LoadingButton
              type="submit"
              size="large"
              endIcon={<SendIcon />}
              loading={submitting}
              loadingPosition="end"
              variant="contained"
              fullWidth
            >
              <span>Login</span>
            </LoadingButton>
          </Box>

          {error && <FormHelperText error>{errorText}</FormHelperText>}

          <Typography variant="body2" sx={{ marginTop: '1rem', textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link href="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </Stack>
      </form>
    </Container>
  );
};

export default LoginPage;
