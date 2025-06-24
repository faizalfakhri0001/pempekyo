/** @format */

'use client';
import { loginWithGoogle } from '@/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoFacebook } from 'react-icons/io';
import * as z from 'zod';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuthStore } from '../../store/authStore';

const registerSchema = z
  .object({
    name: z.string().min(3, { message: 'Nama minimal 3 karakter' }),
    email: z.string().email({ message: 'Email tidak valid' }),
    password: z
      .string()
      .min(6, { message: 'Kata sandi minimal 6 karakter' }),
    confirmPassword: z.string().min(6, {
      message: 'Konfirmasi kata sandi minimal 6 karakter',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Kata sandi dan konfirmasi kata sandi tidak cocok',
    path: ['confirmPassword'], // Set error on confirmPassword field
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register: registerUser,
    isLoading,
    setIsLoading,
  } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (
    data
  ) => {
    setError(null);
    const user = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (user) {
      router.push('/'); // Redirect to homepage or dashboard after registration
    } else {
      setError('Gagal mendaftar. Email mungkin sudah digunakan.');
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: 'google' | 'facebook'
  ) => {
    setError(null);
    // This is a mock; in a real app, you'd get name from OAuth response.
    // For now, if "registering" via social, we just log them in.
    if (provider === 'google') {
      const user = await loginWithGoogle();
      if (user) {
        router.push('/');
      } else {
        setError(
          `Gagal mendaftar dengan ${provider}. Silakan coba lagi.`
        );
      }
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Buat Akun Baru
            </CardTitle>
            <CardDescription>
              Daftar untuk menikmati kemudahan memesan pempek.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <p className="mb-4 text-center text-sm text-red-600">
                {error}
              </p>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  {...register('name')}
                  className={`mt-1 ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  placeholder="Masukkan nama lengkap Anda"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={`mt-1 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  placeholder="Masukkan email Anda"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`mt-1 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  placeholder="Masukkan kata sandi"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5"
                  aria-label={
                    showPassword
                      ? 'Sembunyikan kata sandi'
                      : 'Tampilkan kata sandi'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <Label htmlFor="confirmPassword">
                  Konfirmasi Kata Sandi
                </Label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  className={`mt-1 ${
                    errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  placeholder="Konfirmasi kata sandi Anda"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5"
                  aria-label={
                    showConfirmPassword
                      ? 'Sembunyikan konfirmasi kata sandi'
                      : 'Tampilkan konfirmasi kata sandi'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Memproses...' : 'Daftar'}
                </Button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    atau daftar dengan
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                  >
                    <FcGoogle className="mr-2 h-5 w-5" />
                    Google
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={isLoading}
                  >
                    <IoLogoFacebook className="mr-2 h-5 w-5 text-[#1877F2]" />
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center text-sm">
              Sudah punya akun?{' '}
              <Link
                href="/login"
                className="font-medium text-yellow-600 hover:text-yellow-500"
              >
                Masuk di sini
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
